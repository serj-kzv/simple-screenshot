import getOrDefaultFn from '../lib/option/getOrDefaultFn.js';

const getOptionFn = async () => {
    const option = await getOrDefaultFn();

    return option['profile'].find(({name}) => name === option['activeProfile']);
};

export default getOptionFn;