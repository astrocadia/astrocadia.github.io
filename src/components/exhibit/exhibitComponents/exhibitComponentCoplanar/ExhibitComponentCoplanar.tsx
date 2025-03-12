import { useMemo, type FunctionComponent } from 'react';
import { MainPanelCoplanarTitle } from '../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarTitle';
import type { ExhibitComponentKey } from '../../../../app/entities/exhibitComponents';
import { decodeExhibitComponentKey } from '../utils/exhibitComponentIdUtils';
import { CustomApplicationComponentCoplanar } from './CustomApplicationComponentCoplanar';
import { CustomHardwareComponentCoplanar } from './customHardwareComponentCoplanar/CustomHardwareComponentCoplanar';

export interface ExhibitComponentCoplanarProps {
  exhibitId: number;
  exhibitComponentKey: ExhibitComponentKey;
  coplanarSubpage?: string;
  onClose: () => void;
}

export const ExhibitComponentCoplanar: FunctionComponent<
  ExhibitComponentCoplanarProps
> = ({ exhibitId, exhibitComponentKey, coplanarSubpage, onClose }) => {
  const { type, componentId } = useMemo(
    () => decodeExhibitComponentKey(exhibitComponentKey),
    [exhibitComponentKey]
  );

  switch (type) {
    case 'custom-application':
    case 'os-monitor': {
      return (
        <CustomApplicationComponentCoplanar
          exhibitId={exhibitId}
          componentId={componentId}
          onClose={onClose}
        />
      );
    }
    case 'presence-sensor':
    case 'custom-hardware': {
      return (
        <CustomHardwareComponentCoplanar
          exhibitId={exhibitId}
          componentId={componentId}
          onClose={onClose}
          exhibitComponentKey={exhibitComponentKey}
          coplanarSubpage={coplanarSubpage}
        />
      );
    }
    default: {
      return (
        <MainPanelCoplanarTitle
          titleText='Component Details'
          onClose={onClose}
        />
      );
    }
  }
};
