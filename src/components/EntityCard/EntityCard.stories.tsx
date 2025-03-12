import MemoryIcon from '@mui/icons-material/Memory';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import type { Meta, StoryObj } from '@storybook/react';
import GumbandLogoSrcUrl from '../../assets/logo/GumbandLogoPaddedDark.svg?url';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { CardList } from '../common/CardList';
import { Skeleton } from '../common/Skeleton';
import { EntityCard } from './EntityCard';
import { EntityCardSkeleton } from './EntityCardSkeleton';

const meta: Meta<typeof EntityCard> = {
  title: 'Design System/Composite Components/EntityCard',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: EntityCard,
};

export default meta;
type Story = StoryObj<typeof EntityCard>;

const onClick = () => {
  // eslint-disable-next-line no-alert
  alert('EntityCard clicked');
};

const customBackgroundStyle = {
  backgroundColor: 'var(--background-workspace-color)',
  opacity: 0.8,
  backgroundImage:
    'linear-gradient(var(--line-color) 0.0625rem, transparent 0.0625rem), linear-gradient(to right, var(--line-color) 0.0625rem, var(--background-workspace-color) 0.0625rem)',
  backgroundSize: '1.25rem 1.25rem',
  backgroundPosition: '50% 50%',
};

export const Default: Story = {
  args: {
    label: 'Lorem ipsum dolor sit',
    onClick,
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    CardHeaderIcon: <WidgetsOutlinedIcon />,
  },
};

export const NotClickable: Story = {
  args: {
    ...WithIcon.args,
    onClick: undefined,
  },
};

export const CustomBackground: Story = {
  args: {
    ...WithIcon.args,
    CardBannerProps: {
      style: customBackgroundStyle,
    },
  },
};

export const Image: Story = {
  args: {
    ...WithIcon.args,
    bannerImageProps: {
      alt: 'Gumband logo',
      src: GumbandLogoSrcUrl,
    },
  },
};

export const CustomBackgroundAndImage: Story = {
  args: {
    ...CustomBackground.args,
    bannerImageProps: Image.args?.bannerImageProps,
  },
};

export const WithContent: Story = {
  args: {
    ...CustomBackgroundAndImage.args,
    children: <div>10 Exhibits</div>,
  },
};

export const Selected: Story = {
  args: {
    ...WithContent.args,
    selected: true,
  },
};

export const LongTitle: Story = {
  args: {
    ...WithIcon.args,
    label:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium',
  },
};

export const EntitySkeleton: Story = {
  render: () => <EntityCardSkeleton />,
};

export const EntitySkeletonWithContent: Story = {
  render: () => (
    <EntityCardSkeleton>
      <Skeleton
        variant='text'
        style={{
          width: 'calc(var(--typescale-size-default-s) * 10',
          fontSize: 'var(--typescale-size-default-s)',
        }}
      />
    </EntityCardSkeleton>
  ),
};

export const CardListExample: Story = {
  render: () => (
    <CardList>
      <EntityCard
        CardHeaderIcon={<WidgetsOutlinedIcon />}
        label='Lorem ipsum dolor sit'
        onClick={onClick}
      />
      <EntityCard
        CardBannerProps={{
          style: customBackgroundStyle,
        }}
        CardHeaderIcon={<MemoryIcon />}
        label='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
        onClick={onClick}
      />
      <EntityCard label='Lorem ipsum dolor sit amet' onClick={onClick} />
      <EntityCard
        CardHeaderIcon={<WidgetsOutlinedIcon />}
        label='Lorem, ipsum dolor.'
        onClick={onClick}
      >
        <div>10 Exhibits</div>
      </EntityCard>
      <EntityCard
        bannerImageProps={{
          alt: 'Gumband logo',
          src: GumbandLogoSrcUrl,
          height: '50%',
          style: { maxWidth: '70%' },
        }}
        CardBannerProps={{
          style: customBackgroundStyle,
        }}
        CardHeaderIcon={<WidgetsOutlinedIcon />}
        label='Lorem ipsum dolor sit amet consectetur adipisicing elit'
        onClick={onClick}
      />
      <EntityCardSkeleton />
      <EntityCardSkeleton>
        <Skeleton
          variant='text'
          style={{
            width: 'calc(var(--typescale-size-default-s) * 10',
            fontSize: 'var(--typescale-size-default-s)',
          }}
        />
      </EntityCardSkeleton>
      <EntityCardSkeleton>
        <Skeleton
          variant='text'
          style={{
            width: 'calc(var(--typescale-size-default-s) * 10',
            fontSize: 'var(--typescale-size-default-s)',
          }}
        />
        <Skeleton
          variant='text'
          style={{
            width: 'calc(var(--typescale-size-default-s) * 10',
            fontSize: 'var(--typescale-size-default-s)',
          }}
        />
        <Skeleton
          variant='text'
          style={{
            width: 'calc(var(--typescale-size-default-s) * 10',
            fontSize: 'var(--typescale-size-default-s)',
          }}
        />
      </EntityCardSkeleton>
    </CardList>
  ),
};
