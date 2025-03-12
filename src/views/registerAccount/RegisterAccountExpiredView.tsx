import { type FunctionComponent, useState } from 'react';
import cx from 'classnames';
import { BrandedPanel } from '../../components/BrandedPanel';
import { Button } from '../../components/common/buttons';
import './RegisterAccountExpiredView.css';

interface RegisterAccountExpiredViewProps {
  isSendingNewRegisterAccountToken: boolean;
  sendNewRegisterAccountToken: () => void;
}

export const RegisterAccountExpiredView: FunctionComponent<
  RegisterAccountExpiredViewProps
> = ({ isSendingNewRegisterAccountToken, sendNewRegisterAccountToken }) => {
  // design choice to show text/styling for a specific amount of time
  // instead of relying on the API response
  const [isSendingStyling, setIsSendingStyling] = useState(false);
  const isSendingStylingTimeout = 800;

  const handleClick = () => {
    setIsSendingStyling(true);
    sendNewRegisterAccountToken();
    setTimeout(() => {
      setIsSendingStyling(false);
    }, isSendingStylingTimeout);
  };

  return (
    <BrandedPanel className='RegisterAccountExpiredView'>
      <div className='RegisterAccountExpiredView__titleWrapper'>
        <h1>Your invitation has expired</h1>
        <div className='RegisterAccountExpiredView__bodyText'>
          Please check your inbox for a new link and register your account
          within 48 hours.
        </div>
      </div>
      <div className='RegisterAccountExpiredView__actionsWrapper'>
        <Button
          className={cx('RegisterAccountExpiredView__button', {
            RegisterAccountExpiredView__button__isSending: isSendingStyling,
          })}
          disabled={isSendingStyling || isSendingNewRegisterAccountToken}
          onClick={handleClick}
        >
          {isSendingStyling ? 'Sent!' : "Didn't receive an email? Resend"}
        </Button>
      </div>
    </BrandedPanel>
  );
};
