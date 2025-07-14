    const csrf_token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    const ajaxLoad = () =&gt; {
        // process the URL hash fragment
        const hashFragment = window.location.hash.slice(1);

        // hash fragment should be of the format: /^(get|post);(.*)$/
        // e.g., https://site.com/index/#post;/profile
        if (hashFragment.length &gt; 0 &amp;&amp; hashFragment.includes(';')) {
            const params = hashFragment.match(/^(get|post);(.*)$/);

            if (params &amp;&amp; params.length) {
                const requestMethod = params[1];
                const requestEndpoint = params[3];

                fetch(requestEndpoint, {
                    method: requestMethod,
                    headers: {
                        'X-CSRF-Token': csrf_token,
                        // [...]
                    },
                    // [...]
                })
                .then(response =&gt; { /* [...] */ })
                .catch(error =&gt; console.error('Request failed:', error));
            }
        }
    };

    // trigger the async request on page load - better practice is to use event listeners
    window.addEventListener('DOMContentLoaded', ajaxLoad);