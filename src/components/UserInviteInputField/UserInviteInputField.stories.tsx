import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { UserInviteInputField } from './UserInviteInputField';
import { ArrowBackIcon } from '../common/icons';
import { Button } from '../common/buttons/Button';

const meta: Meta<typeof UserInviteInputField> = {
  title: 'Michael Pflueger Portfolio/UserInviteInputField',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An input field for inviting new users to our app.',
      },
    },
  },
  component: UserInviteInputField,
};
export default meta;

// Correct the type for Story if necessary, or adjust based on your actual types
export const Default: StoryObj<typeof UserInviteInputField> = {
  render: () => {
    const [activeEmail, setActiveEmail] = useState<string>('');
    const [isInviteActive, setIsInviteActive] = useState<boolean>(false);

    const handleSetActiveEmail = useCallback((email: string) => {
      setActiveEmail(email);
    }, []);

    return (
      <ThemeProviderWrapper>
        <div style={{ height: '2rem' }}>
          {isInviteActive && (
            <ArrowBackIcon
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                setIsInviteActive(false);
              }}
            />
          )}
        </div>
        <form>
          <UserInviteInputField
            currentUserEmails={['abc@example.com', 'abc@gumband.com']}
            activeEmail={activeEmail}
            setActiveEmail={handleSetActiveEmail}
            isInviteActive={isInviteActive}
            onInvite={() => {
              setIsInviteActive(true);
            }}
          />
        </form>
        <div style={{ color: 'grey', margin: '1rem 0' }}>
          Existing users (for testing):
          <div style={{ marginTop: '.5rem', paddingLeft: '1rem' }}>
            abc@example.com,
          </div>
          <div style={{ paddingLeft: '1rem' }}>abc@gumband.com</div>
        </div>
        {isInviteActive && (
          <>
            <Button
              onClick={() => {
                setIsInviteActive(false);
                setActiveEmail('');
              }}
            >
              {' '}
              Cancel
            </Button>
            <span style={{ margin: '0 .25rem' }} />
            <Button
              variant='secondary'
              onClick={() => {
                // eslint-disable-next-line no-alert
                alert(`Inviting ${activeEmail}`);
              }}
              disabled={!activeEmail}
            >
              Invite
            </Button>
          </>
        )}
      </ThemeProviderWrapper>
    );
  },
};
