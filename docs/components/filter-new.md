---
layout: layouts/component.njk
title: Filter
---

Use the filter component to let users filter a large list of items.

## Contributors

- Jen Thompson - OPG
- Karen Simpson - HMPPS Prison  

Last updated on (14 June 2021)

{% example "/examples/filter", 1000 %}

## Contents

- <a href="#overview">Overview</a>
- <a href="#how-it-works">How it works</a>
- <a href="#research-on-this-component">Research on this component</a>
- <a href="#accessibility">Accessibilty</a>
- <a href="#contribute-to-this-component">Contribute to this component</a>


## Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar pellentesque eros, ac malesuada erat lacinia vitae. Vivamus euismodmvmghjgh justo dui, vel gravida ipsum pretium a. Mauris vitae iaculis dui, quis ullamcorper dui. Mauris urna libero, ultricies a augue et, tincidunt congue metus. Phasellus suscipit luctus placerat. Pellentesque sollicitudin ac eros sit amet auctor. Donec odio nunc, aliquam nec mi eu, aliquet molestie diam.

## How it works

- Type ahead - introduced when there is many options, allowing users to reduce the list: <br/>[Finder Frontend Component Guide](https://finder-frontend.herokuapp.com/component-guide/option-select)

- Users in the Workflow tool are unlikely to select more than one filter at a time

#### Indicators and removing filters
- Indicators display the number of filters selected without a section.

#### Date picker
Used date picker instead of memorable date component
- The Memorable date component made it difficult for users to input dates from other systems
- Memorable date cropped off
- Date pickers tested well with users
- If going back further (years) it can become difficult
- Browser date picker is accessible with all browsers and assistive technologies (except Dragon)
- Need to pick a date that is [two weeks] from today


## Research on this component

- Have tested with users (Link to findings?)

## Accessibility

- Once we have a production version ready, we will test with keyboard only navigation

## Contribute to this component

Things we don’t know enough about:

- Users don’t always see that there is a filter component, we wonder if we should either show the component by default with the option to then hide, or make the button to show it more prominent. 

- Setting in the component to auto show or hide the component?

- Do existing filters with the ability to clear live at the top of the filter column or at the top of the content area?

- The possible con of having at the top of the filter column is when hidden there is no visual of what is filtered or way to clear without reopening the filter menu.
