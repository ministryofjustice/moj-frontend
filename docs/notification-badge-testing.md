---
layout: layouts/content.njk
subsection: Unpublished page
title: Notification badge positioning
lede: Checking how different spacing between the notification badge and other items makes them look associated, or not.
---

### Next to a link

<a href="#">Badge outside of link text</a> <span id="notifications" class="moj-notification-badge">10</span>
<p>Above: Using a space for padding. The notification badge is not clickable because it is outside of the <code>a</code> tag.</p>

<a href="#">Badge inside link text<span id="notifications" class="moj-notification-badge">10</span></a>
<p>Above: The badge is clickable but the space is underlined, which looks strange.</p>

<hr>

### In MoJ Primary nav

#### No margin

<div class="moj-primary-navigation">
  <div class="moj-primary-navigation__container">
    <div class="moj-primary-navigation__nav">
      <nav class="moj-primary-navigation" aria-label="Primary navigation">
        <ul class="moj-primary-navigation__list">
          <li class="moj-primary-navigation__item">
            <a class="moj-primary-navigation__link" aria-current="page" href="#1">Nav item 1 <span id="notifications" class="moj-notification-badge">1</span></a>
          </li>
          <li class="moj-primary-navigation__item">
            <a class="moj-primary-navigation__link" href="#2">Nav item 2</a>
          </li>
          <li class="moj-primary-navigation__item">
            <a class="moj-primary-navigation__link" href="#3">Nav item 3<span id="notifications" class="moj-notification-badge">10</span></a>
          </li>
          <li class="moj-primary-navigation__item">
            <a class="moj-primary-navigation__link" href="#3">Nav item 4</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>

<br/>

#### 6px margin

<div class="moj-primary-navigation">
  <div class="moj-primary-navigation__container">
    <div class="moj-primary-navigation__nav">
      <nav class="moj-primary-navigation" aria-label="Primary navigation">
        <ul class="moj-primary-navigation__list">
          <li class="moj-primary-navigation__item">
            <a class="moj-primary-navigation__link" aria-current="page" href="#1">Nav item 1 <span id="notifications" class="moj-notification-badge">10</span></a>
          </li>
          <li class="moj-primary-navigation__item">
            <a class="moj-primary-navigation__link" href="#2">Nav item 2</a>
          </li>
          <li class="moj-primary-navigation__item">
            <a class="moj-primary-navigation__link" href="#3">Nav item 3<span id="notifications" class="moj-notification-badge">10</span></a>
          </li>
          <li class="moj-primary-navigation__item">
            <a class="moj-primary-navigation__link" href="#3">Nav item 4</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>

<br/>
<hr/>

### MoJ sub nav

#### 6px margin

<nav class="moj-sub-navigation" aria-label="Sub navigation">

  <ul class="moj-sub-navigation__list">
    <li class="moj-sub-navigation__item">
      <a class="moj-sub-navigation__link" href="#1">Nav item 1 <span id="notifications" class="moj-notification-badge" style="margin-left: 6px">10</span></a>
    </li>
    <li class="moj-sub-navigation__item">
      <a class="moj-sub-navigation__link" href="#2">Nav item 2 <span id="notifications" class="moj-notification-badge" style="margin-left: 6px">10</span></a>
    </li>
    <li class="moj-sub-navigation__item">
      <a class="moj-sub-navigation__link" aria-current="page" href="#3">Nav item 3 <span id="notifications" class="moj-notification-badge" style="margin-left: 6px">10</span></a>
    </li>
  </ul>
</nav>

<hr/>

### In MoJ side navigation

#### No margin, left aligned

<div class="govuk-grid-row">
  <div class="govuk-grid-column-one-third">
    <nav class="moj-side-navigation" aria-label="Side navigation">
      <ul class="moj-side-navigation__list">
        <li class="moj-side-navigation__item">
          <a href="#1" aria-current="location">Nav item 1</a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="#2">Nav item 2</a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="#3">Different length <span id="notifications" class="moj-notification-badge">10</span></a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="#3">Short one</a>
        </li>
        <li class="moj-side-navigation__item moj-side-navigation__item--active">
          <a href="#3">Longer active nav item <span id="notifications" class="moj-notification-badge">10</span></a>
        </li>
      </ul>
    </nav>
  </div>
</div>

