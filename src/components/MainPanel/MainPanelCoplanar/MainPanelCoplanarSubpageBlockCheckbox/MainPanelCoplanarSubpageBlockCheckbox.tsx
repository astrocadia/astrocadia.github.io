import cx from 'classnames';
import { useMemo, type FunctionComponent } from 'react';
import { Card } from '../../../common/Card';
import { Checkbox, type CheckboxProps } from '../../../common/Checkbox';
import { addOnEnterOrSpaceHandler } from '../../../common/utils/eventHelpers';
import {
  MainPanelCoplanarSubpageCardHeader,
  type MainPanelCoplanarSubpageCardHeaderProps,
} from '../common/MainPanelCoplanarSubpageCardHeader';
import './MainPanelCoplanarSubpageBlockCheckbox.css';

export interface MainPanelCoplanarSubpageBlockCheckboxProps
  extends Pick<
    MainPanelCoplanarSubpageCardHeaderProps,
    'badgeProps' | 'title' | 'subtitle'
  > {
  checkboxProps?: Omit<
    CheckboxProps,
    'checked' | 'disabled' | 'onChange' | 'onClick'
  >;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const MainPanelCoplanarSubpageBlockCheckbox: FunctionComponent<
  MainPanelCoplanarSubpageBlockCheckboxProps
> = ({
  className,
  checkboxProps,
  title,
  subtitle,
  badgeProps,
  checked,
  disabled,
  onClick,
  ...rest
}) => {
  const handleOnClick = useMemo(() => {
    if (onClick) {
      return addOnEnterOrSpaceHandler(onClick);
    }
    return undefined;
  }, [onClick]);

  return (
    <Card
      role={handleOnClick ? 'button' : undefined}
      onClick={handleOnClick}
      onKeyUp={handleOnClick}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={handleOnClick ? 0 : undefined}
      className={cx('MainPanelCoplanarSubpageBlockCheckbox', className, {
        MainPanelCoplanarSubpageBlockCheckbox__checked: checked,
        MainPanelCoplanarSubpageBlockCheckbox__disabled: disabled,
      })}
      // By removing the onClick method from the card, we avoid having to override the "clickable" styling on the parent component
      {...rest}
    >
      <MainPanelCoplanarSubpageCardHeader
        className='MainPanelCoplanarSubpageBlockCheckbox__header'
        title={title}
        aria-checked={checked}
        subtitle={subtitle}
        badgeProps={badgeProps}
        headerAction={
          <Checkbox
            className='MainPanelCoplanarSubpageBlockCheckbox__checkbox'
            checked={checked}
            disabled={disabled}
            inputProps={{ 'aria-label': 'controlled' }}
            onClick={() => {}}
            {...checkboxProps}
          />
        }
      />
    </Card>
  );
};
