import saveAsDataFn from "./saveAsDataFn.js";

const saveAsPngFn = async (content, filename) => await saveAsDataFn(content, 'image/png', filename);

export default saveAsPngFn;