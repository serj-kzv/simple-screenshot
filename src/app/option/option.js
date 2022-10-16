import getOrDefaultAsTxtFn from '../lib/option/getOrDefaultAsTxtFn.js';
import resetAndGetAsTxtFn from '../lib/option/resetAndGetAsTxtFn.js';
import saveTxtAndGetFn from '../lib/option/saveTxtAndGetFn.js';

const mainFn = async () => {
    const option = document.getElementById('option');

    option.value = await getOrDefaultAsTxtFn();
    document.getElementById('reset').addEventListener('click', async () => {
        option.value = await resetAndGetAsTxtFn();
    });
    document.getElementById('save').addEventListener('click', async () => {
        await saveTxtAndGetFn(option.value);
    });
    option.addEventListener('input', async () => {
        try {
            await saveTxtAndGetFn(option.value);
        } catch (e) {
            alert('json is incorrect');
        }
    });
};

mainFn();
