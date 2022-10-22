const makeImageFn = base64Image => {
    return new Promise(resolve => {
        const image = new Image();

        image.src = base64Image;
        image.addEventListener('load', () => {
            resolve(image);
        });
    });
};

export default makeImageFn;