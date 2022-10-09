import openAsPngFn from "./file/openAsPngFn.js";

const sendAndGetFn = async (tabId, msg) => await browser.tabs.sendMessage(tabId, msg);
const sendAndGetPageSizeFn = async tabId => await sendAndGetFn(tabId, {type: 'getTabPageSize'});
const makeScreenshotFn = async (tabId, width, height) => await browser.tabs.captureTab(
    tabId,
    {
        rect: {
            x: 0,
            y: 0,
            width,
            height
        }
    }
);

browser.browserAction.onClicked.addListener(async ({id: tabId}) => {
    console.log('test')
    console.log(tabId)

    const css = {
        file: '/style.css',
        allFrames: true,
        cssOrigin: 'user',
        matchAboutBlank: true,
        runAt: 'document_start'
    };

    await browser.tabs.insertCSS(css);

    const {width, height} = await sendAndGetPageSizeFn(tabId);

    console.log(width)
    console.log(height)

    const screenshot = await makeScreenshotFn(tabId, width, height);

    await browser.tabs.removeCSS(css);

    console.log(screenshot)

    const screenshotBlob = await (await fetch(screenshot)).blob();

    console.log(screenshotBlob)

    await openAsPngFn(screenshotBlob);

    // console.log(tab)

});