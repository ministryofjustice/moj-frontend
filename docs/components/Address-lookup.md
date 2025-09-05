---
title: Address lookup
tabs: true
status: Experimental
statusDate: September 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/categories/experimental-components-pages-and-patterns


---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1757076520937/Screenshot-2025-09-05-at-13.40.22.png" alt="Address lookup" />
</div>

## Overview
The address lookup component allows users to quickly find and select an address by typing part of the address or postcode into a search field. As the user types, a list of matching addresses appears in a dropdown, from which the correct option can be chosen. This approach reduces the need for users to enter full address details manually and helps avoid errors from incomplete or illegible entries.

The component also includes a fallback option to “Enter address manually,” ensuring users can provide an address if it is not available in the lookup results or if they prefer to enter it directly. This dual approach balances efficiency with inclusivity.

The design is based on established patterns such as the Royal Mail’s address lookup service. Visual examples show the step-by-step interaction: entering partial information, selecting a suggested address, and displaying the completed address in the field.

No accessibility testing has yet been carried out on the component, and the API provider for the address lookup has not been chosen. These will be explored before moving into private beta.

### How the component is currently used

The component has been used in the manage applications project during its alpha phase. It is applied when staff enter addresses of PIN contacts into the digital system, replacing the previous paper-based method. Staff input application details into a DPS interface, and the address lookup makes this process faster and less error-prone.

The feature has been well received because staff often deal with applications where prisoners do not know a full address, or the address is handwritten and difficult to read. The lookup helps staff identify and complete addresses more reliably, reducing mistakes caused by missing or illegible details.

This use demonstrates how the component can support digitisation of manual, paper-based services. It is especially useful where speed, accuracy, and reliability of address entry are important. The manual entry option remains available for flexibility when an address cannot be found through the lookup service.

### Contribute to this component
You can help develop this component by adding information to the [Address lookup Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma design was not included when this component was added.

      There may be more information in the [Address lookup Github discussion]({{ githuburl }}). You can also view the component image in the overview.

## Contribute a Figma link

      If you have a Figma link for this component (or a component like it) you can add it to [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

No accessibility findings were included when this component was added. There may be more information in the [Address lookup Github discussion]({{ githuburl }}).
## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

No code was included when this contribution was added.

You can use the [Address lookup Github discussion]({{ githuburl }}) to:

* view other code blocks
* add relevant code

{% endtab %}

{% endtabs %}
