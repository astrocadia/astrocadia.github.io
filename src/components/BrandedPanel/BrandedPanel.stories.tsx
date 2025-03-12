import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { BrandedPanel } from './BrandedPanel';

const meta: Meta<typeof BrandedPanel> = {
  title: 'Design System/Views/BrandedPanel',
  tags: ['autodocs'],
  component: BrandedPanel,
};

export default meta;
type Story = StoryObj<typeof BrandedPanel>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <BrandedPanel>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem
          reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus
          veniam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
          rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti
          quae officiis?
        </p>
      </BrandedPanel>
    </ThemeProviderWrapper>
  ),
};

export const BackAction: Story = {
  render: () => (
    <ThemeProviderWrapper>
      {/* eslint-disable-next-line no-alert */}
      <BrandedPanel onBack={() => alert('Back Clicked')}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem
          reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus
          veniam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
          rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti
          quae officiis?
        </p>
      </BrandedPanel>
    </ThemeProviderWrapper>
  ),
};

export const ForwardAction: Story = {
  render: () => (
    <ThemeProviderWrapper>
      {/* eslint-disable-next-line no-alert */}
      <BrandedPanel onForward={() => alert('Forward Clicked')}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem
          reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus
          veniam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
          rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti
          quae officiis?
        </p>
      </BrandedPanel>
    </ThemeProviderWrapper>
  ),
};

export const DoubleAction: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <BrandedPanel
        // eslint-disable-next-line no-alert
        onBack={() => alert('Back Clicked')}
        // eslint-disable-next-line no-alert
        onForward={() => alert('Forward Clicked')}
      >
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem
          reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus
          veniam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
          rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti
          quae officiis?
        </p>
      </BrandedPanel>
    </ThemeProviderWrapper>
  ),
};
