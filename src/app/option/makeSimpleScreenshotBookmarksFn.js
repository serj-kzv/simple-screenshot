import getOptionFn from '../background/getOptionFn.js';

const makeSimpleScreenshotBookmarksFn = async () => {
    const {uuid} = await getOptionFn();
    const title = `Folder for Simple Screenshot Extension Bookmark - ${uuid}`;
    const title1 = `SmplScrsht X1 Simple Screenshot Extension Bookmark - ${uuid}`;
    const title2 = `SmplScrsht X2 Simple Screenshot Extension Bookmark - ${uuid}`;
    const title4 = `SmplScrsht X4 Simple Screenshot Extension Bookmark - ${uuid}`;

    await Promise.allSettled([
        ...(await browser.bookmarks.search({title: title1})).map(async ({id}) => await browser.bookmarks.remove(id)),
        ...(await browser.bookmarks.search({title: title2})).map(async ({id}) => await browser.bookmarks.remove(id)),
        ...(await browser.bookmarks.search({title: title4})).map(async ({id}) => await browser.bookmarks.remove(id))
    ]);
    await Promise.allSettled((await browser.bookmarks.search({title})).map(async ({id}) => await browser.bookmarks.remove(id)));

    const {id: parentId} = await browser.bookmarks.create({
        parentId: 'menu________',
        title
    });

    await browser.bookmarks.create({
        parentId,
        title: title1,
        url: browser.runtime.getURL("src/app/bookmark/simpleScreenshotLevel1.html"),
    });
    await browser.bookmarks.create({
        parentId,
        title: title2,
        url: browser.runtime.getURL("src/app/bookmark/simpleScreenshotLevel2.html"),
    });
    await browser.bookmarks.create({
        parentId,
        title: title4,
        url: browser.runtime.getURL("src/app/bookmark/simpleScreenshotLevel4.html"),
    });
};

export default makeSimpleScreenshotBookmarksFn;