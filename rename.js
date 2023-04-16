chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
    let replaceFilename = "";
    chrome.tabs.query({ active: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: getContentName
        }, (content) => {
            let contentName = content[0].result
            replaceFilename = contentName + ".zip"
            console.log(replaceFilename);
        });
    })
    console.log(replaceFilename);
    suggest({ filename: replaceFilename });
});

function getContentName() {
    return document.querySelector("a[class='nav']").innerHTML;
}