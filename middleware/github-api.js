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

// Function to interact with GitHub API
const pushToGitHub = async (sessionData) => {
  try {
    // Ignore the `cookie` field and process the rest
    const submissionData = {};
    Object.keys(sessionData).forEach((key) => {
      if (key !== 'cookie') {
        const filename = extractFilename(key);
        submissionData[filename] = sessionData[key];
      }
    });

    console.log('URL', `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/ref/heads/main`)

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
    for (const [filename, content] of Object.entries(submissionData)) {
      const filePath = `submission/${filename}`;
      const fileContent = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');

      const addFileResponse = await fetch(
        `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Add ${filename} in submission folder`,
            content: fileContent,
            branch: branchName,
          }),
        }
      );

      if (!addFileResponse.ok) {
        throw new Error(`Failed to add file ${filename}: ${addFileResponse.statusText}`);
      }
    }

    console.log(`Branch ${branchName} created and files added successfully.`);
  } catch (error) {
    console.error('Error interacting with GitHub API:', error.message);
  }
};

// Example usage with session data
const exampleSessionData = {
  cookie: {
    path: '/',
    _expires: new Date(),
    originalMaxAge: 60000,
    httpOnly: true,
    secure: false,
  },
  '/get-involved/add-new-component/component-details': {
    componentName: 'test',
    briefDescription: 'test',
    whyNeeded: 'test',
  },
  '/get-involved/add-new-component/component-image': { componentImage: 'upload.txt' },
  '/get-involved/add-new-component/your-details': {
    fullName: 'test',
    emailAddress: 'test@test.com',
    jobRole: '',
    team: '',
    showEmailAddress: 'no',
  },
};

// Call the function
// pushToGitHub(exampleSessionData);

module.exports = {pushToGitHub};
