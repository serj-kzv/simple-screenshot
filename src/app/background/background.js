import getOptionFn from './getOptionFn.js';
import makeScreenshotBuilderFn from './makeScreenshotBuilderFn.js';

browser.management.onEnabled.addListener(async () => {
    const {openOptionOnEnabled} = await getOptionFn();

    if (openOptionOnEnabled) {
        await browser.runtime.openOptionsPage();
    }
});
browser.management.onInstalled.addListener(async () => {
    const {openOptionOnInstall} = await getOptionFn();

    if (openOptionOnInstall) {
        await browser.runtime.openOptionsPage();
    }
});
browser.runtime.onInstalled.addListener(async ({reason}) => {
    if (reason === 'install' || reason === 'update') {
        const {openOptionOnInstall, openOptionOnUpdate} = await getOptionFn();

        if (openOptionOnInstall || openOptionOnUpdate) {
            await browser.runtime.openOptionsPage();
        }
    }
});
browser.browserAction.onClicked.addListener(async ({id}) => {
    const makeScreenshotFn = makeScreenshotBuilderFn(await getOptionFn());

    await makeScreenshotFn(id);
});