import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { MetricsCardList } from '../MetricsCardList';
import { MetricsCard } from './MetricsCard';
import { MetricsCardSkeleton } from './MetricsCardSkeleton';
import { InfoIcon } from '../icons';
import { ActivityGaugeIcon } from '../../icons/ActivityGaugeIcon';

const meta: Meta<typeof MetricsCard> = {
  title: 'Design System/Composite Components/MetricsCard',
  tags: ['autodocs'],
  component: MetricsCard,
};

export default meta;
type Story = StoryObj<typeof MetricsCard>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <div>
          <h3>Numerical</h3>
          <MetricsCard
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='3 elit'
          />
        </div>
        <div>
          <h3>Textual</h3>
          <MetricsCard
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='Quidem rerum eum numquam accusantium'
            variant='textual'
          />
        </div>
        <div>
          <h3>Textual - Long</h3>
          <MetricsCard
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='Quidem rerum eum numquam accusantium dolorem error inventore'
            variant='textual'
          />
        </div>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const WithDot: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <div>
          <h3>Numerical</h3>
          <MetricsCard
            DotProps={{ color: 'var(--base-color-brand-primary)' }}
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='3 elit'
          />
        </div>
        <div>
          <h3>Textual</h3>
          <MetricsCard
            DotProps={{ color: 'var(--base-color-brand-primary)' }}
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='Quidem rerum eum numquam accusantium'
            variant='textual'
          />
        </div>
        <div>
          <h3>Textual - Long</h3>
          <MetricsCard
            DotProps={{ color: 'var(--base-color-brand-primary)' }}
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='Quidem rerum eum numquam accusantium dolorem error inventore'
            variant='textual'
          />
        </div>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const WithUnit: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <div>
          <h3>Numerical</h3>
          <MetricsCard
            DotProps={{ color: 'var(--base-color-brand-primary)' }}
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='3'
            unit='Units'
          />
        </div>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const NoValue: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <div>
          <h3>Numerical</h3>
          <MetricsCard
            DotProps={{ color: 'var(--base-color-brand-primary)' }}
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
          />
        </div>
        <div>
          <h3>Textual</h3>
          <MetricsCard
            DotProps={{ color: 'var(--base-color-brand-primary)' }}
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            variant='textual'
          />
        </div>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <div>
          <h3>Numerical</h3>
          <MetricsCard
            DotProps={{ color: 'var(--base-color-brand-primary)' }}
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='3'
            icon=<InfoIcon htmlColor='green' />
          />
        </div>
        <div>
          <h3>Numerical with Unit</h3>
          <MetricsCard
            DotProps={{ color: 'var(--base-color-brand-primary)' }}
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='3'
            unit='Units'
            icon=<InfoIcon htmlColor='green' />
          />
        </div>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const WithPresenceIconAndFontColor: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <div>
          <h3>Very High</h3>
          <MetricsCard
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='9.2'
            unit='Most active'
            valueColor='var(--base-color-green-800)'
            icon=<ActivityGaugeIcon gaugeState='high' />
          />
          <h3>High</h3>
          <MetricsCard
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='6.3'
            unit='Very active'
            valueColor='var(--base-color-green-800)'
            icon=<ActivityGaugeIcon gaugeState='high' />
          />
          <h3>Med</h3>
          <MetricsCard
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='5.4'
            unit='Somewhat active'
            valueColor='var(--base-color-yellow-800)'
            icon=<ActivityGaugeIcon gaugeState='med' />
          />
          <h3>Low</h3>
          <MetricsCard
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='3.8'
            unit='Not very active'
            valueColor='var(--base-color-orange-800)'
            icon=<ActivityGaugeIcon gaugeState='low' />
          />
          <h3>Very Low</h3>
          <MetricsCard
            title='Lorem ipsum dolor sit'
            subtitle='amet consectetur'
            value='1.3'
            unit='Least active'
            valueColor='var(--base-color-orange-800)'
            icon=<ActivityGaugeIcon gaugeState='low' />
          />
        </div>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const LongTitle: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <MetricsCard
          title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
          subtitle='Duis sollicitudin'
          value='5 dolor'
        />
        <MetricsCard
          title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
          subtitle='Duis sollicitudin'
          value='5 dolor'
          DotProps={{ color: 'var(--base-color-brand-primary)' }}
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const LongSubtitle: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <MetricsCard
          title='Duis sollicitudin'
          subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
          value='5 dolor'
        />
        <MetricsCard
          title='Duis sollicitudin'
          subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
          value='5 dolor'
          DotProps={{ color: 'var(--base-color-brand-primary)' }}
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const LongValue: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <MetricsCard
          subtitle='cursus aliquam sem'
          title='Duis sollicitudin'
          value='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
          variant='textual'
        />
        <MetricsCard
          DotProps={{ color: 'var(--base-color-brand-primary)' }}
          subtitle='cursus aliquam sem'
          title='Duis sollicitudin'
          value='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
          variant='textual'
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const MultipleValues: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <MetricsCard
          title='Duis sollicitudin'
          subtitle='cursus aliquam sem'
          value={[
            'Lorem ipsum dolor sit amet consectetur',
            'adipisicing elit. Quidem rerum eum numquam',
            'accusantium dolorem error inventore ducimus non cum praesentium',
          ]}
          variant='textual'
        />
        <MetricsCard
          DotProps={{ color: 'var(--base-color-brand-primary)' }}
          subtitle='cursus aliquam sem'
          title='Duis sollicitudin'
          value={[
            'Lorem ipsum dolor sit amet consectetur',
            'adipisicing elit. Quidem rerum eum numquam',
            'accusantium dolorem error inventore ducimus non cum praesentium',
          ]}
          variant='textual'
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const CardListExample: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <MetricsCardList>
        <MetricsCard
          title='Lorem ipsum dolor sit'
          subtitle='amet consectetur'
          value='elit'
        />
        <MetricsCard
          title='Lorem ipsum dolor sit'
          subtitle='amet consectetur'
          value='elit'
          DotProps={{ color: 'var(--base-color-brand-primary)' }}
        />
        <MetricsCard
          title='Lorem ipsum dolor sit'
          subtitle='amet consectetur'
          value='elit'
          DotProps={{ color: 'rgba(158, 196, 253, .6)' }}
        />
        <MetricsCard
          title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
          subtitle='Duis sollicitudin augue nibh'
          value='cursus aliquam sem gravida vel'
          variant='textual'
        />
      </MetricsCardList>
    </ThemeProviderWrapper>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <div>
          <h3>Numerical</h3>
          <MetricsCardSkeleton />
        </div>
        <div>
          <h3>Textual</h3>
          <MetricsCardSkeleton variant='textual' />
        </div>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const SkeletonList: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <MetricsCardList>
        <MetricsCardSkeleton />
        <MetricsCardSkeleton />
        <MetricsCardSkeleton variant='textual' />
        <MetricsCardSkeleton />
      </MetricsCardList>
    </ThemeProviderWrapper>
  ),
};
