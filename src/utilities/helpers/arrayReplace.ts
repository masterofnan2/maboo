export default function <T>(callback: (prop: T) => boolean, replace: T, array: T[]): T[] {
    const newArray = array.filter(value => !callback(value));
    newArray.push(replace);
    return newArray;
}