// ./src/models/AsaasCharge.ts
export default interface AsaasCharge {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  subscription?: string; // somente quando pertencer a uma assinatura
  installment?: string; // somente quando pertencer a um parcelamento
  paymentLink?: string; // identificador do link de pagamento
  dueDate: string;
  value: number;
  netValue: number;
  billingType: string;
  status: string;
  description: string;
  externalReference: string;
  confirmedDate: string;
  originalValue?: number;
  interestValue?: number;
  originalDueDate: string;
  paymentDate?: string;
  clientPaymentDate?: string;
  invoiceUrl: string;
  bankSlipUrl: string;
  transactionReceiptUrl?: string;
  invoiceNumber: string;
  deleted: boolean;
  creditCard?: {
    creditCardNumber: string;
    creditCardBrand: string;
    creditCardToken: string;
  };
  anticipated: boolean;
  creditDate?: string;
  estimatedCreditDate?: string;
  lastInvoiceViewedDate?: string;
  lastBankSlipViewedDate?: string;
  discount: {
    value: number;
    limitDate: string;
    dueDateLimitDays: number;
    type: string;
  };
  fine: {
    value: number;
    type: string;
  };
  interest: {
    value: number;
    type: string;
  };
  postalService: boolean;
}
