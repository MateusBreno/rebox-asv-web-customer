// ./src/pages/privates/Contract/New/StepConclusion/index.tsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  IoBarcodeOutline,
  IoCardOutline,
  IoCubeOutline,
} from 'react-icons/io5';

import {
  SubtitleSecondary,
  Paragraph,
  ButtonMain,
  ButtonDefault,
  AlertSimpleCustom,
  LoadingForm,
} from '@components/index';
import { ConfigStyles, ConfigTransition, ConfigValues } from '@config/index';
import DiscountCoupons from '@models/DiscountCoupons';
import Product from '@models/Product';
import User from '@models/User';
import Vehicle from '@models/Vehicle';
import {
  apiRebox,
  newContractStorageService,
  sessionStorageService,
} from '@services/index';
import {
  formatCellphone,
  formatCNPJ,
  formatCPF,
  formatDate,
  formatMoney,
  formatText,
} from '@utils/formatters';
import { hotToast, toastify } from '@utils/notifiers';

import {
  Container,
  DividingLine,
  Resume,
  ResumeProduct,
  ResumeProductGroup,
  ResumeProductItem,
  ResumeProductIcon,
  ResumeProductDescription,
  ResumeCustomer,
  ResumeCustomerGroup,
  ResumeCardCustomer,
  ResumeCardVehicle,
  ResumePayment,
  ResumePaymentGroup,
  ResumePaymentInfo,
  ResumePaymentBox,
  ResumePaymentMethod,
  ResumePaymentDescription,
  ResumePaymentDetails,
  ResumePaymentValues,
  ResumePaymentValuesInfo,
  ResumeDiscountCoupons,
  ResumeDiscountCouponsGroup,
  Buttons,
} from './styles';

interface IProps {
  myStep: number;
  currentStep: number;
  changeStep(newStep: number, willChangeHistory?: boolean): void;
}

