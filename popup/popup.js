console.log("Popup script running");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Popup script received a message")
  console.log(message.type)
  switch (message.type) {
    case "thirdPartyConnection":
      updateMessage(`Third-party connection detected: ${message.url}`);
      break;
    case "getLocalStorage":
      // Display the changes to the user
      updateStorage(message.data);
      break;
    case "getCookies":
      // Display the changes to the user
      updateCookies(message.data);
      break;
    // Add cases for other types of messages you might send
  }
});

function updateMessage(message) {
  document.getElementById('message').textContent += message;
}

function updateStorage(storage) {
  document.getElementById('localStorageData').textContent = storage;
}

function updateCookies(cookies) {
  document.getElementById('cookies').textContent = "Cookies: " + cookies;
}


document.addEventListener("DOMContentLoaded", () => {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    browser.tabs.sendMessage(activeTab.id, {type: "fetchLocalStorage"});
    browser.tabs.sendMessage(activeTab.id, {type: "fetchCookies"});
    });
  
  const infoElement = document.getElementById("cookies");
});
