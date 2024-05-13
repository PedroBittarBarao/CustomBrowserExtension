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

function verificarRedirecionamento(details) {
  if (details.statusCode === 301 || details.statusCode === 302) {
      console.log("Redirecionamento detectado para:", details.url);
      browser.runtime.sendMessage({ type: "redirecionamentoDetectado", url: details.url });
  }
}

browser.webRequest.onHeadersReceived.addListener(
  verificarRedirecionamento,
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["responseHeaders"]
);

browser.webNavigation.onCommitted.addListener(
  verificarPaginaInicial,
  { url: [{ schemes: ["http", "https"] }] }
);

function verificarPaginaInicial(details) {
  browser.browserSettings.homepageOverride.get({}).then(result => {
      if (result.value !== details.url) {
          console.log("Alteração na página inicial detectada para:", details.url);
          browser.runtime.sendMessage({ type: "homepageChange", url: details.url });
      }
  });
}