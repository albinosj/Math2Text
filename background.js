chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
	  chrome.tabs.executeScript(
          {file: 'convertMath.js'});
  }
});