function saveChanges() {
  var showMath = showmathbox.checked;
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'MathSpeakShowMath': showMath}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
}

function loadChanges() {
    chrome.storage.sync.get(['MathSpeakShowMath'], function(result) {
        result.key;
    });
}