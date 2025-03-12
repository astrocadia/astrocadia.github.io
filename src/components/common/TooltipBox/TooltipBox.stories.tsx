/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { TooltipBox } from './TooltipBox';
import { ListTooltipContent } from '../ListTooltipContent';

const meta: Meta<typeof TooltipBox> = {
  title: 'Design System/Components/TooltipBox',
  tags: ['autodocs'],
  component: TooltipBox,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TooltipBox>;

export const Default: Story = {
  render: () => (
    <div style={{ height: '200px', width: '200px' }}>
      <TooltipBox
        caretX={230}
        caretY={50}
        drawDirection='right'
        tooltipLabel='Aug 23'
      >
        <ListTooltipContent
          tooltipData={[
            {
              datasetIndex: 1,
              dataset: {
                hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
                data: [],
                label: 'Demo 1',
              },
              label: 'Demo 1',
              chart: undefined as any,
              parsed: undefined as any,
              raw: 10.34,
              formattedValue: '10.34',
              dataIndex: 0,
              element: undefined as any,
            },
            {
              datasetIndex: 1,
              dataset: {
                hoverBackgroundColor: 'rgba(140, 215, 174, 1)',
                data: [],
                label: 'Demo 2',
              },
              formattedValue: '1763.28214',
              label: 'Demo 2',
              chart: undefined as any,
              parsed: undefined as any,
              raw: 176.28214,
              dataIndex: 0,
              element: undefined as any,
            },
          ]}
        />
      </TooltipBox>
    </div>
  ),
};
