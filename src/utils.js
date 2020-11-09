/**
 * Возвращает shallow копию объекта без указанных свойств
 * @param {*} from исходный объект
 * @param {string[]} names имена свойств
 * @return {*} shallow копию объекта без указанных свойств
 */
export const omitProperties = (from, names) => {
  if (!Array.isArray(names)) {
    throw new TypeError(`Argument should be an array of key names`);
  }

  const entries = Object.entries(from).filter(([key]) =>
    names.every((name) => key !== name)
  );

  return Object.fromEntries(entries);
};
