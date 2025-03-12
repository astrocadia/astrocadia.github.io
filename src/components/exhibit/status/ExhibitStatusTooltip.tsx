import { type FunctionComponent, ReactNode } from 'react';
import cx from 'classnames';
import { type Status } from '../../../app/entities/exhibitManifest';
import { RichTooltip } from '../../common/RichTooltip';
import { ExhibitStatusTooltipTitle } from './ExhibitStatusTooltipTitle';
import './ExhibitStatusTooltip.css';

interface ExhibitStatusTooltipProps {
  status: Status;
  children: ReactNode;
  className?: string;
  followCursor?: boolean;
}

export const ExhibitStatusTooltip: FunctionComponent<
  ExhibitStatusTooltipProps
> = ({ status, children, className, followCursor = true }) => {
  const offset = followCursor ? [0, 12] : undefined;

  return (
    <RichTooltip
      className={cx('ExhibitStatusTooltip', className)}
      PopperProps={{
        className: 'ExhibitStatusTooltipPopper',
        popperOptions: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset,
              },
            },
          ],
        },
      }}
      followCursor={followCursor}
      enterTouchDelay={10}
      leaveTouchDelay={10}
      placement='bottom-start'
      title={<ExhibitStatusTooltipTitle status={status} />}
    >
      <span>{children}</span>
    </RichTooltip>
  );
};
