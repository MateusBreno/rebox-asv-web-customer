// ./src/utils/generators/generateCode.ts
import crypto from 'crypto';

const TAM_MAX_NUMBER_CODE = 82321199081427;

const numeric = (prefix: string): string => {
  return `${prefix}-${Math.floor(Math.random() * TAM_MAX_NUMBER_CODE)}`;
};

const hexa = (
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  prefix: string = 'rebox',
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  length: number = 10,
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  wishlist: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
): string => {
  const code = Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map(x => wishlist[x % wishlist.length])
    .join('');

  return `${prefix}-${code}`;
};

const createReferralCode = (): string => {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const prefix: string = 'rebox';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const length: number = 3;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const wishlist: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const code = Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map(x => wishlist[x % wishlist.length])
    .join('');

  return `${prefix}-${Math.floor(Math.random() * 9876)}${code}`;
};

export default {
  numeric,
  hexa,
  createReferralCode,
};
