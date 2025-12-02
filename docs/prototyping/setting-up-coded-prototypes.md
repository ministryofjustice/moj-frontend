---
layout: layouts/content.njk
subsection: Prototyping
showHelp: true
title: Setting up coded prototypes
redirect_from: /get-started/prototyping
lede: Learn how to create prototypes using the MOJ Design System and GOV.UK Prototype Kit.
eleventyNavigation:
  key: Setting up coded prototypes
  parent: Prototyping
  order: 20
  excerpt: "Learn how to create prototypes using the MOJ Design System and GOV.UK Prototype Kit."
---
 
## How to add the MOJ Design System to a prototype

MOJ Frontend is where the coded components of the MOJ Design System are stored. It should only be used with GOV.UK prototypes.

You can find out how to [create a new prototype](https://prototype-kit.service.gov.uk/docs/install/getting-started), if you do not have one.

### How to install the MOJ Frontend npm package
 
1. Open a command prompt (e.g. Terminal on a Mac) 
2. Navigate to your prototype folder by typing `cd` followed by the folder path. (e.g. `cd ~/Documents/prototypes/juggling-licence`) 
3. Run `npm install @ministryofjustice/frontend --save` 
 
If you’re using version 13 or later of the GOV.UK Prototype Kit, you can now use MOJ Design System components in your prototype. 
 
If you’re using a version earlier than 13, you need to: 
 
1. Open `app/assets/javascripts/application.js` 
2. Add a new line underneath `window.GOVUKFrontend.initAll()`, and type `window.MOJFrontend.initAll()` 
3. Save the file

## Updating MOJ Frontend

The current version of MOJ Frontend is **{% version %}**.

### Check which version of MOJ Frontend is installed in your prototype 

1. Open a command prompt (e.g. Terminal on a Mac) 
2. Navigate to your prototype folder by typing `cd` followed by the folder path. (e.g. `cd ~/Documents/prototypes/juggling-licence`) 
3. Run `npm list @ministryofjustice/frontend` to see the version number

### Update to the latest version of MOJ Frontend

1. Check the latest [MOJ Frontend release notes](https://github.com/ministryofjustice/moj-frontend/releases) for breaking changes that might affect your prototype
2. In the footer of your prototype, select the ‘Manage your prototype’ link
3. Click the ‘Plugins’ link, then select ‘Installed plugins’
4. Look for ‘Frontend by Ministryofjustice’ in the list of plugins and select the ‘Update’ button
