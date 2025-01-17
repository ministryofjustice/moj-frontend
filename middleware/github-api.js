const fetch = require('node-fetch');

// GitHub API and environment variables
const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Set as an environment variable
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER; // Set as an environment variable
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME; // Set as an environment variable

// Helper to extract the filename from the session object keys
const extractFilename = (key) => {
  const segments = key.split('/');
  return `${segments[segments.length - 1]}.txt`; // Get last segment and append `.txt`
};

// Function to handle file objects and store them in the correct structure
const handleFile = (fileData) => {
  if (fileData && fileData.buffer) {
    // Convert the file buffer to base64 encoded string
    return Buffer.from(fileData.buffer).toString('base64');
  }
  return null;
};

// Function to interact with GitHub API
const pushToGitHub = async (sessionData) => {
  try {
    // Ignore the `cookie` field and process the rest
    const submissionData = {};
    Object.keys(sessionData).forEach((key) => {
      if (key !== 'cookie') {
        const fileData = sessionData[key];
        // console.log('fileData',fileData);
        if (fileData?.componentImage?.buffer) {
          // If it's a file-like object, create a directory and file within it
          const directory = fileData.componentImage.fieldname; // Use fieldname as directory name
          const filename = fileData.componentImage.originalname; // Use the original filename
          const fileContent = handleFile(fileData.componentImage);
          const filePath = `submission/${directory}/${filename}`;
          submissionData[filePath] = { buffer: fileContent };
          // submissionData[filePath] = { fileContent };
        } else {
          // If it's not a file, use the key as filename and stringify the data
          const filename = extractFilename(key);
          submissionData[filename] = sessionData[key];
        }
      }
    });

    console.log('submit: ', JSON.stringify(submissionData));

    console.log('URL', `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/ref/heads/main`);

    // Step 1: Get the default branch SHA (main)
    const mainBranchResponse = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/ref/heads/main`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }
    );
    if (!mainBranchResponse.ok) {
      const errorText = await mainBranchResponse.text(); // Get the response body as text
      console.error(`Failed to fetch main branch: ${mainBranchResponse.status} - ${mainBranchResponse.statusText}`);
      console.error(`Error details: ${errorText}`);
      throw new Error(`Failed to fetch main branch: ${mainBranchResponse.statusText}`);
    }
    const mainBranch = await mainBranchResponse.json();
    const baseSha = mainBranch.object.sha;

    // Step 2: Create a new branch
    const branchName = `submission-${Date.now()}`;
    const branchRef = `refs/heads/${branchName}`;
    const createBranchResponse = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/refs`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: branchRef,
          sha: baseSha,
        }),
      }
    );
    if (!createBranchResponse.ok) {
      throw new Error(`Failed to create branch: ${createBranchResponse.statusText}`);
    }

    // Step 3: Add files to the branch
    for (const [filePath, content] of Object.entries(submissionData)) {
      if (content.buffer) {
        const addFileResponse = await fetch(
          `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `Add ${filePath} in submission folder`,
              content: content?.buffer || content,
              branch: branchName,
            }),
          }
        );

        if (!addFileResponse.ok) {
          throw new Error(`Failed to add file ${filePath}: ${addFileResponse.statusText}`);
        }
      }
    }

    console.log(`Branch ${branchName} created and files added successfully.`);
    return branchName;
  } catch (error) {
    console.error('Error interacting with GitHub API:', error.message);
  }
};

const createPullRequest = async (branchName, title, description = '') => {
  try {
    // Define the API endpoint for creating a pull request
    const prEndpoint = `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/pulls`;

    // Prepare the PR data
    const prData = {
      title, // Title of the PR
      head: branchName, // The branch you want to merge
      base: 'main', // The branch into which you want to merge
      body: description, // Description of the PR (optional)
    };

    // Make the API request
    const response = await fetch(prEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to create pull request: ${response.status} - ${response.statusText}`);
      console.error(`Error details: ${errorText}`);
      throw new Error('Failed to create pull request.');
    }

    // Parse and log the response
    const pr = await response.json();
    console.log(`Pull request created: ${pr.html_url}`);
    return pr;
  } catch (error) {
    console.error('Error creating pull request:', error.message);
    throw error;
  }
};

module.exports = { pushToGitHub, createPullRequest };
