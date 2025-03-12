import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { skipToken } from '@reduxjs/toolkit/query/react';
import {
  type FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { isInvalidPasswordResetTokenError } from '../../app/services/common/errorResponses';
import {
  useChangePasswordMutation,
  useCreateAccountMutation,
  useValidateResetTokenQuery,
} from '../../app/services/user';
import { BrandedPanel } from '../../components/BrandedPanel';
import { InputAdornment } from '../../components/common/InputAdornment';
import { InputRequirement } from '../../components/common/InputRequiment';
import { InputRequirements } from '../../components/common/InputRequirements/InputRequirements';
import { TextField } from '../../components/common/TextField';
import { Button } from '../../components/common/buttons/Button';
import { useToggle } from '../../components/common/hooks/useToggle';
import { generateHomePath } from '../routes/helpers/simpleNavigationPaths';
import {
  generateAccountCreatedPath,
  generateExpiredTokenPath,
  generatePasswordResetPath,
} from '../routes/unauthenticatedPaths';
import './ResetPasswordView.css';

export const ResetPasswordView: FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    toggled: isPasswordVisible,
    setOn: setPasswordVisible,
    setOff: setPasswordHidden,
  } = useToggle();

  const {
    toggled: isConfirmPasswordVisible,
    setOn: setConfirmPasswordVisible,
    setOff: setConfirmPasswordHidden,
  } = useToggle();

  const {
    data: isValidToken,
    isLoading,
    error: validateTokenError,
  } = useValidateResetTokenQuery(id ? { id } : skipToken);

  const [
    createAccount,
    {
      data: successAccount,
      error: createAccountError,
      isLoading: isLoadingCreateAccount,
    },
  ] = useCreateAccountMutation();

  const [
    changePassword,
    {
      data: successChangePassword,
      error: changePasswordError,
      isLoading: loadingChangePassword,
    },
  ] = useChangePasswordMutation();

  const { length, numeric, uppercase, lowercase, noSpace, match } =
    useMemo(() => {
      const validation = {
        length: password.length >= 10 && password.length <= 64,
        numeric: /\d/.test(password),
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        noSpace: !/\s/.test(password) && password.length > 0,
        match: confirmPassword === password && password.length > 1,
      };
      return validation;
    }, [password, confirmPassword]);

  const formValid = useMemo(() => {
    return length && numeric && uppercase && lowercase && noSpace && match;
  }, [length, lowercase, match, noSpace, numeric, uppercase]);

  useEffect(() => {
    if (createAccountError || changePasswordError) {
      navigate(generateAccountCreatedPath(false));
    }
  }, [changePasswordError, createAccountError, navigate]);

  useEffect(() => {
    if (successAccount) {
      navigate(generateAccountCreatedPath(true));
    }
  }, [navigate, successAccount]);

  useEffect(() => {
    if (successChangePassword) {
      navigate(generatePasswordResetPath());
    }
  }, [navigate, successChangePassword]);

  useEffect(() => {
    if (!isLoading && id === null) {
      navigate(generateHomePath());
    } else if (
      (!isLoading &&
        validateTokenError &&
        isInvalidPasswordResetTokenError(validateTokenError)) ||
      isValidToken === false
    ) {
      navigate(generateExpiredTokenPath());
    }
  }, [id, isLoading, isValidToken, navigate, validateTokenError]);

  const locationState = location.state as {
    firstName?: string;
    lastName?: string;
  };

  let firstName: string | undefined;
  let lastName: string | undefined;
  let newAccount = false;

  if (locationState) {
    firstName = locationState.firstName;
    lastName = locationState.lastName;
    newAccount = !!(firstName && lastName);
  }

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formValid) {
        if (newAccount && firstName && lastName && password && id) {
          createAccount({
            firstName,
            lastName,
            password,
            resetUrlId: id,
          });
        } else if (password && id) {
          changePassword({
            password,
            resetUrlId: id,
          });
        }
      }
    },
    [
      changePassword,
      createAccount,
      firstName,
      formValid,
      id,
      lastName,
      newAccount,
      password,
    ]
  );

  return (
    <BrandedPanel className='ResetPasswordView' onBack={() => navigate('/')}>
      <form onSubmit={onSubmit}>
        <div className='ResetPasswordView__titleWrapper'>
          <h1>{newAccount ? 'Create Password' : 'Reset Password'}</h1>
        </div>
        <div className='ResetPasswordView__inputWrapper'>
          <TextField
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment className='actionAdornment' position='end'>
                  {isPasswordVisible ? (
                    <VisibilityOffIcon
                      className='clickable'
                      onClick={setPasswordHidden}
                    />
                  ) : (
                    <VisibilityIcon
                      className='clickable'
                      onClick={setPasswordVisible}
                    />
                  )}
                </InputAdornment>
              ),
            }}
            inputProps={{ 'aria-label': 'New Password' }}
            placeholder='Password'
            type={isPasswordVisible ? 'text' : 'password'}
          />
          <TextField
            name='confirmPassword'
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment className='actionAdornment' position='end'>
                  {isConfirmPasswordVisible ? (
                    <VisibilityOffIcon
                      className='clickable'
                      onClick={setConfirmPasswordHidden}
                    />
                  ) : (
                    <VisibilityIcon
                      className='clickable'
                      onClick={setConfirmPasswordVisible}
                    />
                  )}
                </InputAdornment>
              ),
            }}
            inputProps={{ 'aria-label': 'Confirm New Password' }}
            placeholder='Confirm New Password'
            type={isConfirmPasswordVisible ? 'text' : 'password'}
          />
        </div>
        <InputRequirements>
          <InputRequirement requirementMet={length}>
            Between 8-100 characters
          </InputRequirement>
          <InputRequirement requirementMet={numeric}>
            At least one numeric digit
          </InputRequirement>
          <InputRequirement requirementMet={uppercase}>
            At least one uppercase character
          </InputRequirement>
          <InputRequirement requirementMet={lowercase}>
            At least one lower case character
          </InputRequirement>
          <InputRequirement requirementMet={noSpace}>
            Contain no spaces
          </InputRequirement>
          <InputRequirement requirementMet={match}>
            Passwords must match
          </InputRequirement>
        </InputRequirements>
        <div className='ResetPasswordView__actionsWrapper'>
          <Button
            fullWidth
            type='submit'
            variant='secondary'
            disabled={
              !formValid && !isLoadingCreateAccount && !loadingChangePassword
            }
          >
            {newAccount ? 'Complete Account' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </BrandedPanel>
  );
};
