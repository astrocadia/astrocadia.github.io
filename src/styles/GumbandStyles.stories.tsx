import type { Meta, StoryObj } from '@storybook/react';
import { Palette } from './helpers/stories/Palette';
import { StyleWrapper } from './helpers/stories/StyleWrapper';
import { PaletteWrapper } from './helpers/stories/PaletteWrapper';

const meta: Meta = {
  title: 'Design System/Styles/Gumband Styles',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Typefaces: Story = {
  render: () => (
    <StyleWrapper>
      <div className='heading-1'>heading-1</div>
      <div className='heading-2'>heading-2</div>
      <div className='subheading-1'>subheading-1</div>
      <div className='body-1'>body-1</div>
      <div className='body-2'>body-2</div>
      <div className='caption'>caption</div>
    </StyleWrapper>
  ),
};

export const Colors: Story = {
  render: () => (
    <PaletteWrapper>
      <Palette name='typography-primary-color' />
      <Palette name='typography-secondary-color' />
      <Palette name='typography-disabled-color' />
      <Palette name='line-color' />
    </PaletteWrapper>
  ),
};

export const Effects: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '25px', flexDirection: 'column' }}>
      <div
        className='shadow-l'
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '5px',
          border: '1px solid #dadee3',
          borderRadius: '25px',
          maxWidth: '300px',
        }}
      >
        shadow-l
      </div>
      <div
        className='shadow-m-1'
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '5px',
          border: '1px solid #dadee3',
          borderRadius: '25px',
          maxWidth: '300px',
        }}
      >
        shadow-m-1
      </div>
    </div>
  ),
};
