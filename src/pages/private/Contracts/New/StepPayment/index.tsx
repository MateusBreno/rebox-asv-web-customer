// ./src/pages/privates/Contract/New/StepPayment/index.tsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FormHandles } from '@unform/core';
import { FaLock } from 'react-icons/fa';
import { FiPercent } from 'react-icons/fi';
import {
  IoBarcodeOutline,
  IoCalendarOutline,
  IoCardOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoLockClosed,
} from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import {
  SubtitleSecondary,
  Paragraph,
  ButtonMain,
  ButtonDefault,
  CardSimpleButtonSelectable,
  InputSelect,
  AlertSimpleCustom,
  InputText,
  InputMask,
} from '@components/index';
import {
  ConfigAuth,
  ConfigLabel,
  ConfigRoutes,
  ConfigRules,
  ConfigStyles,
  ConfigTransition,
  ConfigValues,
} from '@config/index';
import DiscountCoupons from '@models/DiscountCoupons';
import Product from '@models/Product';
import {
  apiRebox,
  newContractStorageService,
  sessionStorageService,
} from '@services/index';
// import '@services/integrations/iugu/iuguCreditCardTokenService';
import { getValidationErrors } from '@utils/errors';
import { formatMoney, formatText } from '@utils/formatters';
import { hotToast, toastify } from '@utils/notifiers';

import { schema } from './schemaValidation';
import { IFormStepPayment, ISelect } from './typing';

import {
  Container,
  DividingLine,
  SectionsPayment,
  FormPayment,
  PersonalInformation,
  PersonalInformationGroup,
  DueDate,
  DueDateGroup,
  PaymentMethod,
  PaymentMethodOptions,
  PaymentMethodGroup,
  PaymentMethodGroupFields,
  SectionsGroup,
  SectionsItem,
  SectionsItemGroup,
  Discount,
  DiscountButton,
  DiscountGroup,
  DiscountFields,
  DiscountItem,
  DiscountItemGroup,
  DiscountInformation,
  Buttons,
} from './styles';

interface IProps {
  myStep: number;
  currentStep: number;
  changeStep(newStep: number, willChangeHistory?: boolean): void;
}

const LIMIT_MAX_INSTALLMENTS = 12;

