import { type FunctionComponent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainPanelCoplanarTitle } from '../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarTitle';
import { Breadcrumbs } from '../../../../../common/Breadcrumbs';
import { BreadcrumbItem } from '../../../../../common/BreadcrumbItem';
import { generateExhibitPath } from '../../../../../../views/routes/exhibitRoutePaths';
import { FeedbackMessagePanel } from '../../../../../feedback/common/FeedbackMessagePanel';
import {
  CustomHardwareComponentProperty,
  GroupPropertyLinkCard,
} from '../customHardwareComponentProperties';
import {
  type ExhibitHardwareComponentPropertyOrGroup,
  type ExhibitHardwareComponentDetails,
  ExhibitHardwareComponentIndividualProperty,
  isExhibitHardwareComponentProperty,
  isExhibitHardwareComponentPropertyGroup,
  ExhibitHardwareComponentPropertyGroup,
} from '../../../../../../app/entities/exhibitComponents';
import './CustomHardwarePropertiesSubpage.css';

const PROPERTIES_SUBPAGE_TITLE = 'Custom Properties' as const;
const PROPERTIES_SUBPAGE_SUBTITLE =
  'Send updates to the component in real-time' as const;

export const returnLastPathItem = (
  path: ExhibitHardwareComponentIndividualProperty['path']
): string => {
  const lastIndex = path.lastIndexOf('/');
  return lastIndex < 0 ? path : path.slice(lastIndex + 1);
};

const traverseGroupProperties = (
  breadcrumbs: Array<string>,
  properties: Array<ExhibitHardwareComponentPropertyOrGroup>
) => {
  let groupProperties = properties;
  breadcrumbs.forEach((breadcrumb) => {
    if (!groupProperties) {
      return;
    }
    const property = groupProperties.find(
      (groupProperty) =>
        isExhibitHardwareComponentPropertyGroup(groupProperty) &&
        groupProperty.group === breadcrumb
    ) as ExhibitHardwareComponentPropertyGroup;
    if (isExhibitHardwareComponentPropertyGroup(property)) {
      groupProperties = property.properties;
    }
  });
  return groupProperties;
};

const containsNonHiddenProperty = (
  groupProperties: Array<ExhibitHardwareComponentPropertyOrGroup>
): boolean => {
  return groupProperties.some((property) => {
    return isExhibitHardwareComponentProperty(property)
      ? !property.uiHidden
      : containsNonHiddenProperty(property.properties);
  });
};

export interface CustomHardwarePropertiesSubpageProps {
  component: ExhibitHardwareComponentDetails;
  onClose: () => void;
  exhibitId: number;
  exhibitComponentKey: string;
  properties?: Array<ExhibitHardwareComponentPropertyOrGroup>;
  title?: string;
  subtitle?: string;
}

export const CustomHardwarePropertiesSubpage: FunctionComponent<
  CustomHardwarePropertiesSubpageProps
> = ({
  component,
  exhibitId,
  exhibitComponentKey,
  properties = [],
  onClose,
  title = PROPERTIES_SUBPAGE_TITLE,
  subtitle = PROPERTIES_SUBPAGE_SUBTITLE,
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Array<string>>([]);
  const [arraySubpage, setArraySubpage] = useState<
    ExhibitHardwareComponentIndividualProperty['path'] | null
  >(null);

  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    setBreadcrumbs([]);
    navigate(
      generateExhibitPath({
        exhibitId: exhibitId.toString(),
        tabId: 'components',
        coplanarId: exhibitComponentKey,
      })
    );
  }, [navigate, exhibitId, exhibitComponentKey]);

  const handleSetArraySubpage = useCallback(
    (
      arrayProperty: ExhibitHardwareComponentIndividualProperty['path'] | null
    ) => {
      setArraySubpage(arrayProperty);
    },
    [setArraySubpage]
  );

  const renderedProperties = useMemo(() => {
    return breadcrumbs?.length
      ? traverseGroupProperties(breadcrumbs, properties)
      : properties;
  }, [breadcrumbs, properties]);

  const individualProperties = useMemo(() => {
    return renderedProperties.filter(
      (property) =>
        isExhibitHardwareComponentProperty(property) &&
        !property.uiHidden &&
        (!arraySubpage ? true : arraySubpage === property.path)
    ) as Array<ExhibitHardwareComponentIndividualProperty>;
  }, [renderedProperties, arraySubpage]);

  const groupProperties = useMemo(() => {
    return renderedProperties.filter((property) => {
      return (
        !arraySubpage &&
        isExhibitHardwareComponentPropertyGroup(property) &&
        containsNonHiddenProperty(property.properties)
      );
    }) as Array<ExhibitHardwareComponentPropertyGroup>;
  }, [renderedProperties, arraySubpage]);

  return (
    <div className='CustomHardwarePropertiesSubpage'>
      <MainPanelCoplanarTitle
        className='CustomHardwarePropertiesSubpage__title'
        titleText={component.name}
        onClose={onClose}
        onBack={handleBack}
      />
      <div className='CustomHardwarePropertiesSubpage__contentWrapper'>
        {!arraySubpage &&
          (!breadcrumbs?.length ? (
            <div className='CustomHardwarePropertiesSubpage__header'>
              <div className='CustomHardwarePropertiesSubpage__header__title'>
                {title}
              </div>
              <div className='CustomHardwarePropertiesSubpage__header__subtitle'>
                {subtitle}
              </div>
            </div>
          ) : (
            <div>
              <Breadcrumbs className='CustomHardwarePropertiesSubpage__breadcrumbs'>
                <BreadcrumbItem
                  label='All'
                  onClick={() => setBreadcrumbs([])}
                />
                {breadcrumbs.map((breadcrumb, idx) => (
                  <BreadcrumbItem
                    key={breadcrumb}
                    label={breadcrumb}
                    onClick={
                      idx < breadcrumbs.length - 1
                        ? () => setBreadcrumbs((prev) => prev.slice(0, idx + 1))
                        : undefined
                    }
                  />
                ))}
              </Breadcrumbs>
            </div>
          ))}
        {properties.length ? (
          <div className='CustomHardwarePropertiesSubpage__propertiesWrapper'>
            {groupProperties.map((property) => (
              <GroupPropertyLinkCard
                key={property.group}
                label={property.group}
                onClick={() => setBreadcrumbs([...breadcrumbs, property.group])}
              />
            ))}
            {individualProperties.map((property) => (
              <CustomHardwareComponentProperty
                key={property.index}
                property={property}
                propertyName={returnLastPathItem(property.path)}
                disabled={!component.connected}
                arraySubpage={arraySubpage}
                onSetArraySubpage={handleSetArraySubpage}
              />
            ))}
          </div>
        ) : (
          <div className='CustomHardwarePropertiesSubpage__propertiesWrapper'>
            <FeedbackMessagePanel title='No properties available' />
          </div>
        )}
      </div>
    </div>
  );
};
