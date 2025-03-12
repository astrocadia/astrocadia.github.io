import { type FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetExhibitHardwareComponentDetailsQuery,
  useGetExhibitHardwareComponentPropertiesQuery,
} from '../../../../../../app/services/exhibitComponents';
import {
  exhaustiveGuard,
  ObjectValues,
} from '../../../../../../utils/usefulTS';
import { generateExhibitPath } from '../../../../../../views/routes/exhibitRoutePaths';
import { MainPanelCoplanarSubpageCard } from '../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageCard';
import { MainPanelCoplanarTitle } from '../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarTitle';
import { ExhibitSettingsIcon } from '../../../../../common/icons/ExhibitSettingIcon';
import { GearIcon } from '../../../../../common/icons/GearIcon';
import { CustomHardwarePropertiesSubpage } from '../CustomHardwarePropertiesSubpage';
import './CustomHardwareComponentCoplanar.css';
import { CustomHardwareComponentStatus } from './CustomHardwareComponentStatus';

const TITLE_TEXT = 'Component Details' as const;
export const COPLANAR_SUBPAGE = {
  APP_PROPERTIES: 'custom-properties',
  SYSTEM_PROPERTIES: 'system-properties',
} as const;
const APP_PROPERTIES_TITLE = 'Custom Properties' as const;
const APP_PROPERTIES_SUBTITLE = 'Manage custom properties' as const;
const SYSTEM_PROPERTIES_TITLE = 'System Properties' as const;
const SYSTEM_PROPERTIES_SUBTITLE = 'Built-in system properties' as const;

export type CoplanarSubpage = ObjectValues<typeof COPLANAR_SUBPAGE>;

export const isCoplanarSubpage = (
  subpage?: string
): subpage is CoplanarSubpage =>
  !!subpage &&
  Object.values(COPLANAR_SUBPAGE).includes(subpage as CoplanarSubpage);

export interface CustomHardwareComponentCoplanarProps {
  exhibitId: number;
  componentId: string;
  onClose: () => void;
  exhibitComponentKey: string;
  coplanarSubpage?: string;
}

export const CustomHardwareComponentCoplanar: FunctionComponent<
  CustomHardwareComponentCoplanarProps
> = ({
  exhibitId,
  onClose,
  componentId,
  exhibitComponentKey,
  coplanarSubpage,
}) => {
  const navigate = useNavigate();

  const onClick = useCallback(
    (subpageId: CoplanarSubpage) => {
      navigate(
        generateExhibitPath({
          exhibitId: exhibitId.toString(),
          tabId: 'components',
          coplanarId: exhibitComponentKey,
          subpageId,
        })
      );
    },
    [navigate, exhibitId, exhibitComponentKey]
  );

  const { data: component } = useGetExhibitHardwareComponentDetailsQuery({
    componentId,
  });

  const { data: appProperties } = useGetExhibitHardwareComponentPropertiesQuery(
    {
      componentId,
      source: 'app',
    }
  );

  const { data: systemProperties } =
    useGetExhibitHardwareComponentPropertiesQuery({
      componentId,
      source: 'system',
    });

  let coplanarContent = (
    <>
      <MainPanelCoplanarTitle titleText={TITLE_TEXT} onClose={onClose} />
      {component && exhibitId === component.exhibitId && (
        <div className='CustomHardwareComponentCoplanar__contentWrapper'>
          <CustomHardwareComponentStatus
            exhibitId={exhibitId}
            component={component}
          />
          <div className='CustomHardwareComponentCoplanar__subpageCardWrapper'>
            <MainPanelCoplanarSubpageCard
              title={SYSTEM_PROPERTIES_TITLE}
              subtitle={SYSTEM_PROPERTIES_SUBTITLE}
              badgeProps={{
                Icon: GearIcon,
              }}
              onClick={() => onClick(COPLANAR_SUBPAGE.SYSTEM_PROPERTIES)}
              variant='block'
            />
            <MainPanelCoplanarSubpageCard
              title={APP_PROPERTIES_TITLE}
              subtitle={APP_PROPERTIES_SUBTITLE}
              badgeProps={{
                Icon: ExhibitSettingsIcon,
              }}
              onClick={() => onClick(COPLANAR_SUBPAGE.APP_PROPERTIES)}
              variant='block'
            />
          </div>
        </div>
      )}
    </>
  );

  if (isCoplanarSubpage(coplanarSubpage) && component) {
    switch (coplanarSubpage) {
      case COPLANAR_SUBPAGE.APP_PROPERTIES: {
        coplanarContent = (
          <CustomHardwarePropertiesSubpage
            component={component}
            onClose={onClose}
            exhibitId={exhibitId}
            exhibitComponentKey={exhibitComponentKey}
            properties={appProperties}
          />
        );

        break;
      }
      case COPLANAR_SUBPAGE.SYSTEM_PROPERTIES: {
        coplanarContent = (
          <CustomHardwarePropertiesSubpage
            title={SYSTEM_PROPERTIES_TITLE}
            subtitle={SYSTEM_PROPERTIES_SUBTITLE}
            component={component}
            onClose={onClose}
            exhibitId={exhibitId}
            exhibitComponentKey={exhibitComponentKey}
            properties={systemProperties}
          />
        );

        break;
      }
      default: {
        exhaustiveGuard(coplanarSubpage);
      }
    }
  }
  return (
    <div className='CustomHardwareComponentCoplanar'>{coplanarContent}</div>
  );
};
