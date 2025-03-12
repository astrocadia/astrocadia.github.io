import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../common/buttons';
import { ExhibitComponentIcon } from '../../../common/icons';
import { generateExhibitPath } from '../../../../views/routes/exhibitRoutePaths';
import {
  ErrorFeedbackPanel,
  type ErrorPanelProps,
} from '../../../feedback/ErrorFeedbackPanel';

export interface NoComponentsErrorPanelProps extends ErrorPanelProps {
  exhibitId: number;
}

export const NoComponentsErrorPanel: FunctionComponent<
  NoComponentsErrorPanelProps
> = ({
  exhibitId,
  title = 'No Components Found',
  message = 'To use logs, add a Component to this Exhibit and connect it to the Gumband Cloud.',
}) => {
  const path = generateExhibitPath({
    exhibitId: exhibitId.toString(),
    tabId: 'components',
  });
  const navigate = useNavigate();

  const handleViewComponents = () => {
    navigate(path);
  };

  return (
    <ErrorFeedbackPanel
      title={title}
      message={message}
      action={
        <Button
          variant='primary'
          startIcon={<ExhibitComponentIcon />}
          onClick={handleViewComponents}
        >
          View Components
        </Button>
      }
    />
  );
};
