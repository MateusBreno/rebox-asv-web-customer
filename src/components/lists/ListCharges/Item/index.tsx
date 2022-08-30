// ./src/components/lists/ListCharges/Item/index.tsx
import React, { useState, useEffect, useCallback } from 'react';

import { FaMoneyBill } from 'react-icons/fa';
import { FiCornerUpRight, FiRepeat } from 'react-icons/fi';
import {
  IoEllipsisHorizontal,
  IoTrash,
  IoCheckmarkCircle,
  IoFlag,
  IoAlertCircle,
  IoStopCircle,
  IoBarcode,
  IoCard,
  IoLink,
  IoRibbon,
  IoBan,
} from 'react-icons/io5';

import {
  // ModalChargeCancele,
  // ModalChargeRestore,
  Paragraph,
} from '@components/index';
import {
  ConfigRoutes,
  ConfigStyles,
  ConfigTransition,
  ConfigValues,
} from '@config/index';
import AsaasCharge from '@models/AsaasCharge';
import Payment from '@models/Payment';
import { apiRebox } from '@services/index';
import { formatDate, formatMoney } from '@utils/formatters';

import {
  Container,
  CompositeItem,
  CompositeItemText,
  Dropdown,
  DropdownItem,
  DropdownButton,
} from './styles';

interface IProps {
  charge: Payment;
}

