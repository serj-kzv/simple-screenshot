import saveAndGetFn from './saveAndGetFn.js';

const getOrDefaultAsTxtFn = async option => JSON.stringify(await saveAndGetFn(option), null, 4);

export default getOrDefaultAsTxtFn;