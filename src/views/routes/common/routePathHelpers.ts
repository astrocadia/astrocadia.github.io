import { type ReactNode } from 'react';

export interface ProtectedRouteProps {
  children?: ReactNode;
}

export type BaseLinkGenerationParams = {
  [paramName: string]: string | number | boolean | undefined;
};
