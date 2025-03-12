import {
  type FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import cx from 'classnames';
import { z } from 'zod';
import { TextField } from '../common/TextField';
import { InputAdornment } from '../common/InputAdornment';
import { InputAdornmentButtonText } from '../common/InputAdornmentButtonText';
import { InputAdornmentButton } from '../common/InputAdornmentButton';
import { SendIcon, CloseIcon } from '../common/icons';
import './UserInviteInputField.css';

const emailSchema = z.string().email('Invalid email format');

const USER_EXISTS_ERROR = 'User already exists.' as const;

export interface UserInviteInputFieldProps {
  currentUserEmails: Array<string>;
  activeEmail: string;
  setActiveEmail: (email: string) => void;
  isInviteActive: boolean;
  onInvite: () => void;
}

export const UserInviteInputField: FunctionComponent<
  UserInviteInputFieldProps
> = ({
  currentUserEmails,
  activeEmail,
  setActiveEmail,
  isInviteActive,
  onInvite,
}) => {
  const [email, setEmail] = useState(activeEmail);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) {
      setEmail(activeEmail);
    }
  }, [activeEmail, error]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const result = emailSchema.safeParse(newEmail);
    if (!result.success) {
      setActiveEmail('');
      setError(result.error.issues[0].message);
      return;
    }

    if (currentUserEmails.includes(newEmail.toLowerCase())) {
      setActiveEmail('');
      setError(USER_EXISTS_ERROR);
      return;
    }

    setError(null);
    setActiveEmail(newEmail);
  };

  const handleInputKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !error) {
        onInvite();
      }
    },
    [error, onInvite]
  );

  const handleClear = () => {
    setEmail('');
    setActiveEmail('');
    setError(null);
  };

  return (
    <TextField
      value={email}
      className={cx('UserInviteInputField', {
        UserInviteInputField__inviteActive: isInviteActive,
      })}
      placeholder='ex. oscar@company.com'
      onChange={handleEmailChange}
      error={error === USER_EXISTS_ERROR}
      fullWidth
      helperText={error === USER_EXISTS_ERROR && USER_EXISTS_ERROR}
      InputProps={{
        onKeyUp: handleInputKeyUp,
        endAdornment: (
          <InputAdornment position='end'>
            {!isInviteActive ? (
              <InputAdornmentButtonText
                className='UserInviteInputField__button'
                title='Invite'
                endIcon={<SendIcon />}
                disabled={!email || !!error}
                onClick={onInvite}
                variant='ghost'
              />
            ) : (
              !!email && (
                <InputAdornmentButton
                  className='UserInviteInputField__button'
                  onClick={handleClear}
                >
                  <CloseIcon />
                </InputAdornmentButton>
              )
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};