<br/>
<p>Above: Too little spacing? Each nav item with a tag has a height of 47px, items without have a height of 40px, creating weird spacing between the titles of the items.</p>

#### 6px margin, left aligned

<div class="govuk-grid-row">
  <div class="govuk-grid-column-one-third">
    <nav class="moj-side-navigation" aria-label="Side navigation">
      <ul class="moj-side-navigation__list">
        <li class="moj-side-navigation__item">
          <a href="#1" aria-current="location">Nav item 1</a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="#2">Nav item 2</a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="#3">Different length <span id="notifications" class="moj-notification-badge">10</span></a>
        </li>
        <li class="moj-side-navigation__item">
          <a href="#3">Short one</a>
        </li>
        <li class="moj-side-navigation__item moj-side-navigation__item--active">
          <a href="#3">Longer active nav item <span id="notifications" class="moj-notification-badge">10</span></a>
        </li>
      </ul>
    </nav>
  </div>
</div>

<br/>
<p>Above: each nav item with a tag has a height of 47px, items without have a height of 40px, creating weird spacing between the titles of the items.</p>

<hr/>

### GOV.UK tabs

<p>Yes I know they've been re-styled!</p>

#### No margin

<div class="govuk-tabs" data-module="govuk-tabs">
  <h2 class="govuk-tabs__title">
    Contents
  </h2>
  <ul class="govuk-tabs__list">
    <li class="govuk-tabs__list-item govuk-tabs__list-item--selected">
      <a class="govuk-tabs__tab" href="#past-day">
        Past day
        <span id="notifications" class="moj-notification-badge">10</span>
      </a>
    </li>
    <li class="govuk-tabs__list-item">
      <a class="govuk-tabs__tab" href="#past-week">
        Past week
      </a>
    </li>
    <li class="govuk-tabs__list-item">
      <a class="govuk-tabs__tab" href="#past-month">
        Past month
      </a>
    </li>
    <li class="govuk-tabs__list-item">
      <a class="govuk-tabs__tab" href="#past-year">
        Past year
      </a>
    </li>
  </ul>
  <div class="govuk-tabs__panel" id="past-day">
    <h2 class="govuk-heading-l">Past day</h2>
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Case manager</th>
          <th scope="col" class="govuk-table__header">Cases opened</th>
          <th scope="col" class="govuk-table__header">Cases closed</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">David Francis</td>
          <td class="govuk-table__cell">3</td>
          <td class="govuk-table__cell">0</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Paul Farmer</td>
          <td class="govuk-table__cell">1</td>
          <td class="govuk-table__cell">0</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Rita Patel</td>
          <td class="govuk-table__cell">2</td>
          <td class="govuk-table__cell">0</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-week">
    <h2 class="govuk-heading-l">Past week</h2>
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Case manager</th>
          <th scope="col" class="govuk-table__header">Cases opened</th>
          <th scope="col" class="govuk-table__header">Cases closed</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">David Francis</td>
          <td class="govuk-table__cell">24</td>
          <td class="govuk-table__cell">18</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Paul Farmer</td>
          <td class="govuk-table__cell">16</td>
          <td class="govuk-table__cell">20</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Rita Patel</td>
          <td class="govuk-table__cell">24</td>
          <td class="govuk-table__cell">27</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-month">
    <h2 class="govuk-heading-l">Past month</h2>
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Case manager</th>
          <th scope="col" class="govuk-table__header">Cases opened</th>
          <th scope="col" class="govuk-table__header">Cases closed</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">David Francis</td>
          <td class="govuk-table__cell">98</td>
          <td class="govuk-table__cell">95</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Paul Farmer</td>
          <td class="govuk-table__cell">122</td>
          <td class="govuk-table__cell">131</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Rita Patel</td>
          <td class="govuk-table__cell">126</td>
          <td class="govuk-table__cell">142</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-year">
    <h2 class="govuk-heading-l">Past year</h2>
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Case manager</th>
          <th scope="col" class="govuk-table__header">Cases opened</th>
          <th scope="col" class="govuk-table__header">Cases closed</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">David Francis</td>
          <td class="govuk-table__cell">1380</td>
          <td class="govuk-table__cell">1472</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Paul Farmer</td>
          <td class="govuk-table__cell">1129</td>
          <td class="govuk-table__cell">1083</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Rita Patel</td>
          <td class="govuk-table__cell">1539</td>
          <td class="govuk-table__cell">1265</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### 6px margin

