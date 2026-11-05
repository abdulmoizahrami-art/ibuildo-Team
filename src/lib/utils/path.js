/** Read a nested value with a dotted path: getByPath(obj, 'a.b.c'). */
export function getByPath(object, path) {
  if (object == null) return undefined;
  if (!path) return object;

  return String(path)
    .split('.')
    .reduce((node, key) => (node == null ? undefined : node[key]), object);
}
