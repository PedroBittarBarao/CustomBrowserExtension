browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "thirdPartyConnection":
      updateMessage(`Third-party connection detected: ${message.url}`);
      break;
    case "localStorageChanged":
      // Display the changes to the user
      let changesMessage = "Local storage changed:\n";
      for (let key in message.changes) {
        changesMessage += `${key}: ${JSON.stringify(message.changes[key])}\n`;
      }
      updateMessage(changesMessage);
      break;
      case 
    // Add cases for other types of messages you might send
  }
});

function updateMessage(message) {
  document.getElementById('message').textContent = message;
}


document.addEventListener("DOMContentLoaded", () => {
  const infoElement = document.getElementById("info");
  browser.cookies.getAll({}).then((cookies) => {
    infoElement.textContent = `Number of cookies: ${cookies.length}`;
  })

})

browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local") {
    console.log("Local storage changed");
    // Send a message to the popup script with the changes
    browser.runtime.sendMessage({ type: "localStorageChanged", changes: changes });
  }
});