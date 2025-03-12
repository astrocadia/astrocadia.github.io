import type { FunctionComponent, ReactNode } from 'react';
import '../../base.css';

interface Props {
  children: ReactNode;
}

export const StyleWrapper: FunctionComponent<Props> = ({ children }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{children}</>
);
