import getOptionFn from './getOptionFn.js';
import onClickedListenerBuilderFn from './onClickedListenerBuilderFn.js';

browser.browserAction.onClicked.addListener(async ({id}) => {
    const {zoomOutRate, zoomOutRateDelay, qualityRate} = await getOptionFn();
    const handler = onClickedListenerBuilderFn(zoomOutRate, zoomOutRateDelay, qualityRate);

    await handler(id);
});