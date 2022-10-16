import saveFn from './saveFn.js';

const saveTxtFn = async option => await saveFn(JSON.parse(option));

export default saveTxtFn;