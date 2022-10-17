import getOptionFn from '../background/getOptionFn.js';
import makeScreenshotBuilderFn from '../background/makeScreenshotBuilderFn.js';

const makeSimpleScreenshotFn = async qualityRate => {
    const option = await getOptionFn();

    option['qualityRate'] = qualityRate;

    const makeScreenshotFn = makeScreenshotBuilderFn(option);

    await browser.tabs.query({active: false}, async (tabs) => {
        let tab = tabs.reduce((previous, current) => {
            return previous.lastAccessed > current.lastAccessed ? previous : current;
        });
        // previous tab
        console.log(tab);

        await makeScreenshotFn(tab.id);
        await browser.tabs.update(tab.id, {active: true});
    });

};

export default makeSimpleScreenshotFn;