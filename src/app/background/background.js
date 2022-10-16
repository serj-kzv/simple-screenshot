import openAsPngFn from "../lib/openAsPngFn.js";
import getOrDefaultFn from '../lib/option/getOrDefaultFn.js';
import saveAsPngFn from "../lib/saveAsPngFn.js";

const getOptionFn = async () => {
    const option = await getOrDefaultFn();
    console.log(option);
    const {
        zoomOutRate,
        zoomOutRateDelay,
        qualityRate
    } = option['profile'].find(({name}) => name === option['activeProfile']);

    return {zoomOutRate, zoomOutRateDelay, qualityRate};
};
const onClickedListenerBuilderFn = (zoomOutRate, zoomOutRateDelay, qualityRate) => {
    return async tabId => {
        const css = {
            code: `body { transform-origin: 0 0; transform: scale(${1 / zoomOutRate}); }`,
            allFrames: true,
            cssOrigin: 'user',
            matchAboutBlank: true,
            runAt: 'document_start'
        };

        await browser.tabs.insertCSS(css);
        await new Promise(resolve => setTimeout(resolve, zoomOutRateDelay));

        const {width, height, scale} = await browser.tabs.sendMessage(tabId, null);
        const screenshot = await browser.tabs.captureTab(
            tabId,
            {
                rect: {
                    x: 0,
                    y: 0,
                    width,
                    height
                },
                scale: scale * zoomOutRate * qualityRate
            }
        );

        await browser.tabs.removeCSS(css);

        const screenshotBlob = await (await fetch(screenshot)).blob();

        await Promise.allSettled([
            openAsPngFn(screenshotBlob),
            saveAsPngFn(screenshotBlob, `screenshot_${new Date().toISOString().replaceAll(':', '_')}.png`)
        ]);
    };
};

browser.browserAction.onClicked.addListener(async ({id}) => {
    const {zoomOutRate, zoomOutRateDelay, qualityRate} = await getOptionFn();
    const handler = onClickedListenerBuilderFn(zoomOutRate, zoomOutRateDelay, qualityRate);

    await handler(id);
});