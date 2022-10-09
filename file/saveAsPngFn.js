import saveAsDataFn from "./saveAsDataFn.js";

const saveAsPngFn = async (content, filename) => await saveAsDataFn(content, 'application/octet-stream', null, filename);

export default saveAsPngFn;