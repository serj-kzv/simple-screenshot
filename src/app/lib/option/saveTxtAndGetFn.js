import saveAndGetFn from './saveAndGetFn.js';

const saveTxtAndGetFn = async option => await saveAndGetFn(JSON.parse(option));

export default saveTxtAndGetFn;