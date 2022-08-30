// ./src/services/storage/address/AddressStorageService.ts
import { ConfigStorage } from '@config/index';
import Address from '@models/Address';

const update = (address: Address): void => {
  sessionStorage.setItem(
    ConfigStorage.REBOX_USER_ADDRESSES,
    JSON.stringify(address),
  );
};

const clean = (): void => {
  sessionStorage.removeItem(ConfigStorage.REBOX_USER_ADDRESSES);
};

const get = (): Address | null => {
  const value = sessionStorage.getItem(ConfigStorage.REBOX_USER_ADDRESSES);
  if (value) {
    const address: Address = JSON.parse(value);
    return address;
  }

  return null;
};

export default {
  update,
  clean,
  get,
};
