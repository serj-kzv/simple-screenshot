import resetAndGetFn from './resetAndGetFn.js';

const resetAndGetAsTxtFn = async () => JSON.stringify(await resetAndGetFn(), null, 4);

export default resetAndGetAsTxtFn;