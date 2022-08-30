// ./src/components/lists/ListVehicles/index.tsx
import React from 'react';

import { Paragraph, LoadingList } from '@components/index';
import Vehicle from '@models/Vehicle';
import { formatText } from '@utils/formatters';

import Item from './Item';

import { Container, Table, Labels, Items, NothingFound } from './styles';

interface IProps {
  vehicles?: Vehicle[];
  loading: boolean;
  showTotal: boolean;
  totalValue?: number;
}

const ListVehicles: React.FC<IProps> = ({
  vehicles,
  loading,
  showTotal,
  totalValue,
}) => {
  return (
    <Container>
      <Table>
        <Labels>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Classificação
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Marca
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Modelo
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Placa
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Ano
          </Paragraph>
          <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Cor
          </Paragraph>
          {/* <Paragraph nameColor="black" textAlign="start" fontSize={12}>
            Status
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
              {vehicles?.length === 0 ? (
                <NothingFound>
                  <Paragraph nameColor="black" opacity={0.6}>
                    Nenhum veículo foi encontrado
                  </Paragraph>
                </NothingFound>
              ) : (
                <>
                  {vehicles?.map(vehicle => (
                    <Item key={vehicle.id} vehicle={vehicle} />
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

export default ListVehicles;
