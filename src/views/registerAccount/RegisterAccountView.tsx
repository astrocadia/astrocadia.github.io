import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query/react';
import {
  type FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import {
  isInvalidPasswordResetTokenError,
  isExpiredPasswordResetNewTokenSentError,
  isInvalidPasswordResetEmailError,
} from '../../app/services/common/errorResponses';
import { useValidateResetTokenQuery } from '../../app/services/user';
import { BrandedPanel } from '../../components/BrandedPanel';
import { CircularProgress } from '../../components/common/CircularProgress';
import { ControlledTextField } from '../../components/common/TextField';
import { Button } from '../../components/common/buttons';
import { GoogleSignInButton } from '../../components/common/buttons/GoogleSignInButton/GoogleSignInButton';
import { generateHomePath } from '../routes/helpers/simpleNavigationPaths';
import { generateResetPasswordPath } from '../routes/unauthenticatedPaths';
import { RegisterAccountExpiredView } from './RegisterAccountExpiredView';
import './RegisterAccountView.css';

const formSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const RegisterAccountView: FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const email = searchParams.get('email');
  const [showExpiredTokenView, setShowExpiredTokenView] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormSchemaType>({
    defaultValues: { firstName: '', lastName: '' },
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });
  const {
    data: isValidToken,
    isLoading,
    error: validateTokenError,
    refetch: sendNewRegisterAccountToken,
    isFetching: isSendingNewRegisterAccountToken,
  } = useValidateResetTokenQuery(id && email ? { id, email } : skipToken);

  useEffect(() => {
    if (!isLoading) {
      if (
        validateTokenError &&
        isExpiredPasswordResetNewTokenSentError(validateTokenError)
      ) {
        setShowExpiredTokenView(true);
      } else if (
        id === null ||
        !isValidToken ||
        (validateTokenError &&
          (isInvalidPasswordResetEmailError(validateTokenError) ||
            isInvalidPasswordResetTokenError(validateTokenError)))
      ) {
        navigate(generateHomePath());
      }
    }
  }, [id, isLoading, isValidToken, navigate, validateTokenError]);

  const handleNext: SubmitHandler<FormSchemaType> = useCallback(
    async (data) => {
      navigate(generateResetPasswordPath(id || ''), {
        state: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
    },
    [id, navigate]
  );

  if (isLoading && !showExpiredTokenView) {
    return (
      <BrandedPanel className='RegisterAccountView'>
        <div className='RegisterAccountView__titleWrapper'>
          <h1>Complete Account</h1>
        </div>
        <CircularProgress />;
      </BrandedPanel>
    );
  }

  if (showExpiredTokenView) {
    return (
      <RegisterAccountExpiredView
        isSendingNewRegisterAccountToken={isSendingNewRegisterAccountToken}
        sendNewRegisterAccountToken={sendNewRegisterAccountToken}
      />
    );
  }

  return (
    <BrandedPanel className='RegisterAccountView'>
      <form>
        <div className='RegisterAccountView__titleWrapper'>
          <h1>Complete Account</h1>
          <div className='RegisterAccountView__bodyText'>
            Add your information or sign in with Google to complete your account
          </div>
        </div>
        <div className='RegisterAccountView__inputWrapper'>
          {email && (
            <div className='RegisterAccountView__inputBodyText'> {email} </div>
          )}
          <ControlledTextField
            inputProps={{ 'aria-label': 'First Name' }}
            control={control}
            name='firstName'
            fullWidth
            placeholder='First Name'
          />
          <ControlledTextField
            inputProps={{ 'aria-label': 'Last Name' }}
            control={control}
            name='lastName'
            fullWidth
            placeholder='Last Name'
          />
        </div>

        <div className='RegisterAccountView__actionsWrapper'>
          <Button
            disabled={isSubmitting || !isValid}
            fullWidth
            type='submit'
            variant='secondary'
            onClick={handleSubmit(handleNext)}
          >
            Next
          </Button>
          <GoogleSignInButton />
        </div>
      </form>
    </BrandedPanel>
  );
};
