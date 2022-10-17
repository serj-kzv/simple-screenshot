import getOptionFn from './getOptionFn.js';

const makeSimpleScreenshotBookmarksFn = async () => {
    const {uuid} = await getOptionFn();

    await browser.bookmarks.create({
        title: `SmplScrsht X1 Simple Screenshot Extension Bookmark - ${uuid}`,
        url: browser.runtime.getURL("src/app/bookmark/simpleScreenshotLevel1.html"),
    });
    await browser.bookmarks.create({
        title: `SmplScrsht X2 Simple Screenshot Extension Bookmark - ${uuid}`,
        url: browser.runtime.getURL("src/app/bookmark/simpleScreenshotLevel2.html"),
    });
    await browser.bookmarks.create({
        title: `SmplScrsht X4 Simple Screenshot Extension Bookmark - ${uuid}`,
        url: browser.runtime.getURL("src/app/bookmark/simpleScreenshotLevel4.html"),
    });
};

export default makeSimpleScreenshotBookmarksFn;