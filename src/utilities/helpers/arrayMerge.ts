export default function<T>(...arrays: T[][]): T[] {
  let output: T[] = [];
  
  arrays.forEach((array) => {
    output = output.concat(array);
  });

  return output;
}
