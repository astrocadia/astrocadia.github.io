import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { AccordionDetails } from '../AccordionDetails';
import { AccordionSummary } from '../AccordionSummary';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Design System/Components/Accordion',
  tags: ['autodocs'],
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (props) => (
    <ThemeProviderWrapper>
      <Accordion {...props}>
        <AccordionSummary>Accordion Summary</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus a
          pellentesque sit amet porttitor eget. Metus vulputate eu scelerisque
          felis imperdiet. Nascetur ridiculus mus mauris vitae ultricies. Felis
          eget velit aliquet sagittis id consectetur purus ut faucibus. Tempus
          urna et pharetra pharetra. Sit amet volutpat consequat mauris nunc
          congue. Et tortor consequat id porta nibh venenatis cras sed. Aliquet
          eget sit amet tellus cras adipiscing enim. Enim nunc faucibus a
          pellentesque. Neque gravida in fermentum et sollicitudin ac orci.
          Adipiscing vitae proin sagittis nisl rhoncus. Tellus in metus
          vulputate eu scelerisque felis.
        </AccordionDetails>
      </Accordion>
    </ThemeProviderWrapper>
  ),
};
