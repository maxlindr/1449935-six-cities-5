const AVATARS = [
  `img/avatar-angelina.jpg`,
  `img/avatar-max.jpg`
];

const NAMES = [
  `Angelina`,
  `Max`,
  `John`,
  `Alice`
];

export const generateRandomInteger = (lower = 0, upper = 1) => {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
};

const getRandomArrayElementsRecurcive = (arr, number, result = []) => {
  if (arr.length === 0 || !number) {
    return result;
  }

  const index = generateRandomInteger(0, arr.length - 1);
  const newElements = arr.splice(index, 1);

  return getRandomArrayElementsRecurcive(arr, --number, result.concat(newElements));
};

/**
 * Возвращает произвольные элементы массива
 * @param {array} arr исходный массив
 * @param {number} number возвращаемое количество элементов, по-умолчанию 1
 * @return {array} массив произвольных элементов
 */
export const getRandomArrayElements = (arr, number = 1) => getRandomArrayElementsRecurcive(Array.from(arr), number, []);

export const generateAvatar = () => getRandomArrayElements(AVATARS, 1)[0];

export const generateName = () => getRandomArrayElements(NAMES, 1)[0];

export const generateId = () => String(Date.now() + parseInt(Math.random() * 10000, 10));