const StepPayment: React.FC<IProps> = ({ myStep, currentStep, changeStep }) => {
  Iugu.setAccountID(ConfigAuth.iugu.keys.accountId);
  const { push } = useHistory();

  const formRef = useRef<FormHandles>(null);
  const paymentMethodRef = useRef<HTMLDivElement>(null);

  const paymentSaved = useMemo(
    () => newContractStorageService.getPayment(),
    [],
  );

  const [hotToastId, setHotToastId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDueDate, setSelectedDueDate] = useState<string>(
    paymentSaved.due_date || ConfigValues.rebox.contract.due_date.five,
  );
  const [selectedFormOfPayment, setSelectedFormOfPayment] = useState<string>(
    paymentSaved.form_of_payment ||
      ConfigValues.rebox.contract.form_of_payment.boleto,
  );
  const [brandCreditCard, setBrandCreditCard] = useState<string>('');
  const [numberCreditCard, setNumberCreditCard] = useState<string>('');
  const [
    namePrintedOnCreditCard,
    setNamePrintedOnCreditCard,
  ] = useState<string>('');
  const [validityCreditCard, setValidityCreditCard] = useState<string>('');
  const [cvvCreditCard, setCvvCreditCard] = useState<string>('');
  const [alertCreditCard, setAlertCreditCard] = useState<number>(0);
  const [alertValidate, setAlertValidate] = useState<number>(0);
  const [alertCvv, setAlertCvv] = useState<number>(0);
  const [createdCardToken, setCreatedCardToken] = useState<string>('');

  const [personType, setPersonType] = useState<string>(
    ConfigValues.rebox.user.person_type.physical_person,
  );
  const [alertCheckCpfCnpj, setAlertCheckCpfCnpj] = useState<number>(0);
  const [product, setProduct] = useState<Product>({} as Product);
  const [installmentOptions, setInstallmentOptions] = useState<ISelect[]>([]);

  const [discountCoupon, setDiscountCoupon] = useState<DiscountCoupons>(
    newContractStorageService.getDiscountCoupons(),
  );
  const [showDiscount, setShowDiscount] = useState<boolean>(
    !!newContractStorageService.getDiscountCoupons().id,
  );
  const [alertDiscount, setAlertDiscount] = useState<number>(0);

  const [
    enabledFieldsDiscountNumber,
    setEnabledFieldsDiscountNumber,
  ] = useState<boolean>(true);
  const [
    enabledFieldsDiscountAmount,
    setEnabledFieldsDiscountAmount,
  ] = useState<boolean>(true);

  const [lockEndButton, setLockEndButton] = useState<boolean>(true);

  const initialData = useMemo(() => {
    const { code } = newContractStorageService.getDiscountCoupons();
    return {
      discount_coupom_code: code || '',
    };
  }, []);

  const getProduct = useCallback(async () => {
    try {
      const { data: response } = await apiRebox.get(
        `/products/${newContractStorageService.getProduct().id}`,
      );
      setProduct(response.data);
    } catch (error) {
      console.log(
        `Passo "Pagamento": Houve um error ao buscar o produto selecionado.`,
      );
    }
  }, []);

  const getDiscountCoupon = useCallback(
    async (discountCouponCode: string) => {
      try {
        if (hotToastId) hotToast(hotToastId, 'dismiss');
        setHotToastId(hotToast('Aplicando cupom de desconto', 'loading'));
        const { data: responseDiscountCoupon } = await apiRebox.get(
          `/coupons?code=${discountCouponCode}`,
        );
        const [firstCoupon] = responseDiscountCoupon.data || [''];

        if (firstCoupon && firstCoupon.id) {
          newContractStorageService.updateDiscountCoupons(firstCoupon);
          setDiscountCoupon(firstCoupon);
          setAlertDiscount(1);
        } else {
          setAlertDiscount(2);
        }
      } catch (error) {
        setAlertDiscount(2);
      } finally {
        hotToast(hotToastId, 'dismiss');
        setHotToastId(null);
      }
    },
    [hotToastId],
  );

  const changeDiscountType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const { discount_type } = ConfigValues.rebox.contract;

    setEnabledFieldsDiscountNumber(false);
    setEnabledFieldsDiscountAmount(false);
    const discountData = {
      discount_amount_installments: 'R$ 0,00',
      number_installments_with_discount: 0,
    };

    if (value === discount_type.undefined) {
      setEnabledFieldsDiscountNumber(true);
      setEnabledFieldsDiscountAmount(true);
    }

    if (value === discount_type.single) {
      discountData.number_installments_with_discount = 1;
      setEnabledFieldsDiscountNumber(true);
    }

    if (value === discount_type.recurrent) {
      discountData.number_installments_with_discount = LIMIT_MAX_INSTALLMENTS;
    }

    formRef.current?.setData(discountData);
  };

  const changeCreditCardNumber = useCallback((numberCard: string) => {
    const numberCardUpdated = formatText.removeAllNonDigits(numberCard);
    const isNumberCardValid: boolean = Iugu.utils.validityCreditCardNumber(
      numberCardUpdated,
    );
    if (isNumberCardValid) {
      const brandCard: string = Iugu.utils.getBrandByCreditCardNumber(
        numberCardUpdated,
      );
      setNumberCreditCard(numberCardUpdated);
      setBrandCreditCard(brandCard);
      setAlertCreditCard(1);
    } else {
      setBrandCreditCard('');
      setAlertCreditCard(2);
    }
  }, []);

  const changeCreditCardValidate = useCallback((validate: string) => {
    const [month, year] = validate.split('/');
    const isValidateValid: boolean = Iugu.utils.validateExpiration(month, year);
    if (isValidateValid) {
      setAlertValidate(1);
      setValidityCreditCard(validate);
    } else {
      setAlertValidate(2);
      setValidityCreditCard('');
    }
  }, []);

  const changeCreditCardCvv = useCallback(
    (cvv: string) => {
      const isCvvValid: boolean = Iugu.utils.validateCVV(cvv, brandCreditCard);
      if (isCvvValid) {
        setAlertCvv(1);
        setCvvCreditCard(cvv);
      } else {
        setAlertCvv(2);
        setCvvCreditCard('');
      }
    },
    [brandCreditCard],
  );

  const generateInstallmentOptions = useCallback(() => {
    const { promotional_price, current_price, coverage_months_limit } = product;
    const amount = promotional_price || current_price || 0;

    const installments: ISelect[] = [];
    for (let index = 0; index < coverage_months_limit; index++) {
      const installmentCurrent = index + 1;
      let installmentValue = amount * coverage_months_limit;
      installmentValue /= installmentCurrent;
      installments.push({
        label: `${installmentCurrent}x de ${formatMoney.fromNumberToPrice(
          installmentValue,
        )} sem juros`,
        value: `${installmentCurrent}`,
      });
    }
    setInstallmentOptions(installments);
  }, [product]);

  const createTokenIuguCreditCard = useCallback(() => {
    const [month, year] = validityCreditCard.split('/');
    const abbreviatedYear = year.substring(year.length - 2, year.length);
    const arrayName = namePrintedOnCreditCard.split(' ');

    const cc = Iugu.CreditCard(
      numberCreditCard,
      month,
      abbreviatedYear,
      arrayName[0],
      arrayName[arrayName.length - 1],
      cvvCreditCard,
    );

    Iugu.createPaymentToken(cc, async (response: any) => {
      if (response.errors) {
        toastify(
          'Oops! Dados informados do cartão de crédito não estão válidos.',
          'error',
        );
        setLockEndButton(true);
      } else {
        setCreatedCardToken(response.id);
        setLockEndButton(false);
      }
    });
  }, [
    numberCreditCard,
    brandCreditCard,
    namePrintedOnCreditCard,
    validityCreditCard,
    cvvCreditCard,
  ]);

  const handleSavePayment = useCallback(
    async (data: IFormStepPayment) => {
      try {
        setLoading(prevState => !prevState);
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        const dataPayment = {
          cycle: ConfigValues.rebox.contract.cycle.monthly,
          discount_amount_installments: 0,
          discount_type: ConfigValues.rebox.contract.discount_type.undefined,
          due_date: selectedDueDate,
          form_of_payment: selectedFormOfPayment,
          installments: Number.parseInt(data.number_installments || '12', 10),
          number_installments_with_discount: 0,
          card: undefined,
        };

        newContractStorageService.updatePayment(dataPayment);

        if (
          selectedFormOfPayment ===
          ConfigValues.rebox.contract.form_of_payment.credit_card
        ) {
          if (!data.number_card)
            throw new Error(
              'Por favor, informe o número do cartão de crédito.',
            );

          if (!data.name)
            throw new Error(
              'Por favor, informe o nome impresso no cartão de crédito.',
            );

          if (!data.validity)
            throw new Error(
              'Por favor, informe a data de válidade do cartão de crédito.',
            );

          if (!data.cvv)
            throw new Error(
              'Por favor, informe o código de segurança do cartão de crédito.',
            );

          newContractStorageService.updatePayment({
            ...dataPayment,
            card: {
              brand: brandCreditCard,
              type: selectedFormOfPayment,
              printed_name: namePrintedOnCreditCard,
              number: numberCreditCard,
              validity: validityCreditCard,
              token: createdCardToken,
            },
          });
        }

        changeStep(currentStep + 1);
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          const { number_installments } = errors;

          if (number_installments) toastify(number_installments, 'error');
        } else if (error.response) {
          toastify(error.response.data.error, 'error');
        } else
          toastify(
            typeof error === 'string'
              ? error
              : 'Sinto muito, não foi possível avançar para a próxima etapa.',
            'error',
          );
      } finally {
        setLoading(prevState => !prevState);
      }
    },
    [
      selectedFormOfPayment,
      selectedDueDate,
      brandCreditCard,
      createdCardToken,
      numberCreditCard,
      namePrintedOnCreditCard,
      validityCreditCard,
    ],
  );

  useEffect(() => {
    const { credit_card, boleto } = ConfigValues.rebox.contract.form_of_payment;
    if (selectedFormOfPayment === credit_card) {
      // Gerar o token de cartão de crédito na IUGU
      if (
        namePrintedOnCreditCard !== '' &&
        alertCreditCard === 1 &&
        alertValidate === 1 &&
        alertCvv === 1
      ) {
        createTokenIuguCreditCard();
      }

      // Critério de stop no avanço da jornada
      if (
        alertCreditCard === 2 ||
        alertValidate === 2 ||
        alertCvv === 2 ||
        namePrintedOnCreditCard === ''
      ) {
        setLockEndButton(true);
      }
    }

    if (selectedFormOfPayment === boleto) {
      setLockEndButton(false);
    }
  }, [
    alertCreditCard,
    namePrintedOnCreditCard,
    alertValidate,
    alertCvv,
    selectedFormOfPayment,
  ]);

  useEffect(() => {
    generateInstallmentOptions();
  }, [product]);

  // useEffect(() => {
  //   paymentMethodRef.current?.scrollIntoView();
  // }, [selectedDueDate]);

  useEffect(() => {
    getProduct();
    const { code } = newContractStorageService.getDiscountCoupons();
    if (code) getDiscountCoupon(code);
  }, []);

  return (
    <Container>
      <SubtitleSecondary textAlign="start" nameColor="black">
        Pagamento
      </SubtitleSecondary>
      <Paragraph
        textAlign="start"
        nameColor="black"
        opacity={0.8}
        fontWeight={500}
      >
        Escolha uma forma de pagamento
      </Paragraph>
      <SectionsPayment>
        <FormPayment
          ref={formRef}
          onSubmit={handleSavePayment}
          initialData={initialData}
          className="form-123"
        >
          <PaymentMethod ref={paymentMethodRef}>
            <SubtitleSecondary textAlign="start" fontSize={16}>
              Forma de pagamento
            </SubtitleSecondary>
            <PaymentMethodOptions>
              {[
                ConfigValues.rebox.contract.form_of_payment.credit_card,
                ConfigValues.rebox.contract.form_of_payment.boleto,
              ].map(item => (
                <CardSimpleButtonSelectable
                  key={item}
                  icon={{
                    element:
                      ConfigValues.rebox.contract.form_of_payment.boleto ===
                      item
                        ? IoBarcodeOutline
                        : IoCardOutline,
                    colorDefault:
                      ConfigStyles.rebox.colors.black.opacity.average,
                    colorActive: ConfigStyles.rebox.colors.white.main,
                    opacity: 1,
                    size: 22,
                  }}
                  label={{
                    text:
                      ConfigTransition.rebox_contracts_form_of_payment[
                        item.toLowerCase()
                      ],
                    colorDefault:
                      ConfigStyles.rebox.colors.black.opacity.average,
                    colorActive: ConfigStyles.rebox.colors.white.main,
                    size: ConfigStyles.rebox.fonts.size.paragraph.large,
                  }}
                  width={{ size: '240px', maxSize: '100%' }}
                  onClick={() => setSelectedFormOfPayment(item)}
                  isSelected={selectedFormOfPayment === item}
                  positionContent="flex-start"
                  style={{ marginRight: '2vh' }}
                />
              ))}
            </PaymentMethodOptions>

            <PaymentMethodGroup>
              {selectedFormOfPayment ===
                ConfigValues.rebox.contract.form_of_payment.boleto && (
                <>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    fontWeight={600}
                  >
                    Dados do boleto
                  </Paragraph>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.8}
                    style={{ margin: '1.5vh 0 0' }}
                  >
                    {/* Esta compra irá gerar um contrato, que será ativado somente
                    após o pagamento do 1º boleto. A compensação de pagamento
                    ocorre em até{' '}
                    {ConfigRules.rebox.charge.maximumDaysForCompensation} dias
                    úteis. */}
                    Um contrato será gerado, e ativado após pagamento do 1º
                    boleto.
                  </Paragraph>
                  {/* <AlertSimpleCustom
                    text="Nossas cobranças são recorrentes. Iremos enviar o boleto no valor da parcela que escolher abaixo, sempre no dia do vencimento."
                    type="warning"
                  /> */}

                  <DueDate>
                    <Paragraph
                      nameColor="black"
                      textAlign="start"
                      fontWeight={600}
                    >
                      Selecione o vencimento
                    </Paragraph>
                    <DueDateGroup>
                      {ConfigValues.rebox.contract.due_date.array.map(item => (
                        <CardSimpleButtonSelectable
                          style={{ border: '1px solid rgba(0,0,0, .1)' }}
                          key={item}
                          icon={{
                            element: IoCalendarOutline,
                            colorDefault:
                              ConfigStyles.rebox.colors.black.opacity.average,
                            colorActive: ConfigStyles.rebox.colors.white.main,
                            opacity: 1,
                            size: 22,
                          }}
                          label={{
                            text: item,
                            colorDefault:
                              ConfigStyles.rebox.colors.black.opacity.average,
                            colorActive: ConfigStyles.rebox.colors.white.main,
                            size: ConfigStyles.rebox.fonts.size.paragraph.large,
                          }}
                          positionContent="center"
                          isSelected={selectedDueDate === item}
                          onClick={() => setSelectedDueDate(item)}
                        />
                      ))}
                    </DueDateGroup>
                  </DueDate>
                </>
              )}

              {selectedFormOfPayment ===
                ConfigValues.rebox.contract.form_of_payment.credit_card && (
                <>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    fontWeight={600}
                  >
                    Dados do cartão de crédito
                  </Paragraph>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={1}
                    style={{ margin: '1.5vh 0 2vh' }}
                  >
                    Um contrato será gerado, e o 1º pagamento realizado
                    automaticamente.
                  </Paragraph>

                  <Paragraph
                    nameColor="greenEmerald"
                    textAlign="start"
                    fontSize={ConfigStyles.rebox.fonts.size.paragraph.large}
                    fontWeight={600}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor:
                        ConfigStyles.rebox.colors.greenEmerald.opacity.veryLow,
                      padding: '2vh 2vw',
                      marginTop: '1.5vh',
                    }}
                  >
                    <FaLock
                      color={ConfigStyles.rebox.colors.greenEmerald.main}
                      size={16}
                      style={{ marginRight: 8 }}
                    />
                    {/* <IoLockClosed
                      color={ConfigStyles.rebox.colors.greenEmerald.main}
                      size={20}
                      style={{ marginRight: 8 }}
                    /> */}
                    Você está em um ambiente seguro!
                  </Paragraph>

                  <SectionsGroup>
                    <SectionsItem>
                      <SubtitleSecondary
                        textAlign="start"
                        nameColor="black"
                        fontSize={14}
                      >
                        Número do cartão
                      </SubtitleSecondary>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        opacity={0.7}
                        fontSize={13}
                        style={{ marginBottom: '2vh' }}
                      >
                        Informe o número impresso em seu cartão de crédito
                      </Paragraph>

                      <SectionsItemGroup>
                        <InputMask
                          name="number_card"
                          placeholder="XXXX XXXX XXXX XXXX"
                          alertVisible
                          mask="9999 9999 9999 9999"
                          onChange={event => {
                            const cardNumber = formatText.removeAllNonDigits(
                              event.target.value,
                            );
                            if (cardNumber.length === 16) {
                              changeCreditCardNumber(cardNumber);
                            } else {
                              setAlertCreditCard(0);
                            }
                          }}
                        />
                        {/* {alertCreditCard === 1 && (
                          <IoCheckmarkCircle
                            color={ConfigStyles.rebox.colors.greenEmerald.main}
                            size={20}
                          />
                        )} */}
                        {alertCreditCard === 2 && (
                          <IoCloseCircle
                            color={ConfigStyles.rebox.colors.red.main}
                            size={20}
                          />
                        )}
                      </SectionsItemGroup>
                    </SectionsItem>

                    <SectionsItem>
                      <SubtitleSecondary
                        textAlign="start"
                        nameColor="black"
                        fontSize={14}
                      >
                        Nome impresso no cartão
                      </SubtitleSecondary>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        opacity={0.7}
                        fontSize={13}
                        style={{ marginBottom: '2vh' }}
                      >
                        Informe o nome conforme impresso no cartão de crédito
                      </Paragraph>
                      <InputText
                        name="name"
                        placeholder="Nome impresso no cartão"
                        style={{ textTransform: 'uppercase' }}
                        alertVisible
                        onChange={event => {
                          if (event.target.value.length > 4) {
                            setNamePrintedOnCreditCard(event.target.value);
                          } else {
                            setNamePrintedOnCreditCard('');
                          }
                        }}
                      />
                    </SectionsItem>
                  </SectionsGroup>

                  <SectionsGroup>
                    <SectionsItem>
                      <SubtitleSecondary
                        textAlign="start"
                        nameColor="black"
                        fontSize={14}
                      >
                        Data de validade
                      </SubtitleSecondary>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        opacity={0.7}
                        fontSize={13}
                        style={{ marginBottom: '2vh' }}
                      >
                        Informe o mês e o ano de validade
                      </Paragraph>
                      <SectionsItemGroup>
                        <InputMask
                          name="validity"
                          alertVisible
                          placeholder="MM/AAAA"
                          mask="99/9999"
                          onChange={event => {
                            const validity = formatText.removeAllNonDigits(
                              event.target.value,
                            );
                            if (validity.length === 6) {
                              changeCreditCardValidate(event.target.value);
                            } else {
                              setAlertValidate(0);
                            }
                          }}
                        />
                        {/* {alertValidate === 1 && (
                          <IoCheckmarkCircle
                            color={ConfigStyles.rebox.colors.greenEmerald.main}
                            size={20}
                          />
                        )} */}
                        {alertValidate === 2 && (
                          <IoCloseCircle
                            color={ConfigStyles.rebox.colors.red.main}
                            size={20}
                          />
                        )}
                      </SectionsItemGroup>
                    </SectionsItem>

                    <SectionsItem>
                      <SubtitleSecondary
                        textAlign="start"
                        nameColor="black"
                        fontSize={14}
                      >
                        CVV
                      </SubtitleSecondary>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        opacity={0.7}
                        fontSize={13}
                        style={{ marginBottom: '2vh' }}
                      >
                        Informe o código de segurança do seu cartão de crédito
                      </Paragraph>
                      <SectionsItemGroup>
                        <InputText
                          name="cvv"
                          placeholder="CVV"
                          alertVisible
                          maxLength={4}
                          onChange={event => {
                            const creditCardCvv = formatText.removeAllNonDigits(
                              event.target.value,
                            );
                            if (
                              creditCardCvv.length > 2 &&
                              creditCardCvv.length < 5
                            ) {
                              changeCreditCardCvv(creditCardCvv);
                            } else {
                              setAlertCvv(0);
                            }
                          }}
                        />
                        {/* {alertCvv === 1 && (
                          <IoCheckmarkCircle
                            color={ConfigStyles.rebox.colors.greenEmerald.main}
                            size={20}
                          />
                        )} */}
                        {alertCvv === 2 && (
                          <IoCloseCircle
                            color={ConfigStyles.rebox.colors.red.main}
                            size={20}
                          />
                        )}
                      </SectionsItemGroup>
                    </SectionsItem>
                  </SectionsGroup>

                  {/* <AlertSimpleCustom
                    text={`Nossas cobranças são recorrentes. Iremos cobrar apenas o valor da parcela que escolher abaixo, sempre no dia do vencimento, sem comprometer o limite do seu cartão de crédito.`}
                    type="warning"
                  /> */}
                </>
              )}

              <SectionsGroup style={{ display: 'none' }}>
                <SectionsItem>
                  <SubtitleSecondary
                    textAlign="start"
                    nameColor="black"
                    fontSize={14}
                  >
                    {/* Parcelamento */}
                    Mensalidade
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.7}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Se desejar, você pode antecipar as cobranças
                  </Paragraph>
                  <InputSelect
                    name="number_installments"
                    options={installmentOptions}
                    placeholder="Selecione"
                    selectedDefault={`${LIMIT_MAX_INSTALLMENTS}`}
                    tabIndex={1}
                    disabled={true}
                    isDisable={true}
                  />
                </SectionsItem>
              </SectionsGroup>
            </PaymentMethodGroup>
          </PaymentMethod>
          <Discount>
            <DiscountButton tabIndex={2}>
              <FiPercent
                size={20}
                color={ConfigStyles.rebox.colors.blue.main}
              />
              <SubtitleSecondary textAlign="start" fontSize={16}>
                Cupom de desconto
              </SubtitleSecondary>
            </DiscountButton>
            <DiscountGroup>
              {/* <Paragraph nameColor="black" textAlign="start" fontWeight={500}>
                  Dados de desconto
                </Paragraph>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  opacity={0.8}
                  style={{ margin: '1.5vh 0' }}
                >
                  {`Apenas se definir um desconto, que invalida a aplicação automática
                do mesmo segundo critérios pré-definidos.`}
                </Paragraph> */}
              <DiscountFields>
                <DiscountItem>
                  <SubtitleSecondary
                    textAlign="start"
                    nameColor="black"
                    fontSize={14}
                  >
                    Código do cupom
                  </SubtitleSecondary>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    opacity={0.5}
                    fontSize={13}
                    style={{ marginBottom: '2vh' }}
                  >
                    Caso você possua um cupom de desconto
                  </Paragraph>

                  <DiscountItemGroup>
                    <InputText
                      name="discount_coupom_code"
                      placeholder="Digite aqui"
                      onChange={event => {
                        const code = event.target.value;
                        if (code.length > 4) {
                          getDiscountCoupon(code);
                        } else {
                          setAlertDiscount(2);
                        }
                      }}
                    />
                    {alertDiscount === 1 && (
                      <IoCheckmarkCircle
                        color={ConfigStyles.rebox.colors.greenEmerald.main}
                        size={20}
                      />
                    )}
                    {alertDiscount === 2 && (
                      <IoCloseCircle
                        color={ConfigStyles.rebox.colors.red.main}
                        size={20}
                      />
                    )}
                  </DiscountItemGroup>
                </DiscountItem>
              </DiscountFields>

              {discountCoupon.id && alertDiscount === 1 && (
                <DiscountInformation>
                  <SubtitleSecondary textAlign="start" fontSize={16}>
                    Uhuuuuuuuu! Aproveite seu desconto.
                  </SubtitleSecondary>

                  {discountCoupon.type ===
                    ConfigValues.rebox.discount_coupons.type
                      .first_free_tuition && (
                    <>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        fontWeight={600}
                        fontSize={16}
                      >
                        Sua 1ª mensalidade será gratuita!
                      </Paragraph>
                    </>
                  )}
                </DiscountInformation>
              )}
            </DiscountGroup>
          </Discount>
        </FormPayment>
      </SectionsPayment>
      <Buttons>
        <ButtonMain
          loading={loading}
          onClick={() => formRef.current?.submitForm()}
          style={{ maxWidth: 200 }}
          disabled={lockEndButton}
          isDisable={lockEndButton}
        >
          Avançar
        </ButtonMain>
        <ButtonDefault
          onClick={() => changeStep(currentStep - 1)}
          style={{ maxWidth: 200 }}
          disabled={currentStep <= 1}
          isDisable={currentStep <= 1}
        >
          Voltar
        </ButtonDefault>
      </Buttons>
    </Container>
  );
};

export default StepPayment;
