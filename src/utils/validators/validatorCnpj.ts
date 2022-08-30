// ./src/utils/validators/validatorCnpj.ts
const regex = /[\.\-\/]+/g;
const TAM_MAX_CNPJ = 14;

const BLACKLIST: Array<string> = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
  '',
];

const check = (cnpj: string) => {
  cnpj = cnpj.replace(regex, '');

  if (cnpj === '') return false;

  if (cnpj.length !== TAM_MAX_CNPJ) return false;

  if (BLACKLIST.includes(cnpj)) return false;

  let size = cnpj.length - 2;
  let numbers: any = cnpj.substring(0, size);
  const digits: any = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== digits.charAt(0)) return false;

  size += 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== digits.charAt(1)) return false;

  return true;
};

// const format = (cnpj: string): string => {
//   return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1 $2 $3/$4-$5');
// };

export default {
  check,
};
