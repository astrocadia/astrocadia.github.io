import cx from 'classnames';
import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import './ActionTriggerCard.css';
import { Button } from '../buttons';
import { CheckIcon, SendIcon } from '../icons';
import { IconButton } from '../buttons/IconButton';
import { useToggle } from '../hooks/useToggle';
import { CircularProgress } from '../CircularProgress';

const SUCCESS_INDICATOR_TIMEOUT_MS = 1000 as const;

export interface ActionTriggerCardProps {
  busy?: boolean;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  success?: boolean;
  label: string;
  onClick: () => void;
}

export const ActionTriggerCard: FunctionComponent<ActionTriggerCardProps> = ({
  busy,
  className,
  disabled,
  fullWidth,
  success,
  onClick,
  label,
}) => {
  const {
    toggled: active,
    setOn: setActive,
    setOff: setInactive,
  } = useToggle(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(!!success);

  // If `success` is set to true, show the success indicator for a short period
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (success) {
      setShowSuccess(true);
      timeout = setTimeout(() => {
        setShowSuccess(false);
      }, SUCCESS_INDICATOR_TIMEOUT_MS);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [success]);

  const icon = useMemo(() => {
    if (busy) {
      return <CircularProgress size='1rem' />;
    }

    return showSuccess ? <CheckIcon /> : <SendIcon />;
  }, [busy, showSuccess]);

  const buttonLabel = useMemo(() => {
    if (showSuccess) {
      return 'Sent';
    }

    if (active || busy) {
      return 'Send';
    }

    return undefined;
  }, [active, busy, showSuccess]);

  return (
    <div
      className={cx(
        'ActionTriggerCard',
        {
          ActionTriggerCard__active: active,
          ActionTriggerCard__busy: busy,
          ActionTriggerCard__disabled: disabled,
          ActionTriggerCard__fullWidth: fullWidth,
          ActionTriggerCard__success: showSuccess,
        },
        className
      )}
      onBlur={setInactive}
      onFocus={setActive}
      onMouseOver={setActive}
      onMouseOut={setInactive}
    >
      <div className='ActionTriggerCard__contentWrapper'>
        <div className='ActionTriggerCard__label'>{label}</div>
        <div>
          {buttonLabel && !disabled ? (
            <Button
              disabled={disabled || busy || showSuccess}
              startIcon={icon}
              onClick={onClick}
            >
              {buttonLabel}
            </Button>
          ) : (
            <IconButton
              disabled={disabled || busy || showSuccess}
              onClick={onClick}
              onTouchStart={setActive}
            >
              {icon}
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};
