'use strict';

browser.browserAction.onClicked.addListener(async () => {
    console.log('test')

    const css = {
        file: '/style.css',
        allFrames: true,
        cssOrigin: 'user',
        matchAboutBlank: true,
        runAt: 'document_start'
    };

    await browser.tabs.insertCSS(css);

    const screenshot = await browser.tabs.captureVisibleTab();

    await browser.tabs.removeCSS(css);

    console.log(screenshot)

});