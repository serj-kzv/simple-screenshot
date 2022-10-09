browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const {width, height} = document.body.getBoundingClientRect();

    sendResponse({width, height});
});