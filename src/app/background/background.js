import openAsPngFn from "../../lib/openAsPngFn.js";
import saveAsPngFn from "../../lib/saveAsPngFn.js";

browser.browserAction.onClicked.addListener(async ({id: tabId}) => {
    const css = {
        file: '/src/app/background/style.css',
        allFrames: true,
        cssOrigin: 'user',
        matchAboutBlank: true,
        runAt: 'document_start'
    };

    await browser.tabs.insertCSS(css);

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

    await browser.tabs.removeCSS(css);

    const screenshotBlob = await (await fetch(screenshot)).blob();

    await Promise.allSettled([
        openAsPngFn(screenshotBlob),
        saveAsPngFn(screenshotBlob, `screenshot_${new Date().toISOString().replaceAll(':', '_')}.png`)
    ]);
});