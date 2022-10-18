import getOrDefaultFn from "../lib/option/getOrDefaultFn.js";
import resetAndGetFn from "../lib/option/resetAndGetFn.js";
import saveTxtAndGetFn from "../lib/option/saveTxtAndGetFn.js";
import makeSimpleScreenshotBookmarksFn from './makeSimpleScreenshotBookmarksFn.js';

const mainFn = async () => {
    const option = document.getElementById('option');

    option.value = JSON.stringify(await getOrDefaultFn(), null, 2);
    document.getElementById('reset').addEventListener('click', async () => {
        try {
            option.value = JSON.stringify(await resetAndGetFn(), null, 2);
        } catch (e) {
            alert('json is incorrect');
        }
    });
    document.getElementById('save').addEventListener('click', async () => {
        try {
            option.value = JSON.stringify(await saveTxtAndGetFn(option.value), null, 2);
        } catch (e) {
            alert('json is incorrect');
        }
    });
    document.getElementById('makeBookmarks').addEventListener('click', async () => {
        await makeSimpleScreenshotBookmarksFn();
    });
};

mainFn();