// ./src/pages/privates/Called/Show/CalledDetails/index.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  IoAlarm,
  IoBagHandle,
  IoCheckmarkCircle,
  IoConstruct,
  IoFlag,
  IoRemoveCircle,
  IoStopCircle,
  IoTrash,
} from 'react-icons/io5';

import {
  IconBattery,
  IconCrashedCar,
  IconFlatTire,
  IconKey,
  IconFuelBomb,
  IconWinchTruck,
} from '@assets/icons';
import { Paragraph, LinkMain, ButtonCopy } from '@components/index';
import {
  ConfigRoutes,
  ConfigRules,
  ConfigStyles,
  ConfigTransition,
  ConfigValues,
} from '@config/index';
import Called from '@models/Called';
import {
  formatCellphone,
  formatCNPJ,
  formatCPF,
  formatDate,
  formatMoney,
  formatText,
} from '@utils/formatters';
import { generateDate, generateNumber } from '@utils/generators';

import { ICounter } from './typing';

import {
  Container,
  Sections,
  SectionsGroup,
  DividingLine,
  Service,
  ServiceImage,
  Circumstances,
  VehicleSituation,
  LocationType,
  Dates,
  DatesGroup,
  Time,
  Progress,
  ProgressBar,
  Period,
  CallSituation,
  SourceAddress,
  DestinationAddress,
  Distance,
  Budget,
  BudgetGroup,
  BudgetFormOfPayment,
  Customer,
  VehicleInService,
  Description,
  Providers,
  Driver,
} from './styles';

interface IProps {
  called: Called;
}

