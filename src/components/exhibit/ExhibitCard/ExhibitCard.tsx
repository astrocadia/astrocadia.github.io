import { memo, useCallback, useMemo, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ExhibitSummary } from '../../../app/entities/exhibit';
import { generateExhibitPath } from '../../../views/routes/exhibitRoutePaths';
import { EntityCard } from '../../EntityCard';
import { ExhibitIcon } from '../../common/icons';
import { HealthStateIcon } from '../../icons/HealthStateIcon';
import ExhibitBannerImageSrcUrl from '../assets/ExhibitBanner.svg?url';
import './ExhibitCard.css';

export interface ExhibitCardProps
  extends Pick<
    ExhibitSummary,
    'healthState' | 'name' | 'numberDisconnectedComponents'
  > {
  exhibitId: ExhibitSummary['id'];
  onClick?: () => void;
  selected?: boolean;
}

export const ExhibitCard: FunctionComponent<ExhibitCardProps> = memo(
  ({
    exhibitId,
    healthState,
    name,
    numberDisconnectedComponents,
    onClick,
    selected,
  }) => {
    const navigate = useNavigate();

    const onClickExhibitCard = useCallback(() => {
      if (onClick === undefined) {
        navigate(generateExhibitPath({ exhibitId: exhibitId.toString() }));
      } else {
        onClick();
      }
    }, [onClick, navigate, exhibitId]);

    const healthStateMessage = useMemo(() => {
      if (healthState === 'SOME_CONNECTIONS_OK') {
        return `${numberDisconnectedComponents} Component${numberDisconnectedComponents > 1 ? 's' : ''} disconnected`;
      }

      if (healthState === 'NO_CONNECTIONS') {
        return 'No Components connected';
      }

      return 'All Components connected';
    }, [healthState, numberDisconnectedComponents]);

    return (
      <EntityCard
        className='ExhibitCard'
        CardHeaderIcon={<ExhibitIcon />}
        bannerImageProps={{
          alt: 'Exhibit',
          src: ExhibitBannerImageSrcUrl,
        }}
        label={name}
        onClick={onClickExhibitCard}
        selected={selected}
      >
        <div className='ExhibitCard__healthState'>
          <HealthStateIcon healthState={healthState} />
          <span>{healthStateMessage}</span>
        </div>
      </EntityCard>
    );
  }
);

ExhibitCard.displayName = 'ExhibitCard';
