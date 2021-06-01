---
layout: layouts/component.njk
title: Task list
---

Use the task list component to show help users understand:

- the tasks involved in completing a transaction
- the order they should complete tasks in
- when they have completed tasks

The [task list pattern](https://design-system.service.gov.uk/patterns/task-list-pages/) is published in the GOV.UK Design System and there is a [coded example of a task list page](https://govuk-prototype-kit.herokuapp.com/docs/templates/task-list) in the GOV.UK Prototype Kit.

{% example "/examples/task-list", 600 %}

## When to use this component

Only use a task list page for longer transactions involving multiple tasks that users may need to complete over a number of sessions.

Try to simplify the transaction before you use a task list page. If you're able to reduce the number of tasks or steps involved, you may not need one.

## How it works

You should show a task list page:

- at the start of the transaction
- at the start of each returning session

When using a task list page in your service you need to:

- group related actions into tasks
- show the status of each task

If there are lots of tasks to complete, you might also need to group them into sub-sections.

### How to use this component

There are 2 ways to use the task list component. You can use HTML or, if you are using [Nunjucks](https://mozilla.github.io/nunjucks/) or the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/), you can use the Nunjucks macro.

## Research on this component

This pattern has been used in a number of services, including the following.

- Apply for probate
- Money claims

If you have used the task list component, get in touch to share your research findings.

## Contribute to this component

You can contribute to this component via the [design system backlog](https://github.com/ministryofjustice/moj-design-system-backlog/issues/54)
