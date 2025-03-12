import type { Meta, StoryObj } from '@storybook/react';
import { Palette } from './helpers/stories/Palette';
import { PaletteWrapper } from './helpers/stories/PaletteWrapper';

const meta: Meta = {
  title: 'Design System/Styles/Gumband Palette',
};

export default meta;
type Story = StoryObj;

export const Blue: Story = {
  render: () => (
    <PaletteWrapper>
      <Palette name='base-color-blue-800' />
      <Palette name='base-color-blue-700' />
      <Palette name='base-color-blue-600' />
      <Palette name='base-color-blue-500' />
      <Palette name='base-color-blue-400' />
      <Palette name='base-color-blue-300' />
      <Palette name='base-color-blue-200' />
      <Palette name='base-color-blue-100' />
    </PaletteWrapper>
  ),
};

export const Brand: Story = {
  render: () => (
    <PaletteWrapper>
      <Palette name='base-color-brand-primary' />
    </PaletteWrapper>
  ),
};

export const Green: Story = {
  render: () => (
    <PaletteWrapper>
      <Palette name='base-color-green-800' />
      <Palette name='base-color-green-700' />
      <Palette name='base-color-green-600' />
      <Palette name='base-color-green-500' />
      <Palette name='base-color-green-400' />
      <Palette name='base-color-green-300' />
      <Palette name='base-color-green-200' />
      <Palette name='base-color-green-100' />
    </PaletteWrapper>
  ),
};

export const Neutral: Story = {
  render: () => (
    <PaletteWrapper>
      <Palette name='base-color-neutral-1000' />
      <Palette name='base-color-neutral-900' />
      <Palette name='base-color-neutral-800' />
      <Palette name='base-color-neutral-700' />
      <Palette name='base-color-neutral-600' />
      <Palette name='base-color-neutral-500' />
      <Palette name='base-color-neutral-400' />
      <Palette name='base-color-neutral-300' />
      <Palette name='base-color-neutral-200' />
      <Palette name='base-color-neutral-100' />
      <Palette name='base-color-neutral-0' />
    </PaletteWrapper>
  ),
};

export const Orange: Story = {
  render: () => (
    <PaletteWrapper>
      <Palette name='base-color-orange-800' />
      <Palette name='base-color-orange-700' />
      <Palette name='base-color-orange-600' />
      <Palette name='base-color-orange-500' />
      <Palette name='base-color-orange-400' />
      <Palette name='base-color-orange-300' />
      <Palette name='base-color-orange-200' />
      <Palette name='base-color-orange-100' />
    </PaletteWrapper>
  ),
};

export const Purple: Story = {
  render: () => (
    <PaletteWrapper>
      <Palette name='base-color-purple-800' />
      <Palette name='base-color-purple-700' />
      <Palette name='base-color-purple-600' />
      <Palette name='base-color-purple-500' />
      <Palette name='base-color-purple-400' />
      <Palette name='base-color-purple-300' />
      <Palette name='base-color-purple-200' />
      <Palette name='base-color-purple-100' />
    </PaletteWrapper>
  ),
};

export const Red: Story = {
  render: () => (
    <PaletteWrapper>
      <Palette name='base-color-red-800' />
      <Palette name='base-color-red-700' />
      <Palette name='base-color-red-600' />
      <Palette name='base-color-red-500' />
      <Palette name='base-color-red-400' />
      <Palette name='base-color-red-300' />
      <Palette name='base-color-red-200' />
      <Palette name='base-color-red-100' />
    </PaletteWrapper>
  ),
};

export const Yellow: Story = {
  render: () => (
    <PaletteWrapper>
      <Palette name='base-color-yellow-800' />
      <Palette name='base-color-yellow-700' />
      <Palette name='base-color-yellow-600' />
      <Palette name='base-color-yellow-500' />
      <Palette name='base-color-yellow-400' />
      <Palette name='base-color-yellow-300' />
      <Palette name='base-color-yellow-200' />
      <Palette name='base-color-yellow-100' />
    </PaletteWrapper>
  ),
};
