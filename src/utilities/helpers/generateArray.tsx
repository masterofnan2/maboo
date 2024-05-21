function generateArray(size: number = 6, value: string | number  = '') {
    var sizedArray = Array.apply(null, Array(size));
    var result = sizedArray.map(() => value);
    return result;
}

export default generateArray;