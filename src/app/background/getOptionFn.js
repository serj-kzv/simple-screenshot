import getOrDefaultFn from '../lib/option/getOrDefaultFn.js';

const getOptionFn = async () => {
    const option = await getOrDefaultFn();
    const {
        zoomOutRate,
        zoomOutRateDelay,
        zoomOutRateMatchAboutBlank,
        qualityRate,
    } = option['profile'].find(({name}) => name === option['activeProfile']);

    return {zoomOutRate, zoomOutRateDelay, zoomOutRateMatchAboutBlank, qualityRate};
};

export default getOptionFn;