// ./src/utils/formatters/formatText.ts
const capitalizedFirstLetter = (text: string): string => {
  /**
   * Entrada: melancia açucarada
   * Saída: Melancia açucarada
   */
  const firstLetter = text.substring(0, 1);
  const rest = text.substring(1);

  const textFormated = `${firstLetter.toUpperCase()}${rest.toLowerCase()}`;

  return textFormated;
};

const fullCapitalized = (text: string): string => {
  /**
   * Entrada: melancia açucarada
   * Saída: Melancia Açucarada
   */
  const textNew = text.toLowerCase();
  const array = textNew.split(' ');
  const textsFormated: string[] = [];
  array.forEach(item => {
    textsFormated.push(capitalizedFirstLetter(item));
  });

  return textsFormated.join(' ');
};

const removeAllNonDigits = (text: string): string => {
  /**
   * Entrada: Alô @ nova 147 da, casa.
   * Saída: 147
   */
  return text.replace(/[^\d]+/g, '');
};

const numberSeparatedByThousand = (text: string | number): string => {
  return `${text}`.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.');
};

export default {
  capitalizedFirstLetter,
  fullCapitalized,
  removeAllNonDigits,
  numberSeparatedByThousand,
};
