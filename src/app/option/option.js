import getOrDefaultAsTxtFn from '../lib/option/getOrDefaultAsTxtFn.js';
import resetAndGetAsTxtFn from '../lib/option/resetAndGetAsTxtFn.js';
import saveTxtAndGetAsTxtFn from '../lib/option/saveTxtAndGetAsTxtFn.js';

const mainFn = async () => {
    const option = document.getElementById('option');

    option.value = await getOrDefaultAsTxtFn();
    document.getElementById('reset').addEventListener('click', async () => {
        try {
            option.value = await resetAndGetAsTxtFn();
        } catch (e) {
            alert('json is incorrect');
        }
    });
    document.getElementById('save').addEventListener('click', async () => {
        try {
            option.value = await saveTxtAndGetAsTxtFn(option.value);
        } catch (e) {
            alert('json is incorrect');
        }
    });
};

mainFn();