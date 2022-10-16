import getOrDefaultFn from './getOrDefaultFn.js';

const getOrDefaultAsTxtFn = async () => JSON.stringify(await getOrDefaultFn(), null, 4);

export default getOrDefaultAsTxtFn;