import { zodResolver } from '@hookform/resolvers/zod';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { isInvalidPasswordResetEmailError } from '../../app/services/common/errorResponses';
import { usePasswordResetRequestMutation } from '../../app/services/user';
import { BrandedPanel } from '../../components/BrandedPanel';
import { ControlledTextField } from '../../components/common/TextField/ControlledTextField';
import { Button } from '../../components/common/buttons/Button';
import { type ButtonVariant } from '../../components/common/buttons/common/buttonTypes';
import { generateHomePath } from '../routes/helpers/simpleNavigationPaths';
import './RequestPasswordResetView.css';

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

type FormSchemaType = z.infer<typeof formSchema>;
type RequestPasswordText = {
  title: string;
  body: string;
  button: string;
  buttonType: ButtonVariant;
};

const initialRequestText: RequestPasswordText = {
  title: 'Reset Password',
  body: `Enter the email associated with your account and we'll send a
  link to reset.`,
  button: 'Send',
  buttonType: 'secondary',
};

const resendRequestText: RequestPasswordText = {
  title: 'Check your inbox',
  body: 'If an account is associated with the email entered, you will receive a link to reset your password. The link is valid for 12 hours.',
  button: 'Resend',
  buttonType: 'primary',
};

const expiredRequestText: RequestPasswordText = {
  title: 'Link Expired',
  body: 'Reset link has expired. Please enter your email to receive a new link and reset your password within 12 hours.',
  button: 'Send',
  buttonType: 'secondary',
};

export const RequestResetPasswordView: FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [successPasswordResetLatch, setSuccessPasswordResetLatch] =
    useState(false);
  const navigate = useNavigate();
  const expired = searchParams.get('expired');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    setError,
  } = useForm<FormSchemaType>({
    defaultValues: { email: '' },
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  const [
    requestPasswordReset,
    {
      data: successPasswordReset,
      error: requestPasswordResetError,
      isLoading: isLoadingPasswordResetRequest,
    },
  ] = usePasswordResetRequestMutation();

  const requestPasswordText = useMemo(() => {
    if (expired === 'true') {
      return expiredRequestText;
    }

    if (successPasswordReset || successPasswordResetLatch) {
      setSuccessPasswordResetLatch(true);
      return resendRequestText;
    }

    return initialRequestText;
  }, [expired, successPasswordReset, successPasswordResetLatch]);

  useEffect(() => {
    if (requestPasswordResetError) {
      if (isInvalidPasswordResetEmailError(requestPasswordResetError)) {
        setError('email', { message: 'Invalid email' });
      } else {
        setError('email', {
          message: 'Could not connect to Gumband Cloud.',
        });
      }
    }
  }, [requestPasswordResetError, setError]);

  const handleRequest: SubmitHandler<FormSchemaType> = useCallback(
    async (data) => {
      await requestPasswordReset({ email: data.email });
      if (expired === 'true') {
        setSearchParams({});
      }
    },
    [expired, requestPasswordReset, setSearchParams]
  );

  return (
    <BrandedPanel
      className='RequestPasswordResetView'
      onBack={() => navigate(generateHomePath())}
    >
      <form>
        <div className='RequestPasswordResetView__titleWrapper'>
          <h1>{requestPasswordText.title}</h1>
          <p>{requestPasswordText.body}</p>
        </div>
        <ControlledTextField
          control={control}
          inputProps={{ 'aria-label': 'Email' }}
          name='email'
          fullWidth
          placeholder='Email'
          disabled={!!successPasswordReset || isSubmitting}
        />
        <div className='RequestPasswordResetView__actionsWrapper'>
          <Button
            fullWidth
            disabled={isSubmitting || !isValid || isLoadingPasswordResetRequest}
            type='submit'
            onClick={handleSubmit(handleRequest)}
            variant={requestPasswordText.buttonType}
          >
            {requestPasswordText.button}
          </Button>
        </div>
      </form>
    </BrandedPanel>
  );
};
