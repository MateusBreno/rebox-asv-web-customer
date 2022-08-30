// ./src/utils/validators/validatorDate.ts
import { parseISO, isAfter, isBefore, addYears, subDays } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const LIMIT_YEARS = 18;

const isOfAge = (date: string): boolean => {
  const parsed_date = parseISO(date);
  const zn_date = zonedTimeToUtc(parsed_date, 'America/Sao_Paulo');
  const eighteen_years_later = addYears(zn_date, LIMIT_YEARS);
  // const eighteen_years_later2 = format(
  //   eighteen_years_later,
  //   'dd/MM/YYYY HH:mm',
  //   {
  //     timeZone: 'America/Sao_Paulo',
  //   },
  // );
  return isBefore(eighteen_years_later, new Date());
};

const hasPassed = (baseDate: string, dateToBeCompared: string): boolean => {
  /**
   * Entrada:
   * - 2021-05-01 e 2021-05-20
   * ou
   * - 2021-05-01 15:00 e 2021-05-20 10:00
   * Saídas: true (Data já passou) ou false (Ainda vai chegar a data vigente)
   */

  if (baseDate === dateToBeCompared) {
    return false;
  }

  const parsedBaseDate = parseISO(baseDate);
  const parsedDateToBeCompared = parseISO(dateToBeCompared);
  return isAfter(parsedBaseDate, parsedDateToBeCompared);
};

const isDaysBefore = (date: string, days: number): boolean => {
  /**
   * Entrada: 2021-10-15 e 5
   * Saídas:
   * - true (Caso ainda faltam os dias para a data atual)
   * - false (Caso não)
   */

  const daysBefore = subDays(new Date(), days);
  const znDate = zonedTimeToUtc(daysBefore, 'America/Sao_Paulo');

  const day = znDate.getDate();
  const month = znDate.getMonth() + 1;
  const year = znDate.getUTCFullYear();
  const dateDaysBefore = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;

  return date === dateDaysBefore;
};

export default {
  isOfAge,
  hasPassed,
  isDaysBefore,
};
