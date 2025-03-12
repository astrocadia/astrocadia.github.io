import { useMemo, type FunctionComponent } from 'react';
import cx from 'classnames';
import { Radio, type RadioProps } from '../common/Radio';
import {
  addOnEnterOrSpaceHandler,
  type MouseOrKeyboardEventHandler,
} from '../common/utils/eventHelpers';
import './RadioButton.css';

export type RadioButtonValue = RadioProps['checked'];
export interface RadioButtonProps {
  checked?: boolean;
  onClick?: MouseOrKeyboardEventHandler;
  title: string;
  description?: string;
  className?: string;
}

export const RadioButton: FunctionComponent<RadioButtonProps> = ({
  className,
  onClick,
  title,
  description,
  checked = false,
}) => {
  const handleOnClick = useMemo(() => {
    if (onClick) {
      return addOnEnterOrSpaceHandler(onClick);
    }
    return undefined;
  }, [onClick]);

  return (
    <div
      className={cx('RadioButton', className, {
        RadioButton__checked: checked,
      })}
      onClick={handleOnClick}
      onKeyUp={handleOnClick}
      role='radio'
      aria-checked={checked}
      tabIndex={0}
    >
      <Radio checked={checked} size='small' tabIndex={-1} />
      <div className='RadioButton__content'>
        {title && <div className='RadioButton__title'>{title}</div>}
        {description && (
          <div className='RadioButton__description'>{description}</div>
        )}
      </div>
    </div>
  );
};
