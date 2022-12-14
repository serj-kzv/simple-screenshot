import getOrDefaultFn from './getOrDefaultFn.js';

const resetAndGetFn = async () => {
    await browser.storage.local.clear();

    return await getOrDefaultFn();
};

export default resetAndGetFn;