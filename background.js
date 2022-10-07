import openAsPngFn from "./file/openAsPngFn.js";

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

    const {width, height} = (await browser.tabs.query({currentWindow: true, active: true}))[0];

    console.log(width)

    const screenshot = await browser.tabs.captureVisibleTab(
        (await browser.windows.getCurrent()).id,
        // {
        //     rect: {
        //         width: 9999,
        //         height: 9999
        //     }
        // }
    );

    await browser.tabs.removeCSS(css);

    console.log(screenshot)

    const screenshotBlob = await (await fetch(screenshot)).blob();

    console.log(screenshotBlob)

    await openAsPngFn(screenshotBlob);

    console.log(tab)

});