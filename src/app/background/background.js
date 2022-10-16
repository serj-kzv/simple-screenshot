import getOptionFn from './getOptionFn.js';
import makeScreenshotBuilderFn from './makeScreenshotBuilderFn.js';

browser.browserAction.onClicked.addListener(async ({id}) => {
    const makeScreenshotFn = makeScreenshotBuilderFn(await getOptionFn());

    await makeScreenshotFn(id);
});