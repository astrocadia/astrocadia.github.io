import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandedPanel } from '../../components/BrandedPanel';
import { Button } from '../../components/common/buttons/Button';
import { generateHomePath } from '../routes/helpers/simpleNavigationPaths';
import './PasswordResetCompleted.css';

export const ResetPasswordCompleted: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <BrandedPanel className='PasswordResetView'>
      <form>
        <div className='PasswordResetView__titleWrapper'>
          <h1>Password Reset</h1>
          <p>Your password was successfully reset.</p>
        </div>
        <div className='PasswordResetView__actionsWrapper'>
          <Button
            fullWidth
            type='submit'
            variant='secondary'
            onClick={() => {
              navigate(generateHomePath());
            }}
          >
            Sign In
          </Button>
        </div>
      </form>
    </BrandedPanel>
  );
};
