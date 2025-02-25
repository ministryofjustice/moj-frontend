export const pageTemplate = `
  <main>
  <div id="alert-1" role="region"  class="moj-alert moj-alert--information moj-alert--with-heading" aria-label="information: This contains information" data-module="moj-alert" data-dismissible="true">
    <div>
      <svg class="moj-alert__icon" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" height="30" width="30"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2165 3.45151C11.733 2.82332 13.3585 2.5 15 2.5C16.6415 2.5 18.267 2.82332 19.7835 3.45151C21.3001 4.07969 22.6781 5.00043 23.8388 6.16117C24.9996 7.3219 25.9203 8.69989 26.5485 10.2165C27.1767 11.733 27.5 13.3585 27.5 15C27.5 18.3152 26.183 21.4946 23.8388 23.8388C21.4946 26.183 18.3152 27.5 15 27.5C13.3585 27.5 11.733 27.1767 10.2165 26.5485C8.69989 25.9203 7.3219 24.9996 6.16117 23.8388C3.81696 21.4946 2.5 18.3152 2.5 15C2.5 11.6848 3.81696 8.50537 6.16117 6.16117C7.3219 5.00043 8.69989 4.07969 10.2165 3.45151ZM16.3574 22.4121H13.6621V12.95H16.3574V22.4121ZM13.3789 9.20898C13.3789 8.98763 13.4212 8.7793 13.5059 8.58398C13.5905 8.38216 13.7044 8.20964 13.8477 8.06641C13.9974 7.91667 14.1699 7.79948 14.3652 7.71484C14.5605 7.63021 14.7721 7.58789 15 7.58789C15.2214 7.58789 15.4297 7.63021 15.625 7.71484C15.8268 7.79948 15.9993 7.91667 16.1426 8.06641C16.2923 8.20964 16.4095 8.38216 16.4941 8.58398C16.5788 8.7793 16.6211 8.98763 16.6211 9.20898C16.6211 9.43685 16.5788 9.64844 16.4941 9.84375C16.4095 10.0391 16.2923 10.2116 16.1426 10.3613C15.9993 10.5046 15.8268 10.6185 15.625 10.7031C15.4297 10.7878 15.2214 10.8301 15 10.8301C14.7721 10.8301 14.5605 10.7878 14.3652 10.7031C14.1699 10.6185 13.9974 10.5046 13.8477 10.3613C13.7044 10.2116 13.5905 10.0391 13.5059 9.84375C13.4212 9.64844 13.3789 9.43685 13.3789 9.20898Z" fill="currentColor"/></svg>
    </div>
    <div class="moj-alert__content">
        <h2 class="govuk-heading-m">This contains information</h2>
        Content that informs you of a thing. It really is so very informative, that&#39;s why it needs so much content and is really, exceedingly verbose.
    </div>
    <div class="moj-alert__action">
      <button class="moj-alert__dismiss" hidden>Dismiss</button>
    </div>
  </div>

  <h1 id="h1">Heading 1</h1>
  <section>
    <h2 id="h2">heading 2</h2>
    <div id="alert-2" role="region" class="moj-alert moj-alert--information" aria-label="information: You might like to know" data-module="moj-alert" data-dismissible="true">
      <div>
        <svg class="moj-alert__icon" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" height="30" width="30"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.2165 3.45151C11.733 2.82332 13.3585 2.5 15 2.5C16.6415 2.5 18.267 2.82332 19.7835 3.45151C21.3001 4.07969 22.6781 5.00043 23.8388 6.16117C24.9996 7.3219 25.9203 8.69989 26.5485 10.2165C27.1767 11.733 27.5 13.3585 27.5 15C27.5 18.3152 26.183 21.4946 23.8388 23.8388C21.4946 26.183 18.3152 27.5 15 27.5C13.3585 27.5 11.733 27.1767 10.2165 26.5485C8.69989 25.9203 7.3219 24.9996 6.16117 23.8388C3.81696 21.4946 2.5 18.3152 2.5 15C2.5 11.6848 3.81696 8.50537 6.16117 6.16117C7.3219 5.00043 8.69989 4.07969 10.2165 3.45151ZM16.3574 22.4121H13.6621V12.95H16.3574V22.4121ZM13.3789 9.20898C13.3789 8.98763 13.4212 8.7793 13.5059 8.58398C13.5905 8.38216 13.7044 8.20964 13.8477 8.06641C13.9974 7.91667 14.1699 7.79948 14.3652 7.71484C14.5605 7.63021 14.7721 7.58789 15 7.58789C15.2214 7.58789 15.4297 7.63021 15.625 7.71484C15.8268 7.79948 15.9993 7.91667 16.1426 8.06641C16.2923 8.20964 16.4095 8.38216 16.4941 8.58398C16.5788 8.7793 16.6211 8.98763 16.6211 9.20898C16.6211 9.43685 16.5788 9.64844 16.4941 9.84375C16.4095 10.0391 16.2923 10.2116 16.1426 10.3613C15.9993 10.5046 15.8268 10.6185 15.625 10.7031C15.4297 10.7878 15.2214 10.8301 15 10.8301C14.7721 10.8301 14.5605 10.7878 14.3652 10.7031C14.1699 10.6185 13.9974 10.5046 13.8477 10.3613C13.7044 10.2116 13.5905 10.0391 13.5059 9.84375C13.4212 9.64844 13.3789 9.43685 13.3789 9.20898Z" fill="currentColor"/></svg>
      </div>
      <div class="moj-alert__content">Content that informs you of a thing. <a href="#">More information</a></div>
      <div class="moj-alert__action">
        <button class="moj-alert__dismiss" hidden>Dismiss</button>
      </div>
    </div>


    <div id="alert-3"role="region" class="moj-alert moj-alert--success" aria-label="success: Woohoo!" data-module="moj-alert" data-dismissible="true">
      <div>
        <svg class="moj-alert__icon" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" height="30" width="30"><path d="M11.2869 24.6726L2.00415 15.3899L4.62189 12.7722L11.2869 19.4186L25.3781 5.32739L27.9958 7.96369L11.2869 24.6726Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="moj-alert__content">That thing just successfully occurred. <a href="#">Celebrate here</a></div>
      <div class="moj-alert__action">
        <button class="moj-alert__dismiss" hidden>Dismiss</button>
      </div>
    </div>

    <div id="alert-4" role="region" class="moj-alert moj-alert--warning" aria-label="warning: Something&#39;s not quite right"  data-module="moj-alert" data-dismissible="true">
      <div>
        <svg class="moj-alert__icon" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" height="30" width="30"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 2.44922L28.75 26.1992H1.25L15 2.44922ZM13.5107 9.49579H16.4697L16.2431 17.7678H13.7461L13.5107 9.49579ZM13.1299 21.82C13.1299 21.5661 13.1787 21.3285 13.2764 21.1071C13.374 20.8793 13.5075 20.6807 13.6768 20.5114C13.8525 20.3421 14.0544 20.2087 14.2822 20.111C14.5101 20.0134 14.7542 19.9645 15.0146 19.9645C15.2686 19.9645 15.5062 20.0134 15.7275 20.111C15.9554 20.2087 16.154 20.3421 16.3232 20.5114C16.4925 20.6807 16.626 20.8793 16.7236 21.1071C16.8213 21.3285 16.8701 21.5661 16.8701 21.82C16.8701 22.0804 16.8213 22.3246 16.7236 22.5524C16.626 22.7803 16.4925 22.9789 16.3232 23.1481C16.154 23.3174 15.9554 23.4509 15.7275 23.5485C15.5062 23.6462 15.2686 23.695 15.0146 23.695C14.7542 23.695 14.5101 23.6462 14.2822 23.5485C14.0544 23.4509 13.8525 23.3174 13.6768 23.1481C13.5075 22.9789 13.374 22.7803 13.2764 22.5524C13.1787 22.3246 13.1299 22.0804 13.1299 21.82Z" fill="currentColor"/></svg>
      </div>
      <div class="moj-alert__content">You should be aware of this thing. <a href="#">More information</a></div>
      <div class="moj-alert__action">
        <button class="moj-alert__dismiss" hidden>Dismiss</button>
      </div>
    </div>

    <div id="alert-5" role="region" class="moj-alert moj-alert--error"  aria-label="error: Woah, hold up!"  data-module="moj-alert" data-dismissible="true" data-dismissible="true" data-focus-on-dismiss-selector="#focusOnMe">
      <div>
        <svg class="moj-alert__icon" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" height="30" width="30"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.1777 2.5H9.82233L2.5 9.82233V20.1777L9.82233 27.5H20.1777L27.5 20.1777V9.82233L20.1777 2.5ZM10.9155 8.87769L15.0001 12.9623L19.0847 8.87771L21.1224 10.9154L17.0378 15L21.1224 19.0846L19.0847 21.1222L15.0001 17.0376L10.9155 21.1223L8.87782 19.0846L12.9624 15L8.87783 10.9153L10.9155 8.87769Z" fill="currentColor"/></svg>
      </div>
      <div class="moj-alert__content">Bad things happened. <a href="#">Contact us</a></div>
      <div class="moj-alert__action">
        <button class="moj-alert__dismiss" hidden>Dismiss</button>
      </div>
    </div>

    <div id="focusOnMe">I will receive focus</div>
  </section>
</main>
`
