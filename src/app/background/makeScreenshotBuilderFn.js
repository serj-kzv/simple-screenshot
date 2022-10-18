import openAsPngFn from '../lib/openAsPngFn.js';
import saveAsPngFn from '../lib/saveAsPngFn.js';

const makeScreenshotBuilderFn = ({
                                     openScreenshotInNewTab,
                                     downloadScreenshot,
                                     zoomOutRate,
                                     zoomOutRateDelay,
                                     zoomOutRateMatchAboutBlank: matchAboutBlank,
                                     qualityRate
                                 }) => {
    return async tabId => {
        const css = {
            code: `body { transform-origin: 0 0; transform: scale(${1 / zoomOutRate}); }`,
            allFrames: true,
            cssOrigin: 'user',
            matchAboutBlank,
            runAt: 'document_start'
        };

        try {
            await browser.tabs.insertCSS(tabId, css);
            await new Promise(resolve => setTimeout(resolve, zoomOutRateDelay));

            const {width, height, scale} = await browser.tabs.sendMessage(tabId, null);
            let screenshot;

            try {
                screenshot = await browser.tabs.captureTab(
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
            } catch (e) {
                console.error(e);
            }

            await browser.tabs.removeCSS(tabId, css);

            const screenshotBlob = await (await fetch(screenshot)).blob();
            const screenshotActions = [];

            if (openScreenshotInNewTab) {
                screenshotActions.push(openAsPngFn(screenshotBlob));
            }
            if (downloadScreenshot) {
                screenshotActions.push(saveAsPngFn(
                    screenshotBlob,
                    `screenshot_${new Date().toISOString().replaceAll(':', '_')}.png`
                ));
            }
            await Promise.allSettled(screenshotActions);
        } catch (e) {
            await browser.tabs.removeCSS(tabId, css);
        }
    };
};

export default makeScreenshotBuilderFn;