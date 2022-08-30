// ./src/utils/validators/validatorEmail.ts
const check = (email: string): boolean => {
  // texto@texto.com === true
  // texto@texto === false
  // texto.com === false
  // texto === false
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export default {
  check,
};
