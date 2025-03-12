import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useCallback, type FunctionComponent } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { getHTTPEndpoint } from '../../app/services/api';
import { BrandedPanel } from '../../components/BrandedPanel';
import { PrivacyPolicy } from '../../components/PrivacyPolicy';
import { InputAdornment } from '../../components/common/InputAdornment';
import { ControlledTextField } from '../../components/common/TextField';
import { Button } from '../../components/common/buttons';
import './OktaLoginView.css';
import { OktaIcon } from '../../components/common/icons';
import { generateHomePath } from '../routes/helpers/simpleNavigationPaths';
import { Select } from '../../components/common/Select';
import { MenuItem } from '../../components/common/MenuItem';

const OKTA_URL_SUFFIX = '.okta.com' as const;
const GENERIC_URL_SUFFIX = '.com' as const;
const OKTA_SIGN_IN_BUTTON_TEXT = 'Sign in with Okta' as const;

const formSchema = z.object({
  oktaOrg: z.string().min(1, 'Okta Organization URL is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;

const oktaLogin = {
  title: 'Okta Sign In',
  body: 'Please enter your Okta Organization URL',
};

export const OktaLoginView: FunctionComponent = () => {
  const navigate = useNavigate();
  const [urlSuffixValue, setUrlSuffixValue] = useState<string>(OKTA_URL_SUFFIX);
  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      setUrlSuffixValue(event.target.value as string);
    },
    [setUrlSuffixValue]
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormSchemaType>({
    defaultValues: { oktaOrg: '' },
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  const handleLogin: SubmitHandler<FormSchemaType> = useCallback(
    async (data) => {
      const url = `${getHTTPEndpoint('auth')}/auth/okta?org=${data.oktaOrg}${urlSuffixValue}`;
      window.location.href = url;
    },
    [urlSuffixValue]
  );

  const handleBack = useCallback(() => {
    navigate(generateHomePath());
  }, [navigate]);

  return (
    <BrandedPanel
      onBack={handleBack}
      className='OktaLoginView'
      footer={<PrivacyPolicy />}
    >
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className='OktaLoginView__title'>
          <h1>{oktaLogin.title}</h1>
          <p>{oktaLogin.body}</p>
        </div>

        <div className='OktaLoginView_inputWrapper'>
          <ControlledTextField
            control={control}
            className='oktaInputField'
            inputProps={{ 'aria-label': 'Okta Organizaion' }}
            name='oktaOrg'
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' tabIndex={0}>
                  <Select
                    label='url-suffix'
                    className='oktaAdornmentButton'
                    value={urlSuffixValue}
                    onChange={handleChange}
                  >
                    <MenuItem value={OKTA_URL_SUFFIX}>
                      {OKTA_URL_SUFFIX}
                    </MenuItem>
                    <MenuItem value={GENERIC_URL_SUFFIX}>
                      {GENERIC_URL_SUFFIX}
                    </MenuItem>
                  </Select>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className='OktaLoginView__actionsWrapper'>
          <Button
            className='oktaAuthenticatorButton'
            fullWidth
            disabled={isSubmitting || !isValid}
            type='submit'
            startIcon={<OktaIcon />}
          >
            {OKTA_SIGN_IN_BUTTON_TEXT}
          </Button>
        </div>
      </form>
    </BrandedPanel>
  );
};
