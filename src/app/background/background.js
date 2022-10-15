import openAsPngFn from "../../lib/openAsPngFn.js";
import saveAsPngFn from "../../lib/saveAsPngFn.js";

browser.browserAction.onClicked.addListener(async ({id: tabId}) => {
    const rate = 10;
    const css = {
        code: `body { transform-origin: 0 0; transform: scale(${1 / rate}); }`,
        allFrames: true,
        cssOrigin: 'user',
        matchAboutBlank: true,
        runAt: 'document_start'
    };

    await browser.tabs.insertCSS(css);

    const {width, height, scale} = await browser.tabs.sendMessage(tabId, null);
    console.log(scale);
    const screenshot = await browser.tabs.captureTab(
        tabId,
        {
            rect: {
                x: 0,
                y: 0,
                width,
                height
            },
            scale: scale * rate
        }
    );

    await browser.tabs.removeCSS(css);

    const screenshotBlob = await (await fetch(screenshot)).blob();

    await Promise.allSettled([
        openAsPngFn(screenshotBlob),
        saveAsPngFn(screenshotBlob, `screenshot_${new Date().toISOString().replaceAll(':', '_')}.png`)
    ]);
});