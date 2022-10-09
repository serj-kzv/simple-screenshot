console.log('content.js')

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    if (msg.type === 'getTabPageSize') {
        const {width, height} = document.body.getBoundingClientRect();

        sendResponse({width, height});
    }
});