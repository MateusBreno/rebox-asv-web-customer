// ./src/components/lists/ListSalesVehicles/Item/index.tsx
import React, { useState } from 'react';

import { FiCornerUpRight } from 'react-icons/fi';
import { IoEllipsisHorizontal, IoEllipse, IoTrash } from 'react-icons/io5';

import { Paragraph } from '@components/index';
import {
  ConfigRoutes,
  ConfigStyles,
  ConfigTransition,
  ConfigValues,
} from '@config/index';
import Vehicle from '@models/Vehicle';
import { formatText } from '@utils/formatters';

import {
  Container,
  CompositeItem,
  CompositeItemText,
  Dropdown,
  DropdownItem,
  DropdownButton,
} from './styles';

interface IProps {
  vehicle: Vehicle;
}

const ListVehiclesItem: React.FC<IProps> = ({ vehicle }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Container onClick={() => setIsExpanded(prevState => !prevState)}>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {
          ConfigTransition.rebox_vehicles_classifications[
            vehicle.classification.toLowerCase() || 'undefined'
          ]
        }
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {vehicle.brand.toUpperCase()}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {vehicle.model.toUpperCase()}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {vehicle.license_plate.toUpperCase()}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {vehicle.year}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {ConfigTransition.rebox_vehicles_colors[vehicle.color.toLowerCase()]}
      </Paragraph>
      {/* <CompositeItem>
        <IoEllipse
          size={10}
          color={
            ConfigValues.rebox.vehicle.status.active === vehicle.status
              ? ConfigStyles.rebox.colors.greenEmerald.main
              : ConfigStyles.rebox.colors.black.opacity.average
          }
        />
        <CompositeItemText>
          {
            ConfigTransition.rebox_vehicles_status[
              vehicle.status.toLowerCase() || 'undefined'
            ]
          }
        </CompositeItemText>
      </CompositeItem> */}

      <Paragraph nameColor="black" className="btn-options">
        <IoEllipsisHorizontal
          size={16}
          color={ConfigStyles.rebox.colors.black.main}
          opacity={0.4}
          style={{ cursor: 'pointer' }}
        />
      </Paragraph>
      {/* <Dropdown expande={isExpanded}>
        <DropdownItem
          to={`${ConfigRoutes.rebox.privates.vehicle.path}/${vehicle.id}`}
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
        </DropdownItem>

        {/ * <DropdownButton>
          <IoTrash size={16} title="ícone de lixeira" color={ConfigStyles.rebox.colors.black.main} />
          <Paragraph
            nameColor="black"
            textAlign="start"
            fontSize={11}
            style={{
              marginLeft: '1vw',
              fontWeight: 500,
            }}
          >
            Excluir
          </Paragraph>
        </DropdownButton> * /}
      </Dropdown> */}
    </Container>
  );
};

export default ListVehiclesItem;
