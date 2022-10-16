import getOrDefaultFn from './getOrDefaultFn.js';

const saveFn = async option => {
    await browser.storage.local.clear();
    await browser.storage.local.set(option);

    return await getOrDefaultFn();
};

export default saveFn;