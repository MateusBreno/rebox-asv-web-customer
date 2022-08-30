// ./src/utils/formatters/formatCpf.ts
const addMask = (cpf: string): string => {
  /**
   * Entrada: 38797008001
   * Saída: 387.970.080-01
   */
  return cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4');
};

const removeMask = (cpfMask: string): string => {
  /**
   * Entrada: 387.970.080-01
   * Saída: 38797008001
   */
  return cpfMask.replace(/[^\d]+/g, '');
};

export default {
  addMask,
  removeMask,
};
