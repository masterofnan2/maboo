export default function <Value>(
  input: Value[],
  callback: (item: Value) => unknown
): Value[] {
  const output: Value[] = [];

  input.forEach((value) => {
    if (
      output.length === 0 ||
      !output.some(
        (outputElement) => callback(outputElement) === callback(value)
      )
    ) {
      output.push(value);
    }
  });

  return output;
}
