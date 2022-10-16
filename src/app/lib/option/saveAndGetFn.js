import getOrDefaultFn from './getOrDefaultFn.js';

const saveAndGetFn = async option => {
    await browser.storage.local.clear();
    await browser.storage.local.set(option);

    return await getOrDefaultFn();
};

export default saveAndGetFn;