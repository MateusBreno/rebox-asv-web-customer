// ./src/components/lists/ListCalled/index.tsx
import React from 'react';

import { Paragraph, LoadingList } from '@components/index';
import Called from '@models/Called';
import { formatText } from '@utils/formatters';

import Item from './Item';

import { Container, Table, Labels, Items, NothingFound } from './styles';

interface IProps {
  calleds: Called[] | undefined;
  loading: boolean;
  showTotal: boolean;
  totalValue?: number;
}

const ListCalled: React.FC<IProps> = ({
  calleds,
  loading,
  showTotal,
  totalValue,
}) => {
  return (
    <Container>
      <Table>
        <Labels>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Código
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Solicitado em
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Serviço
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Veículo
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Agendado para
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Status
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Situação
          </Paragraph>
          {/* <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Remoção
          </Paragraph> */}
          {/* <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Origem
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Destino
          </Paragraph> */}
          {/* <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Distância KM
          </Paragraph> */}
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
              {calleds?.length === 0 ? (
                <NothingFound>
                  <Paragraph nameColor="black" opacity={0.6}>
                    Nenhum chamado foi encontrado
                  </Paragraph>
                </NothingFound>
              ) : (
                <>
                  {calleds?.map(called => (
                    <Item key={called.id} called={called} />
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
              ? '1 encontrado'
              : `${formatText.numberSeparatedByThousand(
                  totalValue || 0,
                )} encontrados`}
          </Paragraph>
        )}
      </Table>
    </Container>
  );
};

export default ListCalled;
