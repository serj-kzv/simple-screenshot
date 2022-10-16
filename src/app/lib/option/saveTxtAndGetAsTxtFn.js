import saveTxtAndGetFn from './saveTxtAndGetFn.js';

const saveTxtAndGetAsTxtFn = async option => JSON.stringify(await saveTxtAndGetFn(option), null, 4);

export default saveTxtAndGetAsTxtFn;