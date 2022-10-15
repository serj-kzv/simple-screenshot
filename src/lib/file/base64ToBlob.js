const base64ToBlob = async base64 => await (await fetch(base64)).blob();

export default base64ToBlob;