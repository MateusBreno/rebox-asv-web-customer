// ./src/services/storage/contract/newContractStorageService.ts

import { ConfigStorage } from '@config/index';
import DiscountCoupons from '@models/DiscountCoupons';
import Product from '@models/Product';

interface IStepsSale {
  id: string;
  field_type: string;
  query: string;
}

interface IPayment {
  due_date: string;
  form_of_payment: string;
  cycle: string;
  discount_type: string;
  discount_amount_installments: number;
  number_installments_with_discount: number;
  installments: number;
  card?: {
    brand: string;
    type: string;
    printed_name: string;
    number: string;
    validity: string;
    token: string;
  };
}

const updateDiscountCoupons = (data: DiscountCoupons): void => {
  sessionStorage.setItem(
    ConfigStorage.REBOX_SALE_DISCOUNT_COUPON,
    JSON.stringify(data),
  );
};

const getDiscountCoupons = (): DiscountCoupons => {
  const data =
    sessionStorage.getItem(ConfigStorage.REBOX_SALE_DISCOUNT_COUPON) || '';
  if (data) {
    const discountCoupon: DiscountCoupons = JSON.parse(data);
    return discountCoupon;
  }

  return {} as DiscountCoupons;
};

const updateCart = (data: Product): void => {
  sessionStorage.setItem(
    ConfigStorage.REBOX_SALE_NEW_CART,
    JSON.stringify(data),
  );
};

const getCart = (): Product => {
  const data = sessionStorage.getItem(ConfigStorage.REBOX_SALE_NEW_CART) || '';
  if (data) {
    const product: Product = JSON.parse(data);
    return product;
  }

  return {} as Product;
};

const updateProduct = (data: IStepsSale): void => {
  sessionStorage.setItem(
    ConfigStorage.REBOX_SALE_NEW_PRODUCT,
    JSON.stringify(data),
  );
};

const getProduct = (): IStepsSale => {
  const data =
    sessionStorage.getItem(ConfigStorage.REBOX_SALE_NEW_PRODUCT) || '';
  if (data) {
    const product: IStepsSale = JSON.parse(data);
    return product;
  }

  return {} as IStepsSale;
};

const updateCustomer = (data: IStepsSale): void => {
  sessionStorage.setItem(
    ConfigStorage.REBOX_SALE_NEW_CUSTOMER,
    JSON.stringify(data),
  );
};

const getCustomer = (): IStepsSale => {
  const data =
    sessionStorage.getItem(ConfigStorage.REBOX_SALE_NEW_CUSTOMER) || '';
  if (data) {
    const customer: IStepsSale = JSON.parse(data);
    return customer;
  }

  return {} as IStepsSale;
};

const updateVehicle = (data: IStepsSale): void => {
  sessionStorage.setItem(
    ConfigStorage.REBOX_SALE_NEW_VEHICLE,
    JSON.stringify(data),
  );
};

const getVehicle = (): IStepsSale => {
  const data =
    sessionStorage.getItem(ConfigStorage.REBOX_SALE_NEW_VEHICLE) || '';
  if (data) {
    const customer: IStepsSale = JSON.parse(data);
    return customer;
  }

  return {} as IStepsSale;
};

const updatePayment = (data: IPayment): void => {
  sessionStorage.setItem(
    ConfigStorage.REBOX_SALE_NEW_PAYMENT,
    JSON.stringify(data),
  );
};

const getPayment = (): IPayment => {
  const data =
    sessionStorage.getItem(ConfigStorage.REBOX_SALE_NEW_PAYMENT) || '';
  if (data) {
    const customer: IPayment = JSON.parse(data);
    return customer;
  }

  return {} as IPayment;
};

const cleanMany = (
  untilWhatStep: 'all' | 'customer' | 'vehicle' | 'payment',
): void => {
  const cleanOptions = {
    all: () => {
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_DISCOUNT_COUPON);
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_CART);
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_PRODUCT);
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_CUSTOMER);
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_VEHICLE);
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_PAYMENT);
    },
    customer: () => {
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_CUSTOMER);
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_VEHICLE);
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_PAYMENT);
    },
    vehicle: () => {
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_VEHICLE);
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_PAYMENT);
    },
    payment: () => {
      sessionStorage.removeItem(ConfigStorage.REBOX_SALE_NEW_PAYMENT);
    },
  };
  cleanOptions[untilWhatStep]();
};

export default {
  updateCart,
  getCart,
  updateProduct,
  getProduct,
  updateCustomer,
  getCustomer,
  updateVehicle,
  getVehicle,
  updatePayment,
  getPayment,
  updateDiscountCoupons,
  getDiscountCoupons,
  cleanMany,
};
