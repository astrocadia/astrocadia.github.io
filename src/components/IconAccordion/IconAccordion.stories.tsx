import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { DetailTable, type DetailTableProps } from '../DetailTable';
import { IconAccordionDetails } from '../IconAccordionDetails';
import { Badge } from '../common/badges';
import { ExhibitComponentIcon } from '../common/icons';
import { CONNECTED_STATUS, ConnectedIcon } from '../icons/ConnectedIcon';
import { IconAccordion } from './IconAccordion';

const meta: Meta<typeof IconAccordion> = {
  title: 'Design System/Composite Components/IconAccordion',
  tags: ['autodocs'],
  component: IconAccordion,
};

export default meta;
type Story = StoryObj<typeof IconAccordion>;

const defaultData: DetailTableProps['data'] = [
  {
    label: 'IP',
    value: '20.30.30.10',
  },
  {
    label: 'MAC',
    value: '04:210:20:3b:92',
  },
  {
    label: 'Version',
    value: '48',
  },
  {
    label: 'Voltage',
    value: '4.204 V',
  },
  {
    label: 'Temperature',
    value: '39.028 C',
  },
  {
    label: 'Created',
    value: '2021-08-12 12:00:00 -0400',
  },
];

const content = (
  <IconAccordionDetails>
    <DetailTable data={defaultData} />
  </IconAccordionDetails>
);

export const Default: Story = {
  render: ({
    icon = <ConnectedIcon status={CONNECTED_STATUS.CONNECTED} />,
    label = 'Accordion Label',
    ...props
  }) => (
    <ThemeProviderWrapper>
      <IconAccordion icon={icon} label={label} {...props}>
        {content}
      </IconAccordion>
    </ThemeProviderWrapper>
  ),
};

export const NoContents: Story = {
  render: ({
    icon = <ConnectedIcon status={CONNECTED_STATUS.CONNECTED} />,
    label = 'Accordion Label',
    ...props
  }) => (
    <ThemeProviderWrapper>
      <IconAccordion icon={icon} label={label} {...props} />
    </ThemeProviderWrapper>
  ),
};

export const Multiple: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <IconAccordion
        {...props}
        icon={<ConnectedIcon status={CONNECTED_STATUS.DISCONNECTED} />}
        label='Accordion Label 1'
      >
        {content}
      </IconAccordion>
      <IconAccordion
        {...props}
        icon={<ConnectedIcon status={CONNECTED_STATUS.CONNECTED} />}
        label='Accordion Label 2'
      >
        {content}
      </IconAccordion>
      <IconAccordion
        {...props}
        icon={<Badge Icon={ExhibitComponentIcon} />}
        label='Accordion Label 3'
      >
        {content}
      </IconAccordion>
      <IconAccordion
        {...props}
        icon={<Badge Icon={ExhibitComponentIcon} />}
        label='Accordion Label No Content'
      />
      <IconAccordion
        {...props}
        icon={<Badge Icon={ExhibitComponentIcon} />}
        label='Accordion Label 3'
      >
        {content}
      </IconAccordion>
    </ThemeProviderWrapper>
  ),
};
