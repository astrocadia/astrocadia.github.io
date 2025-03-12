import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { RichTooltip } from './RichTooltip';

const meta: Meta<typeof RichTooltip> = {
  title: 'Design System/Components/RichTooltip',
  tags: ['autodocs'],
  component: RichTooltip,
};

export default meta;
type Story = StoryObj<typeof RichTooltip>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RichTooltip title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'>
        <span>Hover me</span>
      </RichTooltip>
    </ThemeProviderWrapper>
  ),
};

export const OpenLongText: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RichTooltip
        PopperProps={{ open: true }}
        title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
      >
        <span>This is purposely locked open to allow inspector</span>
      </RichTooltip>
    </ThemeProviderWrapper>
  ),
};

export const OpenShortText: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RichTooltip PopperProps={{ open: true }} title='Lorem ipsum'>
        <span>This is purposely locked open to allow inspector</span>
      </RichTooltip>
    </ThemeProviderWrapper>
  ),
};
