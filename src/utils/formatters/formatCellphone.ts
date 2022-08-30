// ./src/utils/formatters/formatCellphone.ts
const addMask = (cellphone: string): string => {
  /**
   * Entrada: 5521988998899
   * Saída: +55 (21) 998899-8899
   */
  return cellphone.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/, '$1 ($2) $3-$4');
};

const removeMask = (cellphoneMask: string): string => {
  /**
   * Entrada: +55 (21) 9 98899-8899
   * Saída: 5521988998899
   */
  return cellphoneMask.replace(/[^\d]+/g, '');
};

export default {
  addMask,
  removeMask,
};
