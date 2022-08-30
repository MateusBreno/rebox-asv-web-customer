// ./src/pages/privates/Contract/New/StepPayment/typing.ts
export interface IFormStepPayment {
  number_card: string | null;
  name: string | null;
  validity: string | null;
  cvv: string | null;
  number_installments: string;
  discount_coupom_code: string | null;
  // discount_type: string;
  // discount_amount_installments: string;
  // number_installments_with_discount: number;
}

export interface ISelect {
  label: string;
  value: string;
}
