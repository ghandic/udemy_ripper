browser.browserAction.onClicked.addListener(function () {
    browser.tabs.executeScript({
      file: "udemy.js"
    });
});