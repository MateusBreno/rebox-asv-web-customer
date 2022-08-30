// ./src/utils/formatters/formatArray.ts
interface IPropsLabels {
  label: string;
  value: string;
}

interface IArrayLabels {
  firstArray: IPropsLabels[];
  secondArray: IPropsLabels[];
}

const removeIntersectionBetweenTwoArraysOfLabels = (
  arrays: IArrayLabels,
): IPropsLabels[] => {
  /**
   * Entradas:
   * array1: [
   *  { label: 'Manga', value: 'MANGA' },
   *  { label: 'Uva', value: 'UVA' },
   *  { label: 'Laranja', value: 'LARANJA' }
   * ]
   *
   * array2: [
   *  { label: 'Uva', value: 'UVA' },
   *  { label: 'Morango', value: 'MORANGO' }
   *  { label: 'Manga', value: 'MANGA' },
   * ]
   *
   * Saída: [
   *  { label: 'Laranja', value: 'LARANJA' }
   * ]
   */
  const { firstArray, secondArray } = arrays;

  const interception_excluded = firstArray.filter(
    item => !secondArray.some(elemen => elemen.value === item.value),
  );

  return interception_excluded;
};

const joinTwoArraysLabelsAndSortAlphabetically = (
  arrays: IArrayLabels,
): IPropsLabels[] => {
  /**
   * Entradas:
   * array1: [
   *  { label: 'Morango', value: 'MORANGO' }
   * ]
   *
   * array2: [
   *  { label: 'Laranja', value: 'LARANJA' }
   *  { label: 'Uva', value: 'UVA' },
   *  { label: 'Manga', value: 'MANGA' },
   * ]
   *
   * Saída: [
   *  { label: 'Laranja', value: 'LARANJA' }
   *  { label: 'Manga', value: 'MANGA' },
   *  { label: 'Morango', value: 'MORANGO' }
   *  { label: 'Uva', value: 'UVA' },
   * ]
   */
  const { firstArray, secondArray } = arrays;

  return firstArray.concat(secondArray).sort((item1, item2) => {
    if (item1.label < item2.label) return -1;
    if (item1.label > item2.label) return 1;
    return 0;
  });
};

export default {
  removeIntersectionBetweenTwoArraysOfLabels,
  joinTwoArraysLabelsAndSortAlphabetically,
};
