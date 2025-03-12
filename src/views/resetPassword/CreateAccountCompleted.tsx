import { FunctionComponent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BrandedPanel } from '../../components/BrandedPanel';
import { Button } from '../../components/common/buttons/Button';
import { generateHomePath } from '../routes/helpers/simpleNavigationPaths';
import './ResetPasswordView.css';

export const CreateAccountCompleted: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success') === 'true';
  return (
    <BrandedPanel className='ResetPasswordView'>
      <form>
        <div className='ResetPasswordView__titleWrapper'>
          <h1>{success ? 'Account Complete' : 'Sign up failed'}</h1>
          <h2>
            {success
              ? 'Please sign in to get started'
              : "There was an issue reaching Gumband's authentication service. Please contact support or try logging in again."}
          </h2>
        </div>
        <div className='ResetPasswordView__actionsWrapper'>
          <Button
            fullWidth
            type='submit'
            variant='secondary'
            onClick={() => {
              navigate(generateHomePath());
            }}
          >
            {success ? 'Sign In' : 'Return to login page'}
          </Button>
        </div>
      </form>
    </BrandedPanel>
  );
};
