// ./src/components/lists/ListCharges/index.tsx
import React from 'react';

import { Paragraph, LoadingList } from '@components/index';
import Payment from '@models/Payment';
import { formatText } from '@utils/formatters';

import Item from './Item';

import { Container, Table, Labels, Items, NothingFound } from './styles';

interface IProps {
  charges: Payment[] | undefined;
  loading: boolean;
  showTotal: boolean;
  totalValue?: number;
}

const ListCharges: React.FC<IProps> = ({
  charges,
  loading,
  showTotal,
  totalValue,
}) => {
  return (
    <Container>
      <Table>
        <Labels>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Gerada em
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Contrato
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Veículo
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Forma de pagamento
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Valor
          </Paragraph>
          {/* <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            CPF/CNPJ
          </Paragraph> */}
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Vencimento
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Status
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Pago em
          </Paragraph>
          <Paragraph
            nameColor="black"
            textAlign="start"
            fontSize={12}
          ></Paragraph>
        </Labels>
        <Items>
          {loading ? (
            <LoadingList loading={loading} />
          ) : (
            <>
              {charges?.length === 0 ? (
                <NothingFound>
                  <Paragraph nameColor="black" opacity={0.6}>
                    Nenhuma cobrança foi encontrado
                  </Paragraph>
                </NothingFound>
              ) : (
                <>
                  {charges?.map(charge => (
                    <Item key={charge.id} charge={charge} />
                  ))}
                </>
              )}
            </>
          )}
        </Items>
        {!loading && showTotal && (
          <Paragraph
            nameColor="black"
            textAlign="end"
            opacity={0.6}
            fontSize={12}
            style={{ margin: '1.5vh 0 0.5vh', fontWeight: 500 }}
          >
            {totalValue === 1
              ? '1 encontrada'
              : `${formatText.numberSeparatedByThousand(
                  totalValue || 0,
                )} encontradas`}
          </Paragraph>
        )}
      </Table>
    </Container>
  );
};

export default ListCharges;
