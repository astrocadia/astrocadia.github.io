import { AdapterOptions } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

// TODO - when @typed/luxon gets updated, remove the ts-ignore comments

export class GumbandDateAdapter extends AdapterLuxon {
  constructor({ locale, formats }: AdapterOptions<string, never> = {}) {
    super({ locale, formats });
    this.startOfWeek = (value: DateTime) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return value.startOf('week', { useLocaleWeeks: true });
    };
    this.endOfWeek = (value: DateTime) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return value.endOf('week', { useLocaleWeeks: true });
    };
    this.getWeekNumber = (value: DateTime) => {
      /* this exists in current luxon, but we do not yet have the updated @types for luxon */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return value.localeWeekNumber ?? value.weekNumber;
    };
  }

  private setLocaleToValueOverload = (value: DateTime) => {
    const expectedLocale = this.getCurrentLocaleCode();
    if (expectedLocale === value.locale) {
      return value;
    }
    return value.setLocale(expectedLocale);
  };

  public getWeekArray = (value: DateTime) => {
    const cleanValue = this.setLocaleToValueOverload(value);
    const firstDay = this.startOfWeek(this.startOfMonth(cleanValue));
    const lastDay = this.endOfWeek(this.endOfMonth(cleanValue));
    const { days } = lastDay.diff(firstDay, 'days').toObject();
    const weeks: DateTime[][] = [];
    new Array<number>(Math.round(days!))
      .fill(0)
      .map((_, i) => i)
      .map((day) => firstDay.plus({ days: day }))
      .forEach((v, i) => {
        if (i % 7 === 0) {
          weeks.push([v]);
          return;
        }
        weeks[weeks.length - 1].push(v);
      });
    return weeks;
  };
}
