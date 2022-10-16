import getOptionFn from './getOptionFn.js';
import makeScreenshotBuilderFn from './makeScreenshotBuilderFn.js';

browser.browserAction.onClicked.addListener(async ({id}) => {
    const {
        zoomOutRate,
        zoomOutRateDelay,
        zoomOutRateMatchAboutBlank,
        qualityRate
    } = await getOptionFn();
    const makeScreenshotFn = makeScreenshotBuilderFn(
        zoomOutRate,
        zoomOutRateDelay,
        zoomOutRateMatchAboutBlank,
        qualityRate
    );

    await makeScreenshotFn(id);
});