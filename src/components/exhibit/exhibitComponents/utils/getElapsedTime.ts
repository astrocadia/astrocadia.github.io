import { Duration } from 'luxon';
import { type ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';

export const getElapsedTime = (
  tick: Date,
  connectedChangedAt: ExhibitComponentSummary['connectedChangedAt'],
  locale?: string
) => {
  if (connectedChangedAt) {
    let elapsedDuration = Duration.fromMillis(
      tick.getTime() - new Date(connectedChangedAt).getTime()
    );

    if (elapsedDuration.toMillis() < 0) {
      elapsedDuration = Duration.fromMillis(0);
    }

    const { years, months, days, hours, minutes } = elapsedDuration
      .rescale()
      .shiftTo('years', 'months', 'days', 'hours', 'minutes', 'seconds')
      .normalize()
      .toObject();

    if (years) {
      return Duration.fromObject({ years }, { locale }).toHuman();
    }

    if (months) {
      return Duration.fromObject({ months }, { locale }).toHuman();
    }

    if (days) {
      return Duration.fromObject({ days }, { locale }).toHuman();
    }

    if (hours) {
      return Duration.fromObject({ hours }, { locale }).toHuman();
    }

    return Duration.fromObject({ minutes: minutes || 0 }, { locale }).toHuman();
  }
  return null;
};
