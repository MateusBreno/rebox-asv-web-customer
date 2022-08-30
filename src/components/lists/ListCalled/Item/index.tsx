// ./src/components/lists/ListCalled/Item/index.tsx
import React, { useState, useMemo } from 'react';

import { FiCornerUpRight } from 'react-icons/fi';
import {
  IoEllipsisHorizontal,
  IoCheckmarkCircle,
  IoRemoveCircle,
  IoFlag,
  IoAlarm,
  IoConstruct,
  IoTrash,
} from 'react-icons/io5';

import { Paragraph } from '@components/index';
import {
  ConfigRoutes,
  ConfigStyles,
  ConfigTransition,
  ConfigValues,
} from '@config/index';
import Called from '@models/Called';
import { formatDate } from '@utils/formatters';

import {
  Container,
  CompositeItem,
  CompositeItemText,
  Dropdown,
  DropdownItem,
  DropdownButton,
} from './styles';

interface IProps {
  called: Called;
}

const ListCalledItem: React.FC<IProps> = ({ called }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const requestedIn = useMemo(() => {
    const date = called.appointment_date || called.date_created;
    const [onlyDate] = formatDate.addMask(date).split(' ');
    return onlyDate;
  }, []);

  const serviceFor = useMemo(() => {
    const date = called.appointment_date || called.date_created;
    return formatDate.addMask(date);
  }, []);

  return (
    <Container
      className={
        called.status === ConfigValues.rebox.called.status.open ? 'cheerUp' : ''
      }
      onClick={() => setIsExpanded(prevState => !prevState)}
    >
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {called.code}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {requestedIn}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {called.service?.name.toUpperCase()}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {/* {`${called.vehicle?.brand.toUpperCase()} ${called.vehicle?.model.toUpperCase()} ${called.vehicle?.license_plate.toUpperCase()}`} */}
        {called.vehicle?.license_plate.toUpperCase()}
      </Paragraph>
      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {serviceFor}
      </Paragraph>
      <CompositeItem>
        {ConfigValues.rebox.called.status.open === called.status && (
          <>
            <IoFlag size={12} color={ConfigStyles.rebox.colors.red.main} />
            <CompositeItemText
              style={{ color: ConfigStyles.rebox.colors.red.main }}
            >
              {
                ConfigTransition.rebox_called_status[
                  called.status?.toLowerCase() || 'undefined'
                ]
              }
            </CompositeItemText>
          </>
        )}

        {ConfigValues.rebox.called.status.in_progress === called.status && (
          <>
            <IoAlarm
              size={12}
              color={ConfigStyles.rebox.colors.yellowSunFlower.main}
            />
            <CompositeItemText
              style={{ color: ConfigStyles.rebox.colors.yellowSunFlower.main }}
            >
              {
                ConfigTransition.rebox_called_status[
                  called.status?.toLowerCase() || 'undefined'
                ]
              }
            </CompositeItemText>
          </>
        )}

        {ConfigValues.rebox.called.status.in_attendance === called.status && (
          <>
            <IoConstruct
              size={12}
              color={ConfigStyles.rebox.colors.lightBlue.main}
            />
            <CompositeItemText
              style={{ color: ConfigStyles.rebox.colors.lightBlue.main }}
            >
              {
                ConfigTransition.rebox_called_status[
                  called.status?.toLowerCase() || 'undefined'
                ]
              }
            </CompositeItemText>
          </>
        )}
        {ConfigValues.rebox.called.status.done === called.status && (
          <>
            <IoCheckmarkCircle
              size={12}
              color={ConfigStyles.rebox.colors.greenEmerald.main}
            />
            <CompositeItemText
              style={{ color: ConfigStyles.rebox.colors.greenEmerald.main }}
            >
              {
                ConfigTransition.rebox_called_status[
                  called.status?.toLowerCase() || 'undefined'
                ]
              }
            </CompositeItemText>
          </>
        )}

        {ConfigValues.rebox.called.status.canceled === called.status && (
          <>
            <IoRemoveCircle
              size={12}
              color={ConfigStyles.rebox.colors.gray.main}
            />
            <CompositeItemText
              style={{ color: ConfigStyles.rebox.colors.gray.main }}
            >
              {
                ConfigTransition.rebox_called_status[
                  called.status?.toLowerCase() || 'undefined'
                ]
              }
            </CompositeItemText>
          </>
        )}

        {ConfigValues.rebox.called.status.deleted === called.status && (
          <>
            <IoTrash
              size={12}
              color={ConfigStyles.rebox.colors.gray.opacity.average}
            />
            <CompositeItemText
              style={{ color: ConfigStyles.rebox.colors.gray.opacity.average }}
            >
              {
                ConfigTransition.rebox_called_status[
                  called.status?.toLowerCase() || 'undefined'
                ]
              }
            </CompositeItemText>
          </>
        )}
      </CompositeItem>

      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {
          ConfigTransition.rebox_called_vehicle_situation[
            called.vehicle_situation?.toLowerCase() || 'undefined'
          ]
        }
      </Paragraph>

      {/* <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {
          ConfigTransition.rebox_called_location_type[
            called.location_type?.toLowerCase() || 'undefined'
          ]
        }
      </Paragraph> */}

      {/* <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {called.source_address?.full_address}
      </Paragraph>

      <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {called.destination_address?.full_address}
      </Paragraph> */}

      {/* <Paragraph nameColor="black" textAlign="start" fontSize={12}>
        {called.distance_between_points_in_km?.toFixed(1)}
      </Paragraph> */}

      <Paragraph nameColor="black" className="btn-options">
        <IoEllipsisHorizontal
          size={16}
          color={ConfigStyles.rebox.colors.black.main}
          style={{ cursor: 'pointer' }}
        />
      </Paragraph>
      <Dropdown expande={isExpanded}>
        <DropdownItem
          to={`${ConfigRoutes.rebox.privates.called.next.drives.path}/${called.id}`}
        >
          <FiCornerUpRight
            size={16}
            title="ícone de setas"
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

        {/* <DropdownButton>
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
        </DropdownButton> */}
      </Dropdown>
    </Container>
  );
};

export default ListCalledItem;
