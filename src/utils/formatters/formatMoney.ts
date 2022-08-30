// ./src/utils/formatters/formatMoney.ts
const fromNumberToPrice = (amount: number): string => {
  /**
   * Entrada: 19.9
   * Saída: R$ 19,90
   */
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

const replaceFloatPatternsForMoney = (text: string | number): string => {
  /**
   * Entrada: 19 ou 56.7 ou  1000.74
   * Saída: 19,00 ou 56,70 ou 1.000,74
   */
  let textFormated: string = `${text}`.replace(/\D/g, '');
  textFormated = textFormated.replace(/(\d)(\d{2})$/, '$1,$2');
  return textFormated.replace(/(?=(\d{3})+(\D))\B/g, '.');
};

const revertToFloat = (text: string | number): number => {
  /**
   * Entrada: 19,00 ou 56,70 ou 1.000,74
   * Saída: 19 ou 56.7 ou  1000.74
   */
  return Number.parseFloat(
    `${text}`.replace(/[^0-9,]*/g, '').replace(',', '.'),
  );
};

export default {
  fromNumberToPrice,
  replaceFloatPatternsForMoney,
  revertToFloat,
};
