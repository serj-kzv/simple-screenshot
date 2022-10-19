const captureTabScreenshotFn = async (y, width, height, scale, zoomOutRate, qualityRate) => {
    return await browser.tabs.captureTab(
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
};

export default captureTabScreenshotFn;