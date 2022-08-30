// ./src/services/storage/recoverPassword/recoverPasswordStorageService.ts
import { ConfigStorage } from '@config/index';
import RecoverPassword from '@models/RecoverPassword';

const update = (recoverPassword: RecoverPassword): void => {
  sessionStorage.setItem(
    ConfigStorage.REBOX_RECOVER_PASSWORD,
    JSON.stringify(recoverPassword),
  );
};

const get = (): RecoverPassword | null => {
  const value = sessionStorage.getItem(ConfigStorage.REBOX_RECOVER_PASSWORD);
  if (value) {
    const recoverPassword: RecoverPassword = JSON.parse(value);
    return recoverPassword;
  }
  return null;
};

const clean = (): void => {
  sessionStorage.removeItem(ConfigStorage.REBOX_RECOVER_PASSWORD);
  sessionStorage.removeItem(ConfigStorage.REBOX_RECOVER_PASSWORD_USER_EMAIL);
};

const setFoundUserEmail = (email: string): void => {
  sessionStorage.setItem(
    ConfigStorage.REBOX_RECOVER_PASSWORD_USER_EMAIL,
    email,
  );
};

const getFoundUserEmail = (): string | null => {
  const email = sessionStorage.getItem(
    ConfigStorage.REBOX_RECOVER_PASSWORD_USER_EMAIL,
  );

  if (email) {
    return email;
  }

  return null;
};

export default {
  update,
  get,
  clean,
  setFoundUserEmail,
  getFoundUserEmail,
};
