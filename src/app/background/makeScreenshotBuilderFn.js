import openAsPngFn from '../lib/openAsPngFn.js';
import saveAsPngFn from '../lib/saveAsPngFn.js';
import captureTabScreenshotFn from './captureTabScreenshotFn.js';

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

            console.log(height);

            const maxSegmentHeight = 32767;
            const segmentLength = Math.floor(height / maxSegmentHeight);
            const screenshotPromises = Array(segmentLength)
                .fill()
                .map((_, i) => i)
                .map(async i => await captureTabScreenshotFn(
                    i * maxSegmentHeight,
                    width,
                    maxSegmentHeight,
                    scale,
                    zoomOutRate,
                    qualityRate
                ))
                .splice(
                    segmentLength,
                    0,
                    await captureTabScreenshotFn(
                        segmentLength * maxSegmentHeight,
                        width,
                        height % maxSegmentHeight,
                        scale,
                        zoomOutRate,
                        qualityRate
                    )
                );
            const base64Screenshots = await Promise.allSettled(screenshotPromises);
            const screenshotBlobPromises = base64Screenshots.map(async base64Screenshot => await (await fetch(base64Screenshot)).blob());
            const screenshotBlobs = await Promise.allSettled(screenshotBlobPromises);
            let screenshotActions = [];

            if (openScreenshotInNewTab) {
                screenshotActions = [
                    ...screenshotBlobs.map(async screenshotBlob => await openAsPngFn(screenshotBlob))
                ];
            }
            if (downloadScreenshot) {
                screenshotActions = [
                    ...screenshotActions,
                    ...screenshotBlobs.map(async screenshotBlob => await saveAsPngFn(
                        screenshotBlob,
                        `screenshot_${new Date().toISOString().replaceAll(':', '_')}.png`
                    ))
                ];
            }
            await Promise.allSettled(screenshotActions);
        } catch (e) {
            await browser.tabs.removeCSS(tabId, css);
        }
    };
};

export default makeScreenshotBuilderFn;