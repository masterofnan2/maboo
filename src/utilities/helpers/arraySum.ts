export default function arraySum<A>(array: A[], callback: (value: A) => number): number {
    let sum = 0;

    array.forEach(item => {
        sum += callback(item);
    })

    return sum;
}