// ./src/utils/formatters/formatCnpj.ts
const addMask = (cnpj: string): string => {
  /**
   * Entrada: 58045372000114
   * Saída: 58.045.372/0001-14
   */
  return cnpj.replace(
    /(\d{2})?(\d{3})?(\d{3})?(\d{4})?(\d{2})/,
    '$1.$2.$3/$4-$5',
  );
};

const removeMask = (cnpjMask: string): string => {
  /**
   * Entrada: 58.045.372/0001-14
   * Saída: 58045372000114
   */
  return cnpjMask.replace(/[^\d]+/g, '');
};

export default {
  addMask,
  removeMask,
};
