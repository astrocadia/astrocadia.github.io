import { Card as MUICard, type CardProps as MUICardProps } from '@mui/material';
import { type ForwardedRef, forwardRef, type FunctionComponent } from 'react';

export type CardProps = Omit<
  MUICardProps,
  'elevation' | 'raised' | 'ref' | 'square' | 'sx' | 'variant'
>;

export const Card: FunctionComponent<CardProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement> | null) => (
    <MUICard ref={ref} elevation={0} raised={false} square={false} {...props} />
  )
);

Card.displayName = 'Card';
