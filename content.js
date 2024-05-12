// content.js

// Listen for changes to local storage
// Check if local storage is used

console.log("Storage Usage")
var localStorageVar = JSON.stringify(localStorage);
console.log(localStorageVar);
browser.runtime.sendMessage({ type: "getLocalStorage", data: localStorageVar });

var cookiesCount = document.cookie.split(';').length;
console.log("Number of cookies:", cookiesCount);


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "fetchLocalStorage") {
        console.log("Content script received a message")
        browser.runtime.sendMessage({ type: "getLocalStorage", data: localStorageVar });
    }
    if (message.type === "fetchCookies") {
        browser.runtime.sendMessage({ type: "getCookies", data: cookiesCount });
    }
})
