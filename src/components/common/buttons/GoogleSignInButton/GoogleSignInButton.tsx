import { FunctionComponent, useCallback } from 'react';
import { getHTTPEndpoint } from '../../../../app/services/api';
import GoogleIcon from '../../../../views/login/assets/btn_google.svg';
import { SvgIcon } from '../../icons';
import { Button } from '../Button';

export const GoogleSignInButton: FunctionComponent = () => {
  const handleGoogleLogin = useCallback(() => {
    const url = `${getHTTPEndpoint('auth')}/auth/google/beta`;
    window.location.href = url;
  }, []);

  return (
    <Button
      fullWidth
      onClick={handleGoogleLogin}
      startIcon={
        <SvgIcon viewBox='0 0 16 16'>
          <GoogleIcon />
        </SvgIcon>
      }
    >
      Sign in with Google
    </Button>
  );
};
