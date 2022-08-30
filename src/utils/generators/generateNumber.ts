// ./src/utils/generators/generateNumber.ts

const getPercentageByValue = (total: number, partial: number): number => {
  /*
   * Calcula quantos porcentos o valor (parcial) vale de outro (total)
   *
   * ENTRADAS: 80 e 21
   * SAÍDA: 26.25 (%)
   */
  const porcentagem: string = ((partial / total) * 100).toFixed(2);
  return Number.parseFloat(porcentagem);
};

const getValueByPercentage = (total: number, percentage: number): number => {
  /*
   * Calcula quanto vale a porcentagem de um valor (total)
   *
   * ENTRADAS: 150 e 33.5 (%)
   * SAÍDA: 50.25
   */
  const porcentagem: string = ((total * percentage) / 100).toFixed(2);
  return Number.parseFloat(porcentagem);
};

export default { getPercentageByValue, getValueByPercentage };