const ListChargesItem: React.FC<IProps> = ({ charge }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [asaasCharge, setAsaasCharge] = useState<AsaasCharge>();

  const [
    modalChargeRevertIsOpen,
    setModalChargeRevertIsOpen,
  ] = useState<boolean>(false);

  const changeModalChargeRevertIsOpen = () => {
    setModalChargeRevertIsOpen(prevState => !prevState);
  };

  const getAsaasCharge = useCallback(async () => {
    try {
      const { data: responseChargeAsaas } = await apiRebox.get(
        `/asaas/payment/${charge.gateway_id}`,
      );
      setAsaasCharge(responseChargeAsaas.data);
    } catch (error) {
      console.error(
        `Error ao tentar buscar no asaas a cobrança ${charge.gateway_id}`,
        error,
      );
    }
  }, []);

  const getLicensePlate = (): string => {
    const { contract } = charge;

    if (contract) {
      const { contracts_vehicles } = contract;

      if (contracts_vehicles && contracts_vehicles.length > 0) {
        const [firstItem] = contracts_vehicles;
        return firstItem.vehicle.license_plate.toUpperCase();
      }
    }

    return `-`;
  };

  useEffect(() => {
    getAsaasCharge();
  }, []);

  return (
    <Container onClick={() => setIsExpanded(prevState => !prevState)}>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {formatDate.addMask(charge.date_created)}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {charge.contract ? charge.contract?.code : 'DELETADO'}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {getLicensePlate()}
      </Paragraph>
      <CompositeItem>
        {ConfigValues.rebox.payments.form_of_payment.boleto ===
          charge.form_of_payment && (
          <IoBarcode size={13} color={ConfigStyles.rebox.colors.gray.main} />
        )}

        {(ConfigValues.rebox.payments.form_of_payment.credit_card ===
          charge.form_of_payment ||
          ConfigValues.rebox.payments.form_of_payment.debit_card ===
            charge.form_of_payment) && (
          <IoCard size={13} color={ConfigStyles.rebox.colors.gray.main} />
        )}

        {(ConfigValues.rebox.payments.form_of_payment.cash ===
          charge.form_of_payment ||
          ConfigValues.rebox.payments.form_of_payment.deposit ===
            charge.form_of_payment ||
          ConfigValues.rebox.payments.form_of_payment.transfer ===
            charge.form_of_payment ||
          ConfigValues.rebox.payments.form_of_payment.pix ===
            charge.form_of_payment) && (
          <FaMoneyBill size={13} color={ConfigStyles.rebox.colors.gray.main} />
        )}

        {ConfigValues.rebox.payments.form_of_payment.subscription_plan ===
          charge.form_of_payment && (
          <IoRibbon size={13} color={ConfigStyles.rebox.colors.gray.main} />
        )}

        <CompositeItemText>
          {
            ConfigTransition.rebox_payments_form_of_payment[
              charge.form_of_payment?.toLowerCase() || 'undefined'
            ]
          }
        </CompositeItemText>
      </CompositeItem>
      {/* <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {charge.user?.cpf || charge.user?.cnpj}
      </Paragraph> */}
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {formatMoney.fromNumberToPrice(charge.amount)}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {formatDate.addMask(charge.due_date)}
      </Paragraph>
      <CompositeItem>
        {(ConfigValues.rebox.payments.status.confirmed === charge.status ||
          ConfigValues.rebox.payments.status.received === charge.status) && (
          <IoCheckmarkCircle
            size={12}
            color={ConfigStyles.rebox.colors.greenEmerald.main}
          />
        )}

        {ConfigValues.rebox.payments.status.pending === charge.status && (
          <IoFlag size={12} color={ConfigStyles.rebox.colors.lightBlue.main} />
        )}

        {ConfigValues.rebox.payments.status.overdue === charge.status && (
          <IoAlertCircle size={12} color={ConfigStyles.rebox.colors.red.main} />
        )}

        {ConfigValues.rebox.payments.status.canceled === charge.status && (
          <IoStopCircle size={12} color={ConfigStyles.rebox.colors.gray.main} />
        )}
        {ConfigValues.rebox.payments.status.deleted === charge.status && (
          <IoTrash size={12} color={ConfigStyles.rebox.colors.gray.main} />
        )}

        <CompositeItemText>
          {
            ConfigTransition.rebox_payments_status[
              charge.status?.toLowerCase() || 'undefined'
            ]
          }
        </CompositeItemText>
      </CompositeItem>

      <Paragraph
        nameColor="black"
        textAlign="start"
        fontSize={11}
        style={{
          fontWeight: 600,
          color: charge.pay_day
            ? ConfigStyles.rebox.colors.black.main
            : ConfigStyles.rebox.colors.orangeCarrot.main,
        }}
      >
        {charge.pay_day
          ? formatDate.addMask(charge.pay_day.split(' ')[0])
          : 'Não pago'}
      </Paragraph>

      <Paragraph nameColor="black" className="btn-options">
        <IoEllipsisHorizontal
          size={16}
          color={ConfigStyles.rebox.colors.black.main}
          style={{ cursor: 'pointer' }}
          opacity={
            charge.form_of_payment !==
              ConfigValues.rebox.payments.form_of_payment.boleto ||
            (!asaasCharge?.transactionReceiptUrl && !asaasCharge?.invoiceUrl)
              ? 0.4
              : 1
          }
        />
      </Paragraph>
      {charge.form_of_payment ===
        ConfigValues.rebox.payments.form_of_payment.boleto &&
        (asaasCharge?.transactionReceiptUrl || asaasCharge?.invoiceUrl) && (
          <Dropdown
            expande={isExpanded}
            subPositionTop={
              charge?.status === ConfigValues.rebox.payments.status.deleted
            }
          >
            {charge.status === ConfigValues.rebox.payments.status.received ? (
              <DropdownItem
                to={{ pathname: asaasCharge?.transactionReceiptUrl }}
                target="_blank"
              >
                <IoLink
                  size={16}
                  title="ícone de link"
                  color={ConfigStyles.rebox.colors.black.main}
                />
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontSize={11}
                  style={{
                    marginLeft: '1vw',
                    fontWeight: 500,
                  }}
                >
                  Link
                </Paragraph>
              </DropdownItem>
            ) : (
              <DropdownItem
                to={{ pathname: asaasCharge?.invoiceUrl }}
                target="_blank"
              >
                <IoLink
                  size={16}
                  title="ícone de link"
                  color={ConfigStyles.rebox.colors.black.main}
                />
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontSize={11}
                  style={{
                    marginLeft: '1vw',
                    fontWeight: 500,
                  }}
                >
                  2º via
                </Paragraph>
              </DropdownItem>
            )}

            {/* <DropdownItem
          to={`${ConfigRoutes.rebox.privates.financial.next.charges.path}/${charge.id}`}
        >
          <FiCornerUpRight
            size={16}
            title="ícone de editar"
            color={ConfigStyles.rebox.colors.black.main}
          />
          <Paragraph
            nameColor="black"
            textAlign="start"
            fontSize={11}
            style={{
              marginLeft: '1vw',
              fontWeight: 500,
            }}
          >
            Abrir
          </Paragraph>
        </DropdownItem> */}
          </Dropdown>
        )}
    </Container>
  );
};

export default ListChargesItem;
