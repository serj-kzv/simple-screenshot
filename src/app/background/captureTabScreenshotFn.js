const captureTabScreenshotFn = async (tabId, y, width, height, scale, zoomOutRate, qualityRate) => {
    let screenshot;

    try {
        screenshot = await browser.tabs.captureTab(
            tabId,
            {
                rect: {
                    x: 0,
                    y: y,
                    width,
                    height
                },
                scale: scale * zoomOutRate * qualityRate
            }
        );
    } catch (e) {
        console.error(e);
        throw e;
    }

    return screenshot;
};

export default captureTabScreenshotFn;