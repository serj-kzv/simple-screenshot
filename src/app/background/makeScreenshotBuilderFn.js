import openAsPngFn from '../lib/openAsPngFn.js';
import saveAsPngFn from '../lib/saveAsPngFn.js';
import captureTabScreenshotFn from './captureTabScreenshotFn.js';

const makeScreenshotBuilderFn = ({
                                     openScreenshotInNewTab,
                                     downloadScreenshot,
                                     zoomOutRate,
                                     zoomOutRateDelay,
                                     zoomOutRateMatchAboutBlank: matchAboutBlank,
                                     qualityRate,
                                     avoidBug1784915CanvasHeightStep
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

            const segmentLength = Math.floor(height / avoidBug1784915CanvasHeightStep);
            const screenshotPromises = Array(segmentLength)
                .fill()
                .map((_, i) => i)
                .map(async i => await captureTabScreenshotFn(
                    tabId,
                    i * avoidBug1784915CanvasHeightStep,
                    width,
                    avoidBug1784915CanvasHeightStep,
                    scale,
                    zoomOutRate,
                    qualityRate
                ))
                .splice(
                    segmentLength,
                    0,
                    await captureTabScreenshotFn(
                        tabId,
                        segmentLength * avoidBug1784915CanvasHeightStep,
                        width,
                        height % avoidBug1784915CanvasHeightStep,
                        scale,
                        zoomOutRate,
                        qualityRate
                    )
                );
            const base64Screenshots = await Promise.allSettled(screenshotPromises);
            const screenshotBlobPromises = base64Screenshots
                .map(async base64Screenshot => await (await fetch(base64Screenshot)).blob());
            const screenshotBlobs = await Promise.allSettled(screenshotBlobPromises);
            const openScreenshotInNewTabActions = openScreenshotInNewTab
                ? screenshotBlobs.map(async screenshotBlob => await openAsPngFn(screenshotBlob))
                : [];
            const downloadScreenshotActions = downloadScreenshot
                ? screenshotBlobs.map(async screenshotBlob => await saveAsPngFn(
                    screenshotBlob,
                    `screenshot_${new Date().toISOString().replaceAll(':', '_')}.png`
                ))
                : [];

            await Promise.allSettled([
                ...openScreenshotInNewTabActions,
                ...downloadScreenshotActions
            ]);
        } catch (e) {
            console.error(e);
        }
        await browser.tabs.removeCSS(tabId, css);
    };
};

export default makeScreenshotBuilderFn;