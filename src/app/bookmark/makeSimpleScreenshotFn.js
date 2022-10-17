import getOptionFn from '../background/getOptionFn.js';
import makeScreenshotBuilderFn from '../background/makeScreenshotBuilderFn.js';

const makeSimpleScreenshotFn = async qualityRate => {
    const option = await getOptionFn();

    option['qualityRate'] = qualityRate;

    const makeScreenshotFn = makeScreenshotBuilderFn(option);

    await browser.tabs.query({active: false}, async (tabs) => {
        const {id: previousTabId} = tabs.reduce((previous, current) =>
            previous.lastAccessed > current.lastAccessed ? previous : current);
        const currentTabId = (await browser.tabs.getCurrent()).id;

        await makeScreenshotFn(previousTabId);
        await Promise.allSettled([
            browser.tabs.remove(currentTabId),
            browser.tabs.update(previousTabId, {active: true})
        ]);
    });

};

export default makeSimpleScreenshotFn;