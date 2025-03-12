import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import { memo, useCallback, type FunctionComponent } from 'react';
import { IconButton, type IconButtonProps } from '../common/buttons/IconButton';
import { ContentCopyIcon } from '../common/icons';

type CopyFunction = typeof copy;

export interface CopyIconButtonProps
  extends Omit<IconButtonProps, 'children' | 'value' | 'onClick'> {
  value: Parameters<CopyFunction>[0];
  copyOptions?: Parameters<CopyFunction>[1];
}

const defaultCopyOptions = { format: 'text/plain' } as const;

export const CopyIconButton: FunctionComponent<CopyIconButtonProps> = memo(
  ({ className, copyOptions = defaultCopyOptions, value, ...rest }) => {
    const handleClick = useCallback(
      () => copy(value, copyOptions),
      [value, copyOptions]
    );

    return (
      <IconButton
        size='small'
        variant='ghost'
        className={classNames('CopyIconButton', className)}
        onClick={handleClick}
        {...rest}
      >
        <ContentCopyIcon />
      </IconButton>
    );
  }
);

CopyIconButton.displayName = 'CopyIconButton';
