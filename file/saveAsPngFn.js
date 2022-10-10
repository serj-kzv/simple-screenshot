import saveAsDataFn from "./saveAsDataFn.js";

const saveAsPngFn = async (content, filename) => await saveAsDataFn(content, 'image/png', null, filename);

export default saveAsPngFn;