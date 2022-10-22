import makeImageFn from '../lib/makeImageFn.js';
import openAsPngFn from '../lib/openAsPngFn.js';
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
        console.log('avoidBug1784915CanvasHeightStep', avoidBug1784915CanvasHeightStep);
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

            console.log('height', height);

            const segment = height / avoidBug1784915CanvasHeightStep;
            console.log('segment', segment);
            const segmentLength = Math.floor(segment);
            console.log('segmentLength', segmentLength);
            const segmentRange = Array(segmentLength).fill().map((_, i) => i);

            console.log('segmentRange', segmentRange);

            const screenshotPromises = segmentRange.map(async i => {
                console.log('captureTabScreenshotFn i = ', i);

                const captureTabScreenshotPromise = await captureTabScreenshotFn(
                    tabId,
                    i * avoidBug1784915CanvasHeightStep,
                    width,
                    avoidBug1784915CanvasHeightStep,
                    scale,
                    zoomOutRate,
                    qualityRate
                );

                console.log('captureTabScreenshotPromise', captureTabScreenshotPromise);

                return captureTabScreenshotPromise;
            });
            const segmentRemainder = height % avoidBug1784915CanvasHeightStep;

            console.log('segmentRemainder', segmentRemainder);

            screenshotPromises.push(await captureTabScreenshotFn(
                tabId,
                segmentLength * avoidBug1784915CanvasHeightStep,
                width,
                segmentRemainder,
                scale,
                zoomOutRate,
                qualityRate
            ));

            console.log('screenshotPromises', screenshotPromises);
            const base64Screenshots = await Promise.all(screenshotPromises);
            console.log('base64Screenshots', base64Screenshots);

            const images = await Promise.all(base64Screenshots.map(async base64Screenshot => await makeImageFn(base64Screenshot)));
            console.log('pixels', images);

            const pixelsInfo = await Promise.all(images.map(async image => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const {naturalHeight: height, naturalWidth: width} = image;

                context.drawImage(image, 0, 0);

                return {pixels: context.getImageData(0, 0, width, height).data, width, height};
            }));
            console.log('pixelsInfo', pixelsInfo);

            const pixels = pixelsInfo.map(info => info.pixels);
            const pixelsFlat = Uint8ClampedArray.from(pixels.reduce((a, b) => [...a, ...b], []));

            console.log('pixelsFlat', pixelsFlat);

            const png = UPNG.encode([pixelsInfo[0].pixels.buffer], pixelsInfo[0].width, pixelsInfo[0].height, 0);
            // const png = UPNG.encode([(new Uint8Array([0,0,0,255, 255,0,0,255])).buffer], 2, 1, 0);

            console.log('png', png);

            await openAsPngFn(png);

            // const screenshotBlobPromises = base64Screenshots
            //     .map(async base64Screenshot => await (await fetch(base64Screenshot)).blob());
            // console.log('screenshotBlobPromises', screenshotBlobPromises);
            // const screenshotBlobs = await Promise.all(screenshotBlobPromises);
            // console.log('screenshotBlobs', screenshotBlobs);
            // const screenshotBlob = new Blob(screenshotBlobs, {type: "image/png"});
            // console.log('screenshotBlob', screenshotBlob);
            // await openAsPngFn(screenshotBlob);
            //
            // const openScreenshotInNewTabActions = openScreenshotInNewTab
            //     ? screenshotBlobs.map(async screenshotBlob => await openAsPngFn(screenshotBlob))
            //     : [];
            // console.log('openScreenshotInNewTabActions', openScreenshotInNewTabActions);
            // const downloadScreenshotActions = downloadScreenshot
            //     ? screenshotBlobs.map(async screenshotBlob => await saveAsPngFn(
            //         screenshotBlob,
            //         `screenshot_${new Date().toISOString().replaceAll(':', '_')}.png`
            //     ))
            //     : [];
            // console.log('downloadScreenshotActions', downloadScreenshotActions);
            //
            // await Promise.all([
            //     ...openScreenshotInNewTabActions,
            //     // ...downloadScreenshotActions
            // ]);
        } catch (e) {
            console.error(e);
            throw e;
        }
        await browser.tabs.removeCSS(tabId, css);
    };
};

export default makeScreenshotBuilderFn;