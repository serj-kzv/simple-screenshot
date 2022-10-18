import getOptionFn from '../background/getOptionFn.js';

const makeSimpleScreenshotBookmarksFn = async () => {
    const {uuid} = await getOptionFn();

    const {id: parentId} = await browser.bookmarks.create({
        parentId: 'menu________',
        title: `Folder for Simple Screenshot Extension Bookmark - ${uuid}`
    });

    await browser.bookmarks.create({
        parentId,
        title: `SmplScrsht X1 Simple Screenshot Extension Bookmark - ${uuid}`,
        url: browser.runtime.getURL("src/app/bookmark/simpleScreenshotLevel1.html"),
    });
    await browser.bookmarks.create({
        parentId,
        title: `SmplScrsht X2 Simple Screenshot Extension Bookmark - ${uuid}`,
        url: browser.runtime.getURL("src/app/bookmark/simpleScreenshotLevel2.html"),
    });
    await browser.bookmarks.create({
        parentId,
        title: `SmplScrsht X4 Simple Screenshot Extension Bookmark - ${uuid}`,
        url: browser.runtime.getURL("src/app/bookmark/simpleScreenshotLevel4.html"),
    });
};

export default makeSimpleScreenshotBookmarksFn;