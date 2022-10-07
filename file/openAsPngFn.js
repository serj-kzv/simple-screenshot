import openAsDataFn from "./openAsDataFn.js";

const openAsPngFn = (
    content,
    charset,
    active = false,
    isNewTab = true,
    clearMemoryOnRemoved = true,
    clearMemoryOnReplaced = true,
    clearMemoryOnUpdated = true
) => openAsDataFn(
    content,
    {type: 'image/png', charset},
    {
        active,
        isNewTab,
        clearMemoryOnRemoved,
        clearMemoryOnReplaced,
        clearMemoryOnUpdated
    }
);

export default openAsPngFn;