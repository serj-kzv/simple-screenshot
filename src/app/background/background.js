import getOptionFn from './getOptionFn.js';
import makeScreenshotBuilderFn from './makeScreenshotBuilderFn.js';

browser.browserAction.onClicked.addListener(async ({id}) => {
    const {zoomOutRate, zoomOutRateDelay, qualityRate} = await getOptionFn();
    const makeScreenshotFn = makeScreenshotBuilderFn(zoomOutRate, zoomOutRateDelay, qualityRate);

    await makeScreenshotFn(id);
});