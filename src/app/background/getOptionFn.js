import getOrDefaultFn from '../lib/option/getOrDefaultFn.js';

const getOptionFn = async () => {
    const option = await getOrDefaultFn();
    console.log(option);
    const {
        zoomOutRate,
        zoomOutRateDelay,
        qualityRate
    } = option['profile'].find(({name}) => name === option['activeProfile']);

    return {zoomOutRate, zoomOutRateDelay, qualityRate};
};

export default getOptionFn;