const CalledDetails: React.FC<IProps> = ({ called: calledData }) => {
  const [called, setCalled] = useState<Called>(calledData);
  const [counterHours, setCounterHours] = useState<number>(0);
  const [counterMinutes, setCounterMinutes] = useState<number>(0);
  const [counterSeconds, setCounterSeconds] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');
  const [previousTime, setPreviousTime] = useState<string>('00:00:00');
  const [timeLimitPeriod, setTimeLimitPeriod] = useState<string>(
    '00:00 / 00:00',
  );
  const [requestDate, setRequestDate] = useState<string>('-');
  const [dateForService, setDateForService] = useState<string>('-');
  const [estimatedInitiation, setEstimatedInitiation] = useState<number>(
    called.estimated_hours_for_initiation
      ? Number.parseInt(called.estimated_hours_for_initiation, 10)
      : ConfigRules.rebox.called.maximumHoursForArrivalAtOrigin,
  );
  const [estimatedServiceStart, setEstimatedServiceStart] = useState<number>(
    called.estimated_hours_for_service_start
      ? Number.parseInt(called.estimated_hours_for_service_start, 10)
      : ConfigRules.rebox.called.maximumHoursToMeetTheDestination,
  );
  const [totalInSeconds, setTotalInSeconds] = useState<number>(() => {
    if (called.service_start_date) return estimatedServiceStart * 60 * 60;
    if (called.call_initiation_date) return estimatedInitiation * 60 * 60;
    return 0;
  });

  const changeProgress = useCallback(() => {
    const percentage = (1 / totalInSeconds) * 100;
    setProgress(prevValue => {
      if (prevValue < 100) {
        return prevValue + percentage;
      }
      return 100;
    });
  }, [totalInSeconds]);

  const formatTime = useCallback(() => {
    let counterInFormat = `${
      counterHours < 10 ? `0${counterHours}` : counterHours
    }`;
    counterInFormat += `:${
      counterMinutes < 10 ? `0${counterMinutes}` : counterMinutes
    }`;
    counterInFormat += `:${
      counterSeconds < 10 ? `0${counterSeconds}` : counterSeconds
    }`;
    setCurrentTime(counterInFormat);
  }, [counterHours, counterMinutes, counterSeconds]);

  const makeTime = useCallback(
    (dateLeft: string, dateRight: string): ICounter => {
      const minutes = generateDate.minuteDifference(dateLeft, dateRight);
      const clock: ICounter = {
        hours: 0,
        minutes: minutes < 0 ? 0 : minutes,
        seconds: new Date().getSeconds(),
      };
      do {
        if (clock.minutes - 60 >= 0) {
          clock.hours += 1;
          clock.minutes -= 60;
        }
      } while (clock.minutes > 59);
      return clock;
    },
    [],
  );

  const resumeCounter = useCallback(() => {
    const { call_initiation_date, service_start_date, closing_date } = called;

    let stopDate = generateDate.now();
    let consideredDate = stopDate;

    if (call_initiation_date) consideredDate = call_initiation_date;
    if (service_start_date) consideredDate = service_start_date;
    if (closing_date) stopDate = closing_date;

    const { hours, minutes, seconds } = makeTime(stopDate, consideredDate);
    setCounterHours(hours);
    setCounterMinutes(minutes);
    setCounterSeconds(seconds);

    const currentTotalSeconds = seconds + minutes * 60 + hours * 60 * 60;
    const currentProgress = generateNumber.getPercentageByValue(
      totalInSeconds,
      currentTotalSeconds,
    );
    setProgress(currentProgress > 100 ? 100 : currentProgress);
  }, [called, totalInSeconds]);

  const startCounter = useCallback(() => {
    const controlCounter = setInterval(() => {
      setCounterSeconds(sec => {
        const nextSec = sec + 1;
        if (nextSec === 60)
          setCounterMinutes(min => {
            const nextMin = min + 1;
            if (nextMin === 60) setCounterHours(hours => hours + 1);
            return min === 59 ? 0 : min + 1;
          });
        return sec === 59 ? 0 : sec + 1;
      });
      changeProgress();
    }, 1000);

    const { in_progress, in_attendance } = ConfigValues.rebox.called.status;

    if (called.status !== in_progress && called.status !== in_attendance) {
      clearInterval(controlCounter);
    }
  }, [called, estimatedInitiation, estimatedServiceStart, totalInSeconds]);

  const makeTimeLimitPeriod = useCallback(
    (estimate: number, date: string): string => {
      const finalDate = generateDate.nextHours(estimate, date);
      const [, initialHour] = date.split(' ');
      const [, finalHour] = finalDate.split(' ');
      return `${initialHour} - ${finalHour}`;
    },
    [],
  );

  const buildTimeLimitPeriod = useCallback(() => {
    const { call_initiation_date, service_start_date } = called;
    let period = '00:00 / 00:00';
    if (service_start_date) {
      period = makeTimeLimitPeriod(estimatedServiceStart, service_start_date);
    } else if (call_initiation_date) {
      period = makeTimeLimitPeriod(estimatedInitiation, call_initiation_date);
    }
    setTimeLimitPeriod(period);
  }, [called, estimatedInitiation, estimatedServiceStart]);

  const buildDates = useCallback(() => {
    const { date_created, appointment_date } = called;
    if (date_created) {
      const [fragmentDateCreated, fragmentHourCreated] = date_created.split(
        ' ',
      );
      const dateCreatedFormated = `${formatDate.addMask(
        fragmentDateCreated,
      )} às ${fragmentHourCreated}`;
      setRequestDate(dateCreatedFormated);

      if (appointment_date) {
        const [
          fragmentDateAppointment,
          fragmentHourAppointment,
        ] = appointment_date.split(' ');
        setDateForService(
          `${formatDate.addMask(
            fragmentDateAppointment,
          )} às ${fragmentHourAppointment}`,
        );
      } else {
        setDateForService(dateCreatedFormated);
      }
    }
  }, [called]);

  const buildPreviousTime = useCallback(() => {
    const { open, in_progress } = ConfigValues.rebox.called.status;
    if (called.status !== open && called.status !== in_progress) {
      const { call_initiation_date, service_start_date } = called;
      if (call_initiation_date && service_start_date) {
        const { hours, minutes, seconds } = makeTime(
          service_start_date,
          call_initiation_date,
        );
        setPreviousTime(
          `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
          }:00`,
        );
      }
    }
  }, [called]);

  useEffect(() => {
    const { status } = called;
    const { canceled, deleted, open } = ConfigValues.rebox.called.status;
    if (status !== canceled && status !== deleted && status !== open) {
      resumeCounter();
      startCounter();
    }
    buildTimeLimitPeriod();
    buildDates();
    buildPreviousTime();
  }, [called]);

  useEffect(() => {
    formatTime();
  }, [counterSeconds]);

  return (
    <Container>
      <ButtonCopy
        textCopy={called?.code || ''}
        labelText={called.code}
        labelColor="black"
        labelAlign="start"
        labelSize={11}
        labelOpacity={0.4}
        iconColor="black"
        iconSize={12}
        iconOpacity={0.8}
      />
      <Sections>
        <SectionsGroup className="row-1">
          <Service>
            {called.service?.code === 'ser-14007219464468' && (
              <ServiceImage>
                <IconCrashedCar />
              </ServiceImage>
            )}
            {called.service?.code === 'ser-22771391723840' && (
              <ServiceImage>
                <IconFlatTire />
              </ServiceImage>
            )}
            {called.service?.code === 'ser-49183601941352' && (
              <ServiceImage>
                <IconBattery />
              </ServiceImage>
            )}
            {called.service?.code === 'ser-58133848228926' && (
              <ServiceImage>
                <IconKey />
              </ServiceImage>
            )}
            {called.service?.code === 'ser-71595200104160' && (
              <ServiceImage>
                <IconFuelBomb />
              </ServiceImage>
            )}
            {called.service?.code === 'ser-77362873760431' && (
              <ServiceImage>
                <IconWinchTruck />
              </ServiceImage>
            )}
            <Paragraph nameColor="black" fontWeight={600} textAlign="start">
              {formatText.capitalizedFirstLetter(called.service?.name || '')}
            </Paragraph>
          </Service>
          <Circumstances>
            <VehicleSituation>
              <Paragraph
                nameColor="black"
                fontWeight={500}
                opacity={0.6}
                textAlign="start"
              >
                Situação do veículo
              </Paragraph>
              <Paragraph nameColor="black" fontWeight={500} textAlign="start">
                {
                  ConfigTransition.rebox_called_vehicle_situation[
                    called.vehicle_situation
                      ? called.vehicle_situation.toLowerCase()
                      : 'undefined'
                  ]
                }
              </Paragraph>
            </VehicleSituation>
            <LocationType>
              <Paragraph
                nameColor="black"
                fontWeight={500}
                opacity={0.6}
                textAlign="start"
              >
                Local da remoção
              </Paragraph>
              <Paragraph nameColor="black" fontWeight={500} textAlign="start">
                {
                  ConfigTransition.rebox_called_location_type[
                    called.location_type
                      ? called.location_type.toLowerCase()
                      : 'undefined'
                  ]
                }
              </Paragraph>
            </LocationType>
          </Circumstances>
          <Dates>
            <DatesGroup>
              <Paragraph
                nameColor="black"
                fontWeight={500}
                opacity={0.6}
                textAlign="start"
              >
                Solicitado em
              </Paragraph>
              <Paragraph nameColor="black" fontWeight={500} textAlign="start">
                {requestDate}
              </Paragraph>
            </DatesGroup>

            <DatesGroup>
              <Paragraph
                nameColor="black"
                fontWeight={500}
                opacity={0.6}
                textAlign="start"
              >
                Atendimento para
              </Paragraph>
              <Paragraph nameColor="black" fontWeight={500} textAlign="start">
                {dateForService}
              </Paragraph>
            </DatesGroup>
          </Dates>
          <Time>
            <Paragraph fontWeight={500}>
              {
                ConfigTransition.rebox_called_counter_by_status[
                  called.status?.toLowerCase() || 'undefined'
                ]
              }
            </Paragraph>
            <Progress percentage={progress}>
              <ProgressBar className="active" />
              <ProgressBar />
            </Progress>

            <Period>
              <Paragraph
                nameColor="black"
                textAlign="start"
                fontSize={ConfigStyles.rebox.fonts.size.paragraph.normal}
                fontWeight={500}
              >
                {timeLimitPeriod}
              </Paragraph>
              <Paragraph
                nameColor={
                  counterHours <
                  (called.status ===
                  ConfigValues.rebox.called.status.in_attendance
                    ? estimatedServiceStart
                    : estimatedInitiation)
                    ? 'greenEmerald'
                    : 'red'
                }
                textAlign="end"
                fontSize={ConfigStyles.rebox.fonts.size.paragraph.normal}
                fontWeight={500}
              >
                {currentTime}
              </Paragraph>
            </Period>

            {called.service_start_date && (
              <Period>
                <Paragraph
                  nameColor="black"
                  textAlign="start"
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.normal}
                  fontWeight={500}
                  opacity={0.5}
                >
                  {called.call_initiation_date
                    ? makeTimeLimitPeriod(
                        estimatedInitiation,
                        called.call_initiation_date,
                      )
                    : '00:00 / 00:00'}
                </Paragraph>
                <Paragraph
                  nameColor="black"
                  textAlign="end"
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.normal}
                  fontWeight={500}
                  opacity={0.5}
                >
                  {previousTime}
                </Paragraph>
              </Period>
            )}
          </Time>
          <CallSituation>
            {called.status === ConfigValues.rebox.called.status.open && (
              <>
                <IoFlag size={20} color={ConfigStyles.rebox.colors.red.main} />
                <Paragraph
                  nameColor="red"
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.large}
                  fontWeight={600}
                >
                  {
                    ConfigTransition.rebox_called_status[
                      called.status?.toLowerCase() || 'undefined'
                    ]
                  }
                </Paragraph>
              </>
            )}
            {called.status === ConfigValues.rebox.called.status.in_progress && (
              <>
                <IoAlarm
                  size={20}
                  color={ConfigStyles.rebox.colors.yellowSunFlower.main}
                />
                <Paragraph
                  nameColor="yellowSunFlower"
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.large}
                  fontWeight={600}
                >
                  {
                    ConfigTransition.rebox_called_status[
                      called.status?.toLowerCase() || 'undefined'
                    ]
                  }
                </Paragraph>
              </>
            )}
            {called.status ===
              ConfigValues.rebox.called.status.in_attendance && (
              <>
                <IoConstruct
                  size={20}
                  color={ConfigStyles.rebox.colors.lightBlue.main}
                />
                <Paragraph
                  nameColor="lightBlue"
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.large}
                  fontWeight={600}
                >
                  {
                    ConfigTransition.rebox_called_status[
                      called.status?.toLowerCase() || 'undefined'
                    ]
                  }
                </Paragraph>
              </>
            )}
            {called.status === ConfigValues.rebox.called.status.done && (
              <>
                <IoCheckmarkCircle
                  size={20}
                  color={ConfigStyles.rebox.colors.greenEmerald.main}
                />
                <Paragraph
                  nameColor="greenEmerald"
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.large}
                  fontWeight={600}
                >
                  {
                    ConfigTransition.rebox_called_status[
                      called.status?.toLowerCase() || 'undefined'
                    ]
                  }
                </Paragraph>
              </>
            )}
            {called.status === ConfigValues.rebox.called.status.canceled && (
              <>
                <IoRemoveCircle
                  size={20}
                  color={ConfigStyles.rebox.colors.gray.main}
                />
                <Paragraph
                  nameColor="gray"
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.large}
                  fontWeight={600}
                >
                  {
                    ConfigTransition.rebox_called_status[
                      called.status?.toLowerCase() || 'undefined'
                    ]
                  }
                </Paragraph>
              </>
            )}
            {called.status === ConfigValues.rebox.called.status.deleted && (
              <>
                <IoTrash
                  size={20}
                  color={ConfigStyles.rebox.colors.gray.opacity.average}
                />
                <Paragraph
                  nameColor="gray"
                  opacity={0.5}
                  fontSize={ConfigStyles.rebox.fonts.size.paragraph.large}
                  fontWeight={600}
                >
                  {
                    ConfigTransition.rebox_called_status[
                      called.status?.toLowerCase() || 'undefined'
                    ]
                  }
                </Paragraph>
              </>
            )}
          </CallSituation>
        </SectionsGroup>

        <SectionsGroup className="row-2">
          <SourceAddress>
            <Paragraph fontWeight={500} textAlign="start">
              Origem
            </Paragraph>
            <Paragraph nameColor="black" fontWeight={500} textAlign="start">
              {called.source_address?.full_address}
            </Paragraph>
          </SourceAddress>
          <DestinationAddress>
            <Paragraph fontWeight={500} textAlign="start">
              Destino
            </Paragraph>
            <Paragraph nameColor="black" fontWeight={500} textAlign="start">
              {called.destination_address?.full_address}
            </Paragraph>
          </DestinationAddress>
          <Distance>
            <Paragraph nameColor="black" fontWeight={500}>
              {called.distance_between_points_in_km} KMs
            </Paragraph>
            <Paragraph nameColor="black" fontWeight={500} opacity={0.6}>
              de distância
            </Paragraph>
          </Distance>
        </SectionsGroup>

        <DividingLine />

        <SectionsGroup className="row-4">
          <VehicleInService>
            <Paragraph fontWeight={500} textAlign="start">
              Veículo em assistência
            </Paragraph>
            <Paragraph
              nameColor="black"
              fontWeight={500}
              textAlign="start"
              style={{ marginTop: '1.5vh' }}
            >
              {called.vehicle?.license_plate
                ? called.vehicle?.license_plate.toUpperCase()
                : '-'}
            </Paragraph>
            <Paragraph
              nameColor="black"
              fontWeight={500}
              opacity={0.6}
              textAlign="start"
            >
              {`${called.vehicle?.brand} ${called.vehicle?.model} ${
                called.vehicle?.year
              } ${
                ConfigTransition.rebox_vehicles_colors[
                  called.vehicle?.color
                    ? called.vehicle?.color.toLowerCase()
                    : 'undefined'
                ]
              }`.toUpperCase()}
            </Paragraph>
          </VehicleInService>
        </SectionsGroup>

        <SectionsGroup className="row-5">
          <Description>
            <Paragraph fontWeight={500} textAlign="start">
              Descrição
            </Paragraph>
            <Paragraph nameColor="black" fontWeight={500} textAlign="start">
              {called.description
                ? formatText.capitalizedFirstLetter(called.description)
                : '-'}
            </Paragraph>
          </Description>
        </SectionsGroup>

        <DividingLine />

        <SectionsGroup className="row-6">
          <Providers>
            <Paragraph fontWeight={500} textAlign="start">
              Prestador
            </Paragraph>
            <Paragraph nameColor="black" fontWeight={500} textAlign="start">
              {called.who_is_answering
                ? called.who_is_answering.name.toUpperCase()
                : '-'}
            </Paragraph>
          </Providers>
          <Driver>
            <Paragraph fontWeight={500} textAlign="start">
              Motorista
            </Paragraph>
            <Paragraph nameColor="black" fontWeight={500} textAlign="start">
              {called.who_is_performing_the_service
                ? called.who_is_performing_the_service.name.toUpperCase()
                : '-'}
            </Paragraph>
          </Driver>
        </SectionsGroup>

        <SectionsGroup className="row-7">
          <Description>
            <Paragraph fontWeight={500} textAlign="start">
              Parecer técnico
            </Paragraph>
            <Paragraph nameColor="black" fontWeight={500} textAlign="start">
              {called.technical_report
                ? formatText.capitalizedFirstLetter(called.technical_report)
                : '-'}
            </Paragraph>
          </Description>
        </SectionsGroup>
      </Sections>
    </Container>
  );
};

export default CalledDetails;