const StepConclusion: React.FC<IProps> = ({
  myStep,
  currentStep,
  changeStep,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);

  const [product, setProduct] = useState<Product>();
  const [customer, setCustomer] = useState<User | null>(
    sessionStorageService.getUser(),
  );
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [discountCoupon, setDiscountCoupon] = useState<DiscountCoupons>(
    newContractStorageService.getDiscountCoupons(),
  );

  const [chargeAmount, setChargeAmount] = useState<number>(0);

  const paymentSaved = useMemo(
    () => newContractStorageService.getPayment(),
    [],
  );

  const getProduct = useCallback(async () => {
    try {
      setLoading(prevState => !prevState);
      const { data: response } = await apiRebox.get(
        `/products/${newContractStorageService.getProduct().id}`,
      );
      setProduct(response.data);
    } catch (error) {
      toastify('Oops! Não conseguimos consultar o produto escolhido.', 'error');
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  const getVehicle = useCallback(async () => {
    try {
      const { data: responseVehicle } = await apiRebox.get(
        `/users/vehicles/${newContractStorageService.getVehicle().id}`,
      );
      setVehicle(responseVehicle.data);
    } catch (error) {
      toastify(
        'Oops! Não conseguimos consultar os dados do veículo desta venda.',
        'error',
      );
    }
  }, []);

  const handleRegisterSale = useCallback(async () => {
    const idHotToast = hotToast('Finalizando a compra', 'loading');
    try {
      setLoadingRegister(prevState => !prevState);

      await apiRebox.post(`/contracts`, {
        users_id: customer?.id,
        users_person_type: customer?.person_type,
        users_cpf_cnpj: customer?.cpf || customer?.cnpj,
        products_id: newContractStorageService.getProduct().id || product?.id,
        available_uses: null,
        covered_up: null,
        status: ConfigValues.rebox.contract.status.pending,
        renew_in_days: null,
        form_of_payment: paymentSaved.form_of_payment,
        due_date: paymentSaved.due_date,
        cycle: ConfigValues.rebox.contract.cycle.monthly,
        amount: null,
        installments: paymentSaved.installments,
        discount_type: ConfigValues.rebox.contract.discount_type.undefined,
        discount_amount_installments: null,
        number_installments_with_discount: 0,
        who_gave_discount_type:
          ConfigValues.rebox.contract.who_gave_discount_type.undefined,
        who_gave_discount_id: null,
        who_made_the_sale_id: null,
        insured_vehicles: [
          {
            id: newContractStorageService.getVehicle().id || vehicle?.id,
          },
        ],
        discount_coupons_id: discountCoupon.id || null,
        card:
          paymentSaved.form_of_payment ===
          ConfigValues.rebox.contract.form_of_payment.credit_card
            ? paymentSaved.card
            : null,
      });

      toastify('Uhuuu! Sua compra foi efetuada.', 'success');
      newContractStorageService.cleanMany('all');

      hotToast(idHotToast, 'dismiss');
      changeStep(currentStep + 1);
    } catch (error: any) {
      const message =
        'Não foi possível finalizar sua compra, por favor tente novamente.';
      if (error.response)
        toastify(error.response.data.error || message, 'error');
      else toastify(message, 'error');
    } finally {
      hotToast(idHotToast, 'dismiss');
      setLoadingRegister(prevState => !prevState);
    }
  }, [product, customer, vehicle, paymentSaved]);

  useEffect(() => {
    containerRef.current?.scrollIntoView();
    getVehicle();
    getProduct();
  }, []);

  useEffect(() => {
    containerRef.current?.scrollIntoView();
    const value = product?.promotional_price || product?.current_price || 0;
    setChargeAmount(value);
  }, [product]);

  return (
    <Container ref={containerRef}>
      <SubtitleSecondary textAlign="start" nameColor="black">
        Conclusão
      </SubtitleSecondary>
      <Paragraph
        textAlign="start"
        nameColor="black"
        opacity={0.8}
        fontWeight={500}
      >
        Confirme se todos os dados estão corretos
      </Paragraph>
      {/* <AlertSimpleCustom
        text={`Ao finalizar, será disparado uma notificação para o cliente confirmando a realização desta venda.`}
        type="info"
      /> */}

      {loading ? (
        <LoadingForm />
      ) : (
        <Resume>
          <ResumeProduct>
            <SubtitleSecondary textAlign="start" fontSize={16}>
              Produto
            </SubtitleSecondary>
            <ResumeProductGroup>
              <ResumeProductItem className="resume-product-item-description">
                <ResumeProductIcon>
                  <IoCubeOutline
                    color={ConfigStyles.rebox.colors.black.opacity.high}
                    size={20}
                    opacity={0.7}
                  />
                </ResumeProductIcon>
                <ResumeProductDescription>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    fontWeight={600}
                    fontSize={15}
                  >
                    {product?.name ? product?.name.toUpperCase() : ''}
                  </Paragraph>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    fontWeight={400}
                    fontSize={13}
                  >
                    Cobertura de até {product?.coverage_months_limit} meses.
                  </Paragraph>
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    fontWeight={400}
                    fontSize={13}
                  >
                    {formatText.capitalizedFirstLetter(
                      product?.description || '',
                    )}
                  </Paragraph>
                </ResumeProductDescription>
              </ResumeProductItem>
              <ResumeProductItem>
                <Paragraph nameColor="black" textAlign="start" fontWeight={500}>
                  {formatMoney.fromNumberToPrice(chargeAmount)}
                </Paragraph>
              </ResumeProductItem>
            </ResumeProductGroup>
          </ResumeProduct>

          <DividingLine />

          <ResumeCustomer>
            <SubtitleSecondary textAlign="start" fontSize={16}>
              Seus dados
            </SubtitleSecondary>
            <ResumeCustomerGroup>
              <ResumeCardCustomer>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontSize={15}
                  fontWeight={600}
                >
                  {customer?.name ? customer?.name.toUpperCase() : ''}
                </Paragraph>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={400}
                  fontSize={13}
                >
                  Inscrito no{' '}
                  {customer?.cpf
                    ? `CPF sob nº ${formatCPF.addMask(
                        customer.cpf,
                      )} nascido(a) em ${
                        customer?.date_of_birth
                          ? `${formatDate.addMask(customer?.date_of_birth)}`
                          : ''
                      }`
                    : customer?.cnpj
                    ? `CNPJ  sob nº ${formatCNPJ.addMask(customer?.cnpj)}`
                    : ''}
                  .
                </Paragraph>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={400}
                  fontSize={13}
                >
                  Com e-mail {customer?.email} e celular{' '}
                  {customer?.cellphone
                    ? formatCellphone.addMask(customer?.cellphone)
                    : ''}{' '}
                  para contato.
                </Paragraph>
              </ResumeCardCustomer>

              <ResumeCardVehicle>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontSize={15}
                  fontWeight={600}
                >
                  {`${vehicle?.brand.toUpperCase()} ${vehicle?.model.toUpperCase()} ${vehicle?.license_plate.toUpperCase()}`}
                </Paragraph>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={400}
                  fontSize={13}
                >
                  Classificado no porte de{' '}
                  {`${
                    ConfigTransition.rebox_vehicles_classifications[
                      vehicle?.classification.toLowerCase() || ''
                    ]
                  }`.toLowerCase()}
                  .
                </Paragraph>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontWeight={400}
                  fontSize={13}
                >
                  Modelo de {vehicle?.year} na cor{' '}
                  {`${
                    ConfigTransition.rebox_vehicles_colors[
                      vehicle?.color.toLowerCase() || ''
                    ]
                  }`.toLowerCase()}
                  .
                </Paragraph>
              </ResumeCardVehicle>
            </ResumeCustomerGroup>
          </ResumeCustomer>

          <ResumePayment>
            <SubtitleSecondary textAlign="start" fontSize={16}>
              Pagamento
            </SubtitleSecondary>
            <ResumePaymentGroup>
              <ResumePaymentInfo>
                <Paragraph nameColor="black" textAlign="start" fontWeight={500}>
                  Ciclo de cobrança{' '}
                  {
                    ConfigTransition.rebox_contracts_cycle[
                      paymentSaved.cycle.toLowerCase()
                    ]
                  }
                </Paragraph>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontSize={12}
                  fontWeight={500}
                  opacity={0.5}
                >
                  Vencimento todo dia {paymentSaved.due_date}
                </Paragraph>
              </ResumePaymentInfo>

              <ResumePaymentBox>
                <ResumePaymentMethod>
                  {paymentSaved.form_of_payment ===
                    ConfigValues.rebox.contract.form_of_payment.boleto && (
                    <IoBarcodeOutline
                      color={ConfigStyles.rebox.colors.black.main}
                      size={20}
                      opacity={0.7}
                    />
                  )}
                  {paymentSaved.form_of_payment ===
                    ConfigValues.rebox.contract.form_of_payment.credit_card && (
                    <IoCardOutline
                      color={ConfigStyles.rebox.colors.black.main}
                      size={20}
                      opacity={0.7}
                    />
                  )}
                  <Paragraph
                    nameColor="black"
                    textAlign="start"
                    fontWeight={500}
                    style={{ marginLeft: '8px' }}
                  >
                    {
                      ConfigTransition.rebox_contracts_form_of_payment[
                        newContractStorageService
                          .getPayment()
                          .form_of_payment.toLowerCase()
                      ]
                    }
                  </Paragraph>
                </ResumePaymentMethod>

                <ResumePaymentDescription>
                  <ResumePaymentDetails>
                    <Paragraph
                      nameColor="black"
                      textAlign="start"
                      fontWeight={500}
                    >
                      {`Ciclo ativo por ${paymentSaved.installments} meses `}
                      {/* {`em 12x sem juros de
                ${formatMoney.fromNumberToPrice(chargeAmount)}
                `} */}
                    </Paragraph>
                    {paymentSaved.discount_type !==
                      ConfigValues.rebox.contract.discount_type.undefined && (
                      <Paragraph
                        nameColor="greenEmerald"
                        textAlign="start"
                        fontWeight={600}
                      >{`Ganhou desconto de ${formatMoney.fromNumberToPrice(
                        paymentSaved.discount_amount_installments || 0,
                      )}`}</Paragraph>
                    )}
                    {discountCoupon.id && (
                      <Paragraph
                        nameColor="greenEmerald"
                        textAlign="start"
                        fontWeight={600}
                      >{`Cupom ${discountCoupon.code} aplicado: ${discountCoupon.description}`}</Paragraph>
                    )}
                  </ResumePaymentDetails>
                  <DividingLine />
                  <ResumePaymentValues>
                    {paymentSaved.discount_type !==
                      ConfigValues.rebox.contract.discount_type.undefined && (
                      <ResumePaymentValuesInfo>
                        <Paragraph
                          nameColor="black"
                          textAlign="start"
                          fontWeight={400}
                          opacity={0.5}
                        >
                          Cobranças com desconto
                        </Paragraph>
                        <Paragraph
                          nameColor="black"
                          textAlign="end"
                          fontWeight={500}
                          opacity={0.5}
                        >
                          {`${
                            paymentSaved.number_installments_with_discount
                          }x de ${formatMoney.fromNumberToPrice(
                            chargeAmount -
                              (paymentSaved.discount_amount_installments || 0),
                          )}`}
                        </Paragraph>
                      </ResumePaymentValuesInfo>
                    )}

                    <ResumePaymentValuesInfo>
                      <Paragraph
                        nameColor="black"
                        textAlign="start"
                        fontWeight={500}
                      >
                        Valor de cobrança
                      </Paragraph>
                      <Paragraph
                        nameColor="black"
                        textAlign="end"
                        fontWeight={600}
                      >
                        {paymentSaved.discount_type !==
                        ConfigValues.rebox.contract.discount_type.undefined
                          ? formatMoney.fromNumberToPrice(
                              chargeAmount -
                                (paymentSaved.discount_amount_installments ||
                                  0),
                            )
                          : formatMoney.fromNumberToPrice(chargeAmount)}
                      </Paragraph>
                    </ResumePaymentValuesInfo>
                  </ResumePaymentValues>
                </ResumePaymentDescription>
              </ResumePaymentBox>
            </ResumePaymentGroup>
          </ResumePayment>

          {/* {discountCoupon.id && (
            <ResumeDiscountCoupons>
              <SubtitleSecondary textAlign="start" fontSize={16}>
                Cupom de desconto
              </SubtitleSecondary>
              <ResumeDiscountCouponsGroup>
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
              </ResumeDiscountCouponsGroup>
            </ResumeDiscountCoupons>
          )} */}
        </Resume>
      )}
      <Buttons>
        <ButtonMain
          loading={loading || loadingRegister}
          onClick={handleRegisterSale}
          style={{ marginRight: '10px', maxWidth: 200 }}
          disabled={
            loading || !product || !customer || !vehicle || !paymentSaved
          }
          isDisable={
            loading || !product || !customer || !vehicle || !paymentSaved
          }
        >
          Finalizar
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

export default StepConclusion;
