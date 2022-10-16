import getOptionFn from './getOptionFn.js';
import makeScreenshotBuilderFn from './makeScreenshotBuilderFn.js';

browser.browserAction.onClicked.addListener(async ({id}) => {
    const {
        zoomOutRate,
        zoomOutRateDelay,
        qualityRate,
        zoomOutRateMatchAboutBlank
    } = await getOptionFn();
    const makeScreenshotFn = makeScreenshotBuilderFn(
        zoomOutRate,
        zoomOutRateDelay,
        qualityRate,
        zoomOutRateMatchAboutBlank
    );

    await makeScreenshotFn(id);
});