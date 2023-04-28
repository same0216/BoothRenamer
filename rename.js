chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
    if (item.url.indexOf("https://booth.pm") === 0) {
        chrome.tabs.query({ active: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: function () {
                    return document.querySelector("a[class='nav']").innerHTML;
                }
            }, function (content) {
                let contentName = content[0].result
                let replaceFilename = contentName + ".zip"
                suggest({ filename: replaceFilename });
            });
        })
    } else {
        suggest({ filename: item.filename });
    }
    return true;
});