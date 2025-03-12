import { FunctionComponent, ReactNode } from 'react';

export const PaletteWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
    {children}
  </div>
);
