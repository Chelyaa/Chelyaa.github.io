function  get(url, callback) {&
    chrome.extension.sendRequest({ 'action':'xget', 'url':url}, callback);
}
