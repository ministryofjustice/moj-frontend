---
layout: layouts/content.njk
tabs: true
subsection: Prototyping
title: Setting up Figma prototypes
lede: Figma Kits help people to create designs that are consistent with one another. They are maintained by the MOJ Design System team.
eleventyNavigation:
  key: Setting up Figma prototypes
  parent: Prototyping
  order: 10
  excerpt: "Setting up Figma prototypes."
---

{% tabs "Contents" %}

{% tab "MOJ staff" %}

## If you work for the Ministry of Justice

5 Figma Kits are automatically added to all Figma files in MOJ. This enables Figma prototypes to get centrally maintained updates.

<div class="govuk-inset-text">
  Do not download and use any GOV.UK or MOJ Figma files from the <a href="http://www.figma.com/community">Figma Community</a>.
</div>

### How to check that the Figma Kits are active in your file

1. Open any Figma design file in the app or a browser.

2. Select 'Assets' from the side navigation and then the book icon.
<p><img src="/assets/images/figma-guidance-assets-menu.png" style="border:none; max-width:760px" alt="A cropped view of the side navigation in the Figma app, showing The Figma logo, the filename 'Untitled', the file location 'drafts', the 'Files' and 'Assets' tabs, an icon showing an open book, and a search bar. The 'Assets' tab is selected."></p>

3. Look under the heading 'Libraries added to this file'. If there’s a list of the 5 libraries, the Figma Kits are active. You do not need to do anything else.
<p><img src="/assets/images/figma-guidance-default-libraries.png" style="border:none; max-width:760px" alt="A 'Manage libraries' window with a side navigation menu showing a 'This file' tab selected. The content in the main pane is in two sections: 'Assets created in this file' and 'Libraries added to this file'. Under 'Libraries added to this file' there are three libraries: 'GOV.UK & MOJ Styles', 'GOV.UK Figma Kit' and 'MOJ Figma Kit'. Next to each, there is a 'Remove' button."></p>

### What to do if the 5 libraries do not appear

1. Go to 'Browse libraries' in the side navigation and select 'Recommended' (it has a light bulb icon).

2. Focus on each library and select the 'Add to file' button.
<p><img src="/assets/images/figma-guidance-recommended-libraries-hover.png" style="border:none; max-width:760px" alt="A 'Manage libraries' window with a side navigation menu showing a 'Recommended' tab selected. The content in the main pane shows the heading 'Recommended libraries' and the text 'Your admins suggest using these libraries'. Underneath there is another heading reading 'Recommended by Ministry of Justice', with three libraries shown below: 'GOV.UK & MOJ Styles', 'GOV.UK Figma Kit' and 'MOJ Figma Kit'. 'GOV.UK & MOJ Styles' is being hovered over and has an 'Add to file' button over it."></p>

3. To check that the files have been added, select ‘This file’ in the side navigation. You should now see the 5 libraries. This means the Figma Kits are active. You do not need to do anything else.

### How to get updates from the Figma Kits

When the Figma Kits are updated, you’ll be notified in Figma. You can also check for updates by:

1. Going to any Figma design file which has at least one library activated.
2. Selecting 'Assets' from the left-hand side panel and then the book icon.
3. Selecting ‘Updates’ from the side navigation. This shows a change summary, the author and date, and any ‘breaking’ changes.
<p><img src="/assets/images/figma-guidance-update.png" style="border:none; max-width:760px" alt="A 'Manage libraries' window with a side navigation menu showing a 'Updates' tab selected. The content in the main pane shows the heading 'Updates from Test library', a line of text 'Published by Murray Lippiatt 4 minutes ago', and another line of text 'Updated 'Date picker' component: added hover states to calendar numbers.' Underneath this is an image of the date picker component with 'Date picker' and a button labelled 'Update' next to it. At the bottom of the window are a toggle switch labelled 'Show updates for all pages', and a button labelled 'Update all'."></p>

4. Either selecting the 'Update all' button, or selecting 'Update' for each component you want to update.

{% endtab %}

{% tab "Non-MOJ staff" %}

## Non-MOJ staff

### How to download and use the Figma Kits

1. Select the Figma Kit you want to use:
   - [GOV.UK & MOJ Styles](https://www.figma.com/community/file/1543188213395170918)
   - [GOV.UK Figma Kit](https://www.figma.com/community/file/1543190867840891511)
   - [MOJ Figma Kit](https://www.figma.com/community/file/1543193133973726850)

<div class="govuk-inset-text">
  To use the MOJ Figma Kit, you'll need to add all 3 Figma libraries to your project.
</div>

2. Select 'Open in Figma'.

3. If you have multiple Figma accounts, you'll be asked where you would like to open the file. Select the account you would like to open it with. The file will be now be saved in your drafts.

4. Move the file to the project you're working on so that it can be accessed by everyone working on the project. [Read about moving files in Figma](https://help.figma.com/hc/en-us/articles/360038511573-Move-a-file).

5. Publish the file as a library. [Read about publishing a library in Figma](https://help.figma.com/hc/en-us/articles/360025508373-Publish-a-library).

6. Repeat steps 1 to 5 for each Figma Kit you want to add to your project.

### Manually update the Figma Kits

1. Every so often, check [GOV.UK & MOJ Styles](https://www.figma.com/community/file/1543188213395170918), the [GOV.UK Figma Kit](https://www.figma.com/community/file/1543190867840891511) and the [MOJ Figma Kit](https://www.figma.com/community/file/1543193133973726850) for updates.
2. Save a local copy of the latest version of the Figma Kit you want to update.
3. Reload it into your Figma workspace as a library.
4. Open your design files, and use the [swap libraries](https://help.figma.com/hc/en-us/articles/4404856784663-Swap-style-and-component-libraries) feature in Figma to replace all references to the outdated version of the MOJ Figma Kit. You can only use 'swap libraries' with a paid Figma licence. If you do not have one, [swap components](https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances) individually instead.

{% endtab %}

{% tab "Help improve the Figma Kits" %}

## Help improve the Figma Kits

The MOJ Design System team would like to hear about:

- components missing from the Figma Kits
- Figma components that do not work properly
- mistakes in Figma components (for example, the wrong font weight or spacing)

[Contact the MOJ Design System team](/help) to give us your feedback.

{% endtab %}

{% endtabs %}
