import openAsPngFn from "./file/openAsPngFn.js";
import saveAsPngFn from "./file/saveAsPngFn.js";

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
    const css = {
        file: '/style.css',
        allFrames: true,
        cssOrigin: 'user',
        matchAboutBlank: true,
        runAt: 'document_start'
    };

    await browser.tabs.insertCSS(css);

    const {width, height} = await browser.tabs.sendMessage(tabId, null);
    const screenshot = await makeScreenshotFn(tabId, width, height);

    await browser.tabs.removeCSS(css);

    const screenshotBlob = await (await fetch(screenshot)).blob();

    await Promise.allSettled([
        openAsPngFn(screenshotBlob),
        saveAsPngFn(screenshotBlob, `screenshot_${new Date().toISOString().replaceAll(':', '_')}.png`)
    ]);
});