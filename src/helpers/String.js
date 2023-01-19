const FORMAT_REGEX = /{-?[0-9]+}/g;

export const concatStrings = (...args) => {
  return (delimiter = "") => args.join(delimiter);
};

export function Format(str, ...args) {
  return str.replace(FORMAT_REGEX, (item) => {
    const intVal = parseInt(item.substring(1, item.length - 1), 10);
    let replace;
    if (intVal >= 0) {
      replace = args[intVal];
    } else if (intVal === -1) {
      replace = "{";
    } else if (intVal === -2) {
      replace = "}";
    } else {
      replace = "";
    }
    return replace;
  });
}
