import { zodResolver } from '@hookform/resolvers/zod';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import cx from 'classnames';
import { useCallback, useEffect, type FunctionComponent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { getHTTPEndpoint } from '../../app/services/api';
import {
  isIncorrectUsernameOrPasswordError,
  isUserAccountCreatedWithGAuthError,
} from '../../app/services/common/errorResponses';
import { useLoginMutation } from '../../app/services/user';
import { BrandedPanel } from '../../components/BrandedPanel';
import { PrivacyPolicy } from '../../components/PrivacyPolicy';
import { InputAdornment } from '../../components/common/InputAdornment';
import { ControlledTextField } from '../../components/common/TextField';
import { Button } from '../../components/common/buttons';
import { useToggle } from '../../components/common/hooks/useToggle';
import { LOCAL_STORAGE_KEY, LocalStorage } from '../../utils/LocalStorage';
import {
  generateForgotPasswordPath,
  generateOktaLoginPath,
} from '../routes/unauthenticatedPaths';
import './LoginView.css';
import { OktaIcon } from '../../components/common/icons';
import GoogleIcon from './assets/btn_google.svg';

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const LoginView: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [login, { error: loginError }] = useLoginMutation();
  const { toggled: isPasswordVisible, toggle: togglePasswordVisible } =
    useToggle(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    setError,
  } = useForm<FormSchemaType>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (loginError) {
      if (isIncorrectUsernameOrPasswordError(loginError)) {
        setError('email', {});
        setError('password', {
          message: 'Incorrect email or password. Please try again.',
        });
      } else if (isUserAccountCreatedWithGAuthError(loginError)) {
        setError('email', {});
        setError('password', {
          message: 'Please use the Sign in with Google option below',
        });
      }
    }
  }, [loginError, setError]);

  const onTogglePasswordVisible = useCallback(() => {
    togglePasswordVisible();
  }, [togglePasswordVisible]);

  const handleLogin: SubmitHandler<FormSchemaType> = useCallback(
    async (data) => {
      await login(data);
    },
    [login]
  );

  const handleGoogleLogin = useCallback(() => {
    const loginSuccessRedirect = `${location.pathname || '/'}${
      location.search || ''
    }`;
    LocalStorage.setItem(LOCAL_STORAGE_KEY.OAuthRedirect, loginSuccessRedirect);

    const url = `${getHTTPEndpoint('auth')}/auth/google/beta`;
    window.location.href = url;
  }, [location]);

  const handleForgotPassword = useCallback(() => {
    navigate(generateForgotPasswordPath());
  }, [navigate]);

  const handleOktaLogin = useCallback(() => {
    const loginSuccessRedirect = `${location.pathname || '/'}${
      location.search || ''
    }`;
    LocalStorage.setItem(LOCAL_STORAGE_KEY.OAuthRedirect, loginSuccessRedirect);
    navigate(generateOktaLoginPath());
  }, [navigate, location]);

  return (
    <BrandedPanel className='LoginView' footer={<PrivacyPolicy />}>
      <form>
        <h1 className='welcome'>Welcome</h1>

        <div className='LoginView_inputWrapper'>
          <ControlledTextField
            control={control}
            inputProps={{ 'aria-label': 'Email' }}
            name='email'
            fullWidth
            placeholder='Email'
          />

          <ControlledTextField
            name='password'
            control={control}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                  className={cx('clickable', 'actionAdornment')}
                  onClick={onTogglePasswordVisible}
                  onKeyDown={onTogglePasswordVisible}
                  tabIndex={0}
                >
                  {isPasswordVisible ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </InputAdornment>
              ),
            }}
            inputProps={{ 'aria-label': 'Password' }}
            placeholder='Password'
            type={isPasswordVisible ? 'text' : 'password'}
          />
        </div>

        <div className='LoginView__actionsWrapper'>
          <Button
            disabled={isSubmitting || !isValid}
            fullWidth
            type='submit'
            onClick={handleSubmit(handleLogin)}
            variant='secondary'
          >
            Sign In
          </Button>

          <Button
            className='googleAuthenticatorButton'
            fullWidth
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Button
            className='oktaAuthenticatorButton'
            fullWidth
            onClick={handleOktaLogin}
            startIcon={<OktaIcon />}
          >
            Sign in with Okta
          </Button>
          <Button fullWidth variant='ghost' onClick={handleForgotPassword}>
            Forgot Password?
          </Button>
        </div>
      </form>
    </BrandedPanel>
  );
};
