function loadOptions() {
    option = chrome.storage.sync.get(['mathSpeakOptions'], function(result) {
        option = result.mathSpeakOptions;
        checkBox = document.getElementById('showmathbox');
        if (option == false) {
            checkBox.checked = false;
        } else {
            checkBox.checked = true;
        }
    });
}

loadOptions();

document.getElementById('btSave').onclick = function() {
    checkBox = document.getElementById('showmathbox');
    chrome.storage.sync.set({'mathSpeakOptions': checkBox.checked});
    window.close();
  }