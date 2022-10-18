import makeSimpleScreenshotBookmarksFn from './makeSimpleScreenshotBookmarksFn.js';
import saveTxtAndGetFn from "../lib/option/saveTxtAndGetFn";
import getOrDefaultFn from "../lib/option/getOrDefaultFn";
import resetAndGetFn from "../lib/option/resetAndGetFn";

const mainFn = async () => {
    const option = document.getElementById('option');

    option.value = JSON.stringify(await getOrDefaultFn(), null, 4);
    document.getElementById('reset').addEventListener('click', async () => {
        try {
            option.value = JSON.stringify(await resetAndGetFn(), null, 4);
        } catch (e) {
            alert('json is incorrect');
        }
    });
    document.getElementById('save').addEventListener('click', async () => {
        try {
            option.value = JSON.stringify(await saveTxtAndGetFn(option.value), null, 4);
        } catch (e) {
            alert('json is incorrect');
        }
    });
    document.getElementById('makeBookmarks').addEventListener('click', async () => {
        await makeSimpleScreenshotBookmarksFn();
    });
};

mainFn();