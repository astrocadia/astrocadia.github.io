import { memo, useMemo, type FunctionComponent } from 'react';
import cx from 'classnames';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  type DialogProps,
} from '../../../common/Dialog';
import { Button } from '../../../common/buttons';
import { CopyIconButton } from '../../../CopyIconButton';
import { EntityCardBanner } from '../../../EntityCard';
import {
  EXHIBIT_COMPONENT_TYPE,
  type ExhibitComponentPrimaryKey,
  type ExhibitComponentType,
} from '../../../../app/entities/exhibitComponents';
import { getImageSource } from '../utils';
import './ExhibitComponentAuthInfoDialog.css';

export const CONFIRM_BUTTON_LABEL = 'Done' as const;
export const ID_LABEL = 'ID' as const;
export const TOKEN_LABEL = 'Token' as const;
export const DEFAULT_IMAGE_ALT = '' as const;

interface ConfigItem {
  title: string;
  description: string;
}

const COMPONENT_CONFIG: Record<ExhibitComponentType, ConfigItem> = {
  [EXHIBIT_COMPONENT_TYPE.CUSTOM_HARDWARE]: {
    title: 'Component Created',
    description:
      'Connect your hardware device to Gumband using this ID & auth token. You cannot view this token again, but you may generate a new one in the Component Details view.',
  },
  [EXHIBIT_COMPONENT_TYPE.CUSTOM_APPLICATION]: {
    title: 'Component Created',
    description:
      'Connect your Exhibit software to Gumband using this ID & auth token. You cannot view this token again, but you may generate a new one in the Component Details view.',
  },
  /** Placeholder value  */
  [EXHIBIT_COMPONENT_TYPE.OS_MONITOR]: {
    title: 'OS Monitor Created',
    description:
      'Connect your OS Monitor to Gumband using this ID & auth token. You cannot view this token again, but you may generate a new one in the Component Details view.',
  },
  /** Placeholder value  */
  [EXHIBIT_COMPONENT_TYPE.PRESENCE_SENSOR]: {
    title: 'Presence Sensor Created',
    description:
      'Connect your Presence Sensor to Gumband using this ID & auth token. You cannot view this token again, but you may generate a new one in the Component Details view.',
  },
} as const;

export interface ExhibitComponentAuthInfoDialogProps
  extends Omit<DialogProps, 'children'> {
  componentId: ExhibitComponentPrimaryKey;
  componentType: ExhibitComponentType;
  token: string;
  onClose: () => void;
}

export const ExhibitComponentAuthInfoDialog: FunctionComponent<ExhibitComponentAuthInfoDialogProps> =
  memo(({ open, componentId, componentType, token, className, onClose }) => {
    const authInfo = useMemo(
      () => [
        { label: ID_LABEL, value: componentId },
        { label: TOKEN_LABEL, value: token },
      ],
      [componentId, token]
    );

    const componentConfigItem = useMemo(
      () => COMPONENT_CONFIG[componentType],
      [componentType]
    );

    const bannerImageProps = useMemo(() => {
      if (Object.values(EXHIBIT_COMPONENT_TYPE).includes(componentType)) {
        return {
          src: getImageSource(componentType),
          alt: componentConfigItem?.title || DEFAULT_IMAGE_ALT,
          className: `ExhibitComponentAuthInfoDialog__entityCardBannerImage__${componentType}`,
        };
      }
      return undefined;
    }, [componentType, componentConfigItem?.title]);

    return (
      <Dialog
        open={open}
        className={cx('ExhibitComponentAuthInfoDialog', className)}
      >
        {componentConfigItem?.title && (
          <DialogTitle title={componentConfigItem?.title} />
        )}
        <DialogContent>
          {bannerImageProps && (
            <EntityCardBanner imageProps={bannerImageProps} />
          )}
          {componentConfigItem?.description && (
            <div className='ExhibitComponentAuthInfoDialog__descriptionContainer'>
              {componentConfigItem.description}
            </div>
          )}
          <div className='ExhibitComponentAuthInfoDialog__authInfoContainer'>
            {authInfo.map(({ label, value }) => (
              <div
                className='ExhibitComponentAuthInfoDialog__authInfoContainer__row'
                key={label}
              >
                <div>{label}</div>
                <div className='ExhibitComponentAuthInfoDialog__authInfoContainer__value'>
                  <div>{value}</div>
                  <CopyIconButton
                    value={String(value)}
                    aria-label={`Copy ${label}`}
                    title={`Copy ${label}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            title={CONFIRM_BUTTON_LABEL}
            variant='secondary'
            onClick={onClose}
          >
            {CONFIRM_BUTTON_LABEL}
          </Button>
        </DialogActions>
      </Dialog>
    );
  });

ExhibitComponentAuthInfoDialog.displayName = 'ExhibitComponentAuthInfoDialog';
