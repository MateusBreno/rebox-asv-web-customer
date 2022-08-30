// ./src/utils/generators/generateDate.ts
import {
  parseISO,
  isAfter,
  isBefore,
  addYears,
  addMonths,
  addDays,
  subDays,
  addHours,
  differenceInMinutes,
} from 'date-fns';
import { format, zonedTimeToUtc } from 'date-fns-tz';

const nextDays = (
  how_many_days = 3,
  baseDate: string | Date = new Date(),
): string => {
  /**
   * Entradas: 5 e 2021-10-20
   * Saída: 2021-10-25 00:00
   */
  const zn_date = zonedTimeToUtc(baseDate, 'America/Sao_Paulo');
  const next_days = addDays(zn_date, how_many_days);

  const hour = next_days.getHours();
  const min = next_days.getMinutes();
  const day = next_days.getDate();
  const month = next_days.getMonth() + 1;
  const year = next_days.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  } ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`;
};

const nextMonth = (): string => {
  /**
   * Saída: 2021-04-25 00:14
   */
  const zn_date = zonedTimeToUtc(new Date(), 'America/Sao_Paulo');
  const next_month = addMonths(zn_date, 1);

  const hour = next_month.getHours();
  const min = next_month.getMinutes();
  const day = next_month.getDate();
  const month = next_month.getMonth() + 1;
  const year = next_month.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  } ${hour < 10 ? `0${hour}` : hour}:${min}`;
};

const now = (): string => {
  /**
   * Saída: 2021-03-25 00:14
   */
  const zn_date = zonedTimeToUtc(new Date(), 'America/Sao_Paulo');

  const hour = zn_date.getHours();
  const min = zn_date.getMinutes();
  const day = zn_date.getDate();
  const month = zn_date.getMonth() + 1;
  const year = zn_date.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  } ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`;
};

const beforeDays = (days: number): string => {
  /**
   * Saída: 2021-03-25 00:14
   */
  const zn_date = zonedTimeToUtc(new Date(), 'America/Sao_Paulo');
  const zn_date_updated = subDays(zn_date, days);
  const hour = zn_date_updated.getHours();
  const min = zn_date_updated.getMinutes();
  const day = zn_date_updated.getDate();
  const month = zn_date_updated.getMonth() + 1;
  const year = zn_date_updated.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  } ${hour < 10 ? `0${hour}` : hour}:${min}`;
};

const nextHours = (
  how_many_hours = 3,
  baseDate: string | Date = new Date(),
): string => {
  /**
   * Entradas: 5 e 2021-10-20
   * Saída: 2021-10-25 00:00
   */
  const zn_date = zonedTimeToUtc(baseDate, 'America/Sao_Paulo');
  const next_hour = addHours(zn_date, how_many_hours);

  const hour = next_hour.getHours();
  const min = next_hour.getMinutes();
  const day = next_hour.getDate();
  const month = next_hour.getMonth() + 1;
  const year = next_hour.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  } ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`;
};

const minuteDifference = (baseDate: string, dateCompare: string): number => {
  /**
   * Entradas: 2022-01-31 16:50 e 2022-01-31 15:00
   * Saída: 110 (minutos)
   */
  const zn_base_date = zonedTimeToUtc(baseDate, 'America/Sao_Paulo');
  const zn_date_compare = zonedTimeToUtc(dateCompare, 'America/Sao_Paulo');

  return differenceInMinutes(zn_base_date, zn_date_compare);
};

export default {
  now,
  nextMonth,
  beforeDays,
  nextDays,
  nextHours,
  minuteDifference,
};
