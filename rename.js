chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
    // Boothのページ以外除外
    if (item.url.indexOf("https://booth.pm") === 0) {
        chrome.tabs.query({ active: true }, function (tabs) {
            // ギフトページと自身の購入かで選別
            if(tabs[0].url.indexOf("https://accounts.booth.pm/orders") === 0) {
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
            } else if(tabs[0].url.indexOf("https://accounts.booth.pm/gifts") === 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: function () {
                        return document.querySelector("div[class='text-black typograply-16 font-bold']").innerHTML;
                    }
                }, function (content) {
                    let contentName = content[0].result
                    let replaceFilename = contentName + ".zip"
                    suggest({ filename: replaceFilename });
                });
            } else {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: function () {
                        return document.querySelector("h2[class='font-bold leading-[32px] m-0 text-[24px]']").innerHTML;
                    }
                }, function (content) {
                    let contentName = content[0].result
                    let replaceFilename = contentName + ".zip"
                    suggest({ filename: replaceFilename });
                });
            }
            
        })
    } else {
        suggest({ filename: item.filename });
    }
    return true;
});