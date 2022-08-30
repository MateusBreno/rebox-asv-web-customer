// ./src/utils/formatters/formatDate.ts
const addMask = (date: string): string => {
  /**
   * Entrada: 1996-03-20 ou 1996-03-20 15:00
   * Saída: 20/03/1996 ou 20/03/1996 15:00
   */
  if (date.length > 10) {
    const [onlyDate, onlyHour] = date.split(' ');
    const [year, month, day] = onlyDate.split('-');
    return `${day}/${month}/${year} ${onlyHour}`;
  }
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const removeMask = (date: string): string => {
  /**
   * Entrada: 20/03/1996 ou 20/03/1996 15:00
   * Saída: 1996-03-20 ou 1996-03-20 15:00
   */
  if (date.length > 10) {
    const [onlyDate, onlyHour] = date.split(' ');
    const [day, month, year] = onlyDate.split('/');
    return `${year}-${month}-${day} ${onlyHour}`;
  }

  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

export default {
  addMask,
  removeMask,
};
