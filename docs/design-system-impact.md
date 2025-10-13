---
layout: layouts/content.njk
subsection: About the Design System
title: Impact of the Design System
lede: xxx.
eleventyNavigation:
  key: Impact
  parent: About the Design System
  order: 10
  excerpt: "xxx."
---


## Overview

{% set total = 0 %}
{% for name, stats in impact %}
  {% set total = total + stats.hours_saved %}
{% endfor %}
**Total Hours Saved: {{ total | round(2) }}**

Date Picker prod usage: **{{ impact.date_picker.prod_usage }}**