<div class="govuk-tabs" data-module="govuk-tabs">
  <h2 class="govuk-tabs__title">
    Contents
  </h2>
  <ul class="govuk-tabs__list">
    <li class="govuk-tabs__list-item govuk-tabs__list-item--selected">
      <a class="govuk-tabs__tab" href="#past-day">
        Past day
        <span id="notifications" class="moj-notification-badge" style="margin-left: 6px">10</span>
      </a>
    </li>
    <li class="govuk-tabs__list-item">
      <a class="govuk-tabs__tab" href="#past-week">
        Past week
      </a>
    </li>
    <li class="govuk-tabs__list-item">
      <a class="govuk-tabs__tab" href="#past-month">
        Past month
      </a>
    </li>
    <li class="govuk-tabs__list-item">
      <a class="govuk-tabs__tab" href="#past-year">
        Past year
      </a>
    </li>
  </ul>
  <div class="govuk-tabs__panel" id="past-day">
    <h2 class="govuk-heading-l">Past day</h2>
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Case manager</th>
          <th scope="col" class="govuk-table__header">Cases opened</th>
          <th scope="col" class="govuk-table__header">Cases closed</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">David Francis</td>
          <td class="govuk-table__cell">3</td>
          <td class="govuk-table__cell">0</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Paul Farmer</td>
          <td class="govuk-table__cell">1</td>
          <td class="govuk-table__cell">0</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Rita Patel</td>
          <td class="govuk-table__cell">2</td>
          <td class="govuk-table__cell">0</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-week">
    <h2 class="govuk-heading-l">Past week</h2>
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Case manager</th>
          <th scope="col" class="govuk-table__header">Cases opened</th>
          <th scope="col" class="govuk-table__header">Cases closed</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">David Francis</td>
          <td class="govuk-table__cell">24</td>
          <td class="govuk-table__cell">18</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Paul Farmer</td>
          <td class="govuk-table__cell">16</td>
          <td class="govuk-table__cell">20</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Rita Patel</td>
          <td class="govuk-table__cell">24</td>
          <td class="govuk-table__cell">27</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-month">
    <h2 class="govuk-heading-l">Past month</h2>
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Case manager</th>
          <th scope="col" class="govuk-table__header">Cases opened</th>
          <th scope="col" class="govuk-table__header">Cases closed</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">David Francis</td>
          <td class="govuk-table__cell">98</td>
          <td class="govuk-table__cell">95</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Paul Farmer</td>
          <td class="govuk-table__cell">122</td>
          <td class="govuk-table__cell">131</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Rita Patel</td>
          <td class="govuk-table__cell">126</td>
          <td class="govuk-table__cell">142</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-year">
    <h2 class="govuk-heading-l">Past year</h2>
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Case manager</th>
          <th scope="col" class="govuk-table__header">Cases opened</th>
          <th scope="col" class="govuk-table__header">Cases closed</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">David Francis</td>
          <td class="govuk-table__cell">1380</td>
          <td class="govuk-table__cell">1472</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Paul Farmer</td>
          <td class="govuk-table__cell">1129</td>
          <td class="govuk-table__cell">1083</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell">Rita Patel</td>
          <td class="govuk-table__cell">1539</td>
          <td class="govuk-table__cell">1265</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<hr/>

### GOV.UK service navigation

#### 6px margin

<div class="govuk-service-navigation"
  data-module="govuk-service-navigation">
  <div class="govuk-width-container">
    <div class="govuk-service-navigation__container">
      <nav aria-label="Menu" class="govuk-service-navigation__wrapper">
        <button type="button" class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle" aria-controls="navigation" hidden>
          Menu
        </button>
        <ul class="govuk-service-navigation__list" id="navigation">
          <li class="govuk-service-navigation__item">
            <a class="govuk-service-navigation__link" href="#">
              Navigation item 1
              <span id="notifications" class="moj-notification-badge">10</span>
            </a>
          </li>
          <li class="govuk-service-navigation__item govuk-service-navigation__item--active">
            <a class="govuk-service-navigation__link" href="#" aria-current="true">
              <strong class="govuk-service-navigation__active-fallback">Navigation item 2 <span id="notifications" class="moj-notification-badge">10</span></strong>
            </a>
          </li>
          <li class="govuk-service-navigation__item">
            <a class="govuk-service-navigation__link" href="#">
              Navigation item 3
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>