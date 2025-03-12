import cx from 'classnames';
import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import { CheckIcon, SendIcon } from '../icons';
import { IconButton } from '../buttons/IconButton';
import { useToggle } from '../hooks/useToggle';
import { CircularProgress } from '../CircularProgress';
import './ActionTriggerButton.css';

const SUCCESS_INDICATOR_TIMEOUT_MS = 1000 as const;

export interface ActionTriggerButtonProps {
  busy?: boolean;
  className?: string;
  disabled?: boolean;
  success?: boolean;
  onClick: () => void;
}

export const ActionTriggerButton: FunctionComponent<
  ActionTriggerButtonProps
> = ({ busy, className, disabled, success, onClick }) => {
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

  return (
    <div
      className={cx(
        'ActionTriggerButton',
        {
          ActionTriggerButton__active: active,
          ActionTriggerButton__busy: busy,
          ActionTriggerButton__disabled: disabled,
          ActionTriggerButton__success: showSuccess,
        },
        className
      )}
      onBlur={setInactive}
      onFocus={setActive}
      onMouseOver={setActive}
      onMouseOut={setInactive}
    >
      <IconButton
        disabled={disabled || busy || showSuccess}
        onClick={onClick}
        onTouchStart={setActive}
      >
        {icon}
      </IconButton>
    </div>
  );
};
