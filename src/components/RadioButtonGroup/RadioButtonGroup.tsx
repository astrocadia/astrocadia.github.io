import { type FunctionComponent } from 'react';
import cx from 'classnames';
import { RadioButton, type RadioButtonProps } from '../RadioButton/RadioButton';
import './RadioButtonGroup.css';

export interface RadioButtonGroupOption {
  value: string;
  title: RadioButtonProps['title'];
  description: RadioButtonProps['description'];
}

export interface RadioButtonGroupProps {
  options: Array<RadioButtonGroupOption>;
  onChange: (value: RadioButtonGroupOption['value']) => void;
  value?: RadioButtonGroupOption['value'];
  className?: string;
}

export const RadioButtonGroup: FunctionComponent<RadioButtonGroupProps> = ({
  className,
  onChange,
  value,
  options,
}) => {
  return (
    <div className={cx('RadioButtonGroup', className)} role='radiogroup'>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          checked={value === option.value}
          onClick={() => onChange(option.value)}
          title={option.title}
          description={option.description}
        />
      ))}
    </div>
  );
};
