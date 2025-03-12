import { isNil } from '../../../utils/lang';
import {
  ActivityGaugeIcon,
  type ActivityGaugeState,
} from '../../icons/ActivityGaugeIcon';
import {
  ListTooltipContent,
  type ListTooltipContentProps,
} from '../ListTooltipContent';
import '../ListTooltipContent/ListTooltipContent.css';
import './PresenceTooltipContent.css';

export interface PresenceTooltipContentProps extends ListTooltipContentProps {
  activityScoreArrays: Array<Array<number>>;
  viewIndex: number;
}

export interface ActivityScoreDisplayContext {
  activityIndexUnit?: string;
  gaugeState?: ActivityGaugeState;
  activityIndexIcon?: JSX.Element;
  textColor: string;
}

export const activityScoreDisplayGenerator = (
  avgActivityScore?: number
): ActivityScoreDisplayContext => {
  if (isNil(avgActivityScore)) {
    return {
      activityIndexUnit: undefined,
      activityIndexIcon: undefined,
      gaugeState: undefined,
      textColor: 'var(--typography-primary-color)',
    };
  }
  if (avgActivityScore < 2) {
    return {
      activityIndexUnit: 'Least active',
      activityIndexIcon: <ActivityGaugeIcon gaugeState='low' />,
      gaugeState: 'low',
      textColor: 'var(--base-color-orange-800)',
    };
  }
  if (avgActivityScore < 4) {
    return {
      activityIndexUnit: 'Not very active',
      activityIndexIcon: <ActivityGaugeIcon gaugeState='low' />,
      gaugeState: 'low',
      textColor: 'var(--base-color-orange-800)',
    };
  }
  if (avgActivityScore < 6) {
    return {
      activityIndexUnit: 'Somewhat active',
      activityIndexIcon: <ActivityGaugeIcon gaugeState='med' />,
      gaugeState: 'med',
      textColor: 'var(--base-color-yellow-800)',
    };
  }
  if (avgActivityScore < 8) {
    return {
      activityIndexUnit: 'Very active',
      activityIndexIcon: <ActivityGaugeIcon gaugeState='high' />,
      gaugeState: 'high',
      textColor: 'var(--base-color-green-800)',
    };
  }
  if (avgActivityScore <= 10) {
    return {
      activityIndexUnit: 'Most active',
      activityIndexIcon: <ActivityGaugeIcon gaugeState='high' />,
      gaugeState: 'high',
      textColor: 'var(--base-color-green-800)',
    };
  }
  return {
    activityIndexUnit: '',
    activityIndexIcon: <ActivityGaugeIcon gaugeState='low' />,
    gaugeState: 'low',
    textColor: 'var(--base-color-orange-800)',
  };
};

export const PresenceTooltipContent: React.FunctionComponent<
  PresenceTooltipContentProps
> = ({ tooltipData, activityScoreArrays, viewIndex }) => {
  const activityData = tooltipData[0] !== undefined ? [tooltipData[0]] : [];
  const allTimeActivityData =
    tooltipData[1] !== undefined ? [tooltipData[1]] : [];

  const activityScoreArray =
    activityScoreArrays[0] !== undefined ? activityScoreArrays[0] : [];
  const allTimeActivityScoreArray =
    activityScoreArrays[1] !== undefined ? activityScoreArrays[1] : [];

  const activityScore =
    activityScoreArray.length >= viewIndex
      ? Math.round(activityScoreArray[viewIndex] * 10) / 10
      : 0;
  const activityDisplay = activityScoreDisplayGenerator(activityScore);
  const activityTextLevel: ActivityGaugeState | undefined =
    activityDisplay.gaugeState;

  const allTimeActivityScore =
    allTimeActivityScoreArray.length >= viewIndex
      ? Math.round(allTimeActivityScoreArray[viewIndex] * 10) / 10
      : 0;
  const allTimeActivityDisplay =
    activityScoreDisplayGenerator(allTimeActivityScore);
  const allTimeActivityTextLevel: ActivityGaugeState | undefined =
    allTimeActivityDisplay.gaugeState;

  return (
    <>
      <ListTooltipContent tooltipData={activityData} showValue={false} />
      <div className='PresenceTooltipContent__displayRow'>
        <div>{activityDisplay.activityIndexIcon}</div>
        {!!activityTextLevel && (
          <>
            <div className={`PresenceTooltipContent__text${activityTextLevel}`}>
              {activityScore.toFixed(1)}
            </div>
            <div className={`PresenceTooltipContent__text${activityTextLevel}`}>
              {activityDisplay.activityIndexUnit}
            </div>
          </>
        )}
      </div>

      <ListTooltipContent tooltipData={allTimeActivityData} showValue={false} />
      <div className='PresenceTooltipContent__displayRow'>
        <div>{allTimeActivityDisplay.activityIndexIcon}</div>
        {!!allTimeActivityTextLevel && (
          <>
            <div
              className={`PresenceTooltipContent__text${allTimeActivityTextLevel}`}
            >
              {allTimeActivityScore.toFixed(1)}
            </div>
            <div
              className={`PresenceTooltipContent__text${allTimeActivityTextLevel}`}
            >
              {allTimeActivityDisplay.activityIndexUnit}
            </div>
          </>
        )}
      </div>
    </>
  );
};
