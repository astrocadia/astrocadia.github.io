import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { ExhibitComponentKey } from '../../../app/entities/exhibitComponents';
import {
  deleteExhibitComponentAuthToken,
  selectAllExhibitComponentAuthTokens,
  type ExhibitComponentAuthToken,
} from '../../../app/services/exhibitComponentAuthTokens';
import { useAppDispatch } from '../../../app/store';
import {
  EXHIBIT_TAB,
  generateExhibitPath,
} from '../../../views/routes/exhibitRoutePaths';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import { CardList } from '../../common/CardList';
import { useInterval } from '../../common/hooks/useInterval';
import { CloudConnectErrorMessagePanel } from '../../feedback/CloudConnectErrorMessagePanel';
import { useExhibitComponentsList } from '../common/hooks/useExhibitComponents';
import { CreateExhibitComponentButton } from './CreateExhibitComponentButton/CreateExhibitComponentButton';
import { ExhibitComponentAuthInfoDialog } from './ExhibitComponentAuthInfoDialog';
import {
  ExhibitComponentCard,
  ExhibitComponentCardSkeleton,
} from './ExhibitComponentCard';
import { NoExhibitComponentsMessagePanel } from './feedback/NoExhibitComponentsMessagePanel';
import {
  encodeExhibitComponentKey,
  isExhibitComponentKey,
} from './utils/exhibitComponentIdUtils';

const DEFAULT_NUMBER_OF_SKELETONS = 3 as const;
const DELAY = 300 as const;

export interface ExhibitComponentsProps {
  exhibitId: number;
  selectedExhibitComponentKey?: ExhibitComponentKey;
}

export const ExhibitComponents: FunctionComponent<ExhibitComponentsProps> = ({
  exhibitId,
  selectedExhibitComponentKey,
}) => {
  const { components, isError, isLoading } =
    useExhibitComponentsList(exhibitId);

  const isEmptyList = useMemo(
    () => !isLoading && components && components.length === 0,
    [isLoading, components]
  );

  const tick = useInterval();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [displayedAuthToken, setDisplayedAuthToken] = useState<
    ExhibitComponentAuthToken | undefined
  >(undefined);
  const [showAuthTokenDialog, setShowAuthTokenDialog] = useState(false);

  const componentCardOnClick = useCallback(
    (componentKey: string) => {
      if (!exhibitId) {
        return;
      }
      if (
        componentKey === selectedExhibitComponentKey ||
        !isExhibitComponentKey(componentKey)
      ) {
        navigate(
          generateExhibitPath({
            exhibitId: exhibitId.toString(),
            tabId: 'components',
          })
        );
      } else {
        navigate(
          generateExhibitPath({
            exhibitId: exhibitId.toString(),
            tabId: 'components',
            coplanarId: componentKey,
          })
        );
      }
    },
    [exhibitId, navigate, selectedExhibitComponentKey]
  );

  const exhibitComponentAuthTokens = useSelector((state) =>
    selectAllExhibitComponentAuthTokens(state, { exhibitId })
  );

  useEffect(() => {
    const poppedToken = exhibitComponentAuthTokens.pop();

    if (poppedToken && !displayedAuthToken) {
      setDisplayedAuthToken(poppedToken);
      setShowAuthTokenDialog(true);
      dispatch(deleteExhibitComponentAuthToken({ exhibitId, ...poppedToken }));
    }
  }, [exhibitComponentAuthTokens, displayedAuthToken, dispatch, exhibitId]);

  // TODO: This is pure copy pasta from ExhibitMainPanel, should be refactored?
  const handleAuthTokenDialogClose = useCallback(() => {
    setShowAuthTokenDialog(false);
    // Adds a delay to the token deletion to allow the dialog to animate out
    setTimeout(() => {
      setDisplayedAuthToken(undefined);
    }, DELAY);
  }, [setDisplayedAuthToken]);

  return (
    <>
      <MainPanelHeader
        title={EXHIBIT_TAB.components}
        actions={[
          <CreateExhibitComponentButton
            exhibitId={exhibitId}
            key='CreateExhibitComponentButton'
          />,
        ]}
      />
      {isError && <CloudConnectErrorMessagePanel />}
      {!isError && isEmptyList && <NoExhibitComponentsMessagePanel />}
      {!isError && !isEmptyList && (
        <MainPanelContent className='ExhibitComponents'>
          <CardList>
            {isLoading &&
              Array.from({ length: DEFAULT_NUMBER_OF_SKELETONS }, (_, i) => (
                <ExhibitComponentCardSkeleton key={i} />
              ))}
            {!isLoading &&
              !isEmptyList &&
              components?.map((component) => {
                const componentKey = encodeExhibitComponentKey(component);

                return (
                  <ExhibitComponentCard
                    key={componentKey}
                    componentId={component.componentId}
                    exhibitId={component.exhibitId}
                    name={component.name}
                    selected={componentKey === selectedExhibitComponentKey}
                    tick={tick}
                    type={component.type}
                    category={component.category}
                    connected={component.connected}
                    connectedChangedAt={component.connectedChangedAt}
                    onClick={() => componentCardOnClick(componentKey)}
                  />
                );
              })}
          </CardList>
          {displayedAuthToken && (
            <ExhibitComponentAuthInfoDialog
              open={showAuthTokenDialog}
              onClose={handleAuthTokenDialogClose}
              {...displayedAuthToken}
            />
          )}
        </MainPanelContent>
      )}
    </>
  );
};
