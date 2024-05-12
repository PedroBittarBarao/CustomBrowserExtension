browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    const isThirdParty = details.url.startsWith("https://") &&!details.url.includes(window.location.hostname);
    if (isThirdParty) {
      console.log(`Third-party connection detected: ${details.url}`);
      browser.runtime.sendMessage({ type: "thirdPartyConnection", url: details.url });
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
