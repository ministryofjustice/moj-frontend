---
layout: layouts/tabbed-content.njk
subsection: Prototyping
title:  Using the Figma Kits
eleventyNavigation:
  key: Using the Figma Kits
  parent: Prototyping
  order: 30
  excerpt: "Using the MoJ Figma Kits."
---

The MoJ Design System team maintains Figma Kits that help people use Figma to create designs that are consistent with one another.


{% tabs "Contents" %}

{% tab "MoJ Staff" %}

## If you work for the Ministry of Justice

3 Figma Kits are automatically added to all Figma files in the Ministry of Justice:

- [MoJ Figma Kit](https://www.figma.com/design/N2xqOFkyehXwcD9DxU1gEq/MoJ-Figma-Kit?node-id=20-17040)
- [GOV Figma Kit](https://www.figma.com/design/cdmqMa73kZBDEC42spSVba/GOV-Figma-Kit?m=auto&node-id=20-17040&t=ZG7js0TWe3yzv5CD-1)
- [GOV & MoJ Styles](https://www.figma.com/design/rbzFtXbYqItzqtfE3fdCQ4/GOV-%26-MoJ-Styles?m=auto&node-id=20-17040&t=u1P8phs3qyRxZ4FQ-1)

This enables Figma prototypes to benefit from centrally maintained updates.

<div class="govuk-inset-text">
  Do not use the <a href="https://www.figma.com/community/file/946837271092540314">GOV.UK Design System Figma community file</a>.<br/>It's not updated or maintained by anyone.
</div>


### Check if the Figma Kits are active in your file

1. Open any Figma design file in the app or a browser.

2. Select 'Assets' from the left-hand side panel and then the book icon.
<p><img src="/assets/images/figma-guidance-assets-menu.png" style="border:none" alt="A cropped view of the sidebar in the Figma app, showing The Figma logo, the filename 'Untitled', the file location 'drafts', the 'Files' and 'Assets' tabs, an icon showing an open book, and a search bar. The 'Assets' tab is selected."></p>

3. Look under 'Libraries added to this file'. If there's a list of the 3 libraries (GOV & MoJ Styles, GOV Figma Kit, and MoJ Figma Kit) the Figma Kits are active. You do not need to do anything else.
<p><img src="/assets/images/figma-guidance-default-libraries.png" style="border:none" alt="A 'Manage libraries' modal window with a sidebar showing a 'This file' tab selected. The content in the main pane is in two sections: 'Assets created in this file' and 'Libraries added to this file'. Under 'Libraries added to this file' there are three libraries: 'GOV & MoJ Styles', 'GOV Figma Kit' and 'MoJ Figma Kit'. Next to each, there is a 'Remove' button."></p>

4. If the 3 libraries do not appear, go to 'Browse libraries' in the modal sidebar. Then select 'Recommended' (it has a light bulb icon).

5. Hover over each library and select the 'Add to file' button.
<p><img src="/assets/images/figma-guidance-recommended-libraries-hover.png" style="border:none" alt="A 'Manage libraries' modal window with a sidebar showing a 'Recommended' tab selected. The content in the main pane shows the heading 'Recommended libraries' and the text 'Your admins suggest using these libraries'. Underneath there is another heading reading 'Recommended by Ministry of Justice', with three libraries shown below: 'GOV & MoJ Styles', 'GOV Figma Kit' and 'MoJ Figma Kit'. 'GOV & MoJ Styles' is being hovered over and has an 'Add to file' button over it."></p>

6. Select 'This file' in the modal sidebar. You should now see the 3 libraries: GOV & MoJ Styles, GOV Figma Kit, and MoJ Figma Kit. The Figma Kits are active. You do not need to do anything else.


### Get updates from the Figma Kits

When the Figma Kits are updated, you’ll be notified in Figma. To check for updates:

1. Go to a Figma design file
2. Select 'Assets' from the left-hand side panel and then the book icon.
3. Select 'Updates' from the sidebar. Underneath the text saying who published a change and when, you'll see a short summary of the changes made. This is where information about 'breaking' changes will be communicated.
<p><img src="/assets/images/figma-guidance-update.png" style="border:none" alt="A 'Manage libraries' modal window with a sidebar showing a 'Updates' tab selected. The content in the main pane shows the heading 'Updates from Test library', a line of text 'Published by Murray Lippiatt 4 minutes ago', and another line of text 'Updated 'Date picker' component: added hover states to calendar numbers.' Underneath this is an image of the date picker component with 'Date picker' and a button labelled 'Update' next to it. At the bottom of the window are a toggle switch labelled 'Show updates for all pages', and a button labelled 'Update all'."></p>

4. Either select the 'Update all' button, or select 'Update' for each component you want to update.

{% endtab %}

{% tab "Non-MoJ Staff" %}

## If you work outside of the Ministry of Justice

### Download and use the Figma Kits

1. Open the Figma Kit you want to download and use:
    - [MoJ Figma Kit](https://www.figma.com/design/N2xqOFkyehXwcD9DxU1gEq/MoJ-Figma-Kit?node-id=20-17040)
    - [GOV Figma Kit](https://www.figma.com/design/cdmqMa73kZBDEC42spSVba/GOV-Figma-Kit?m=auto&node-id=20-17040&t=ZG7js0TWe3yzv5CD-1)
    - [GOV & MoJ Styles](https://www.figma.com/design/rbzFtXbYqItzqtfE3fdCQ4/GOV-%26-MoJ-Styles?m=auto&node-id=20-17040&t=u1P8phs3qyRxZ4FQ-1)
2. Select the Figma logo at the top of the left-hand sidebar and go to File > Save local copy.
<p><img src="/assets/images/figma-guidance-download-kit.png" style="border:none" alt="A cropped view of the sidebar in the Figma app. The Figma logo has been selected and a menu has opened. The 'file' submenu has been opened and 'Save local copy...' is being hovered over."></p>

3. Add the downloaded file into your project, publish it as a library, and use it in your files.


### Manually update the Figma Kits

1. Every so often, check the live Figma Kit files for updates.
2. Save a local copy of the latest version of the Figma Kit.
3. Reload it into your Figma workspace as a library.
4. Open your design files, and use the [swap libraries](https://help.figma.com/hc/en-us/articles/4404856784663-Swap-style-and-component-libraries) feature in Figma to replace all references to the outdated version of the MoJ Figma Kit. You can only use 'swap libraries' with a paid Figma licence. If you do not have one, [swap components](https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances) individually instead.

{% endtab %}

{% tab "Help improve the Figma Kits" %}

## Help improve the Figma Kits

The MoJ Design System team would like to hear:

- if a GOV.UK or MoJ component is missing from the Figma Kits
- if a Figma component isn't working properly
- if you find a mistake on a Figma component (for example, the wrong font weight or spacing)

You can [contact the MoJ Design System team](/help) to give us your feedback.

{% endtab %}

{% endtabs %}