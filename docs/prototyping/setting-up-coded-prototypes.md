---
layout: layouts/content.njk
subsection: Prototyping
showHelp: true
title: Setting up coded prototypes
redirect_from: /get-started/prototyping
lede: Learn how to create prototypes using the GOV.UK Prototype Kit and the MOJ Design System.
showLede: true
eleventyNavigation:
  key: Setting up coded prototypes
  parent: Prototyping
  order: 20
---
 
## How to add the MOJ Design System to a prototype

The MOJ Design System should only be used alongside the GOV.UK Design System. You'll need a GOV.UK prototype to add MOJ Design System components to.

If you do not already have a GOV.UK prototype, you can find out how to [create a new prototype](https://prototype-kit.service.gov.uk/docs/install/getting-started).

### How to install the MOJ Frontend npm package
 
1. Open a command prompt (for example Terminal on a Mac).
2. Navigate to your prototype folder by typing `cd` followed by the folder path (for example `cd ~/Documents/prototypes/juggling-licence`) 
3. Run `npm install @ministryofjustice/frontend --save`
 
If you’re using version 13 or later of the GOV.UK Prototype Kit, you can now use MOJ Design System components in your prototype.
 
If you’re using a version earlier than 13, you need to:
 
1. Open `app/assets/javascripts/application.js` 
2. Add a new line underneath `window.GOVUKFrontend.initAll()`, and type `window.MOJFrontend.initAll()`
3. Save the file.

## Updating MOJ Frontend

The current version of MOJ Frontend is **{% version %}**.

### Check which version of MOJ Frontend is installed in your prototype 

1. In the footer of your prototype, select the ‘Manage your prototype’ link.
2. Select the ‘Plugins’ link, then select ‘Installed plugins’.
3. Look for ‘Frontend by Ministryofjustice’ in the list of plugins. The version number is below.

### Update to the latest version of MOJ Frontend

1. Check the latest [MOJ Frontend release notes](https://github.com/ministryofjustice/moj-frontend/releases) for breaking changes that might affect your prototype.
2. In the footer of your prototype, select the ‘Manage your prototype’ link.
3. Select the ‘Plugins’ link, then select ‘Installed plugins’.
4. Look for ‘Frontend by Ministryofjustice’ in the list of plugins and select the ‘Update’ button.