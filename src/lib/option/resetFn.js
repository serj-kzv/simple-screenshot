import getOrDefaultFn from './getOrDefaultFn.js';

const resetFn = async () => {
    await browser.storage.local.clear();

    return await getOrDefaultFn();
};

export default resetFn;