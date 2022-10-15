import openAsPngFn from "../../lib/file/openAsPngFn.js";
import saveAsPngFn from "../../lib/file/saveAsPngFn.js";
import base64ToBlob from "../../lib/file/base64ToBlob.js";

const applyCssFn = async () => {
    const css = {
        file: '/style.css',
        allFrames: true,
        cssOrigin: 'user',
        matchAboutBlank: true,
        runAt: 'document_start'
    };

    await browser.tabs.insertCSS(css);
};
const unapplyCssFn = async () => {
    await browser.tabs.removeCSS(css);
};

browser.browserAction.onClicked.addListener(async ({id: tabId}) => {
    await applyCssFn();

    const {width, height} = await browser.tabs.sendMessage(tabId, null);
    const screenshot = await browser.tabs.captureTab(
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

    await unapplyCssFn();

    const screenshotBlob = await base64ToBlob(screenshot);

    await Promise.allSettled([
        openAsPngFn(screenshotBlob),
        saveAsPngFn(screenshotBlob, `screenshot_${new Date().toISOString().replaceAll(':', '_')}.png`)
    ]);
});