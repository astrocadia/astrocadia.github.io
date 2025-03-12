import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { CardList } from './CardList';

const meta: Meta<typeof CardList> = {
  title: 'Design System/Components/CardList',
  tags: ['autodocs'],
  component: CardList,
};

export default meta;
type Story = StoryObj<typeof CardList>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <CardList>
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            style={{ backgroundColor: 'blue', height: '100px', width: '100%' }}
          />
        ))}
      </CardList>
    </ThemeProviderWrapper>
  ),
};

export const LowCardCount: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <CardList>
        {Array.from({ length: 2 }, (_, i) => (
          <div
            key={i}
            style={{ backgroundColor: 'blue', height: '100px', width: '100%' }}
          />
        ))}
      </CardList>
    </ThemeProviderWrapper>
  ),
};
