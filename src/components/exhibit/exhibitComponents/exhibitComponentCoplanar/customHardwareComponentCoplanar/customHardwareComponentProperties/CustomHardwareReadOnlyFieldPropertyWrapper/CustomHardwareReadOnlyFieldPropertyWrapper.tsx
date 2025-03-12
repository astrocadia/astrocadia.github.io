import type { FunctionComponent, ReactNode } from 'react';
import './CustomHardwareReadOnlyFieldPropertyWrapper.css';

export interface CustomHardwareReadOnlyFieldPropertyWrapperProps {
  propertyName: string;
  children: ReactNode;
}

export const CustomHardwareReadOnlyFieldPropertyWrapper: FunctionComponent<
  CustomHardwareReadOnlyFieldPropertyWrapperProps
> = ({ propertyName, children }) => {
  return (
    <div className='CustomHardwareReadOnlyFieldPropertyWrapper'>
      <div className='CustomHardwareReadOnlyFieldPropertyWrapper__label'>
        {propertyName}
      </div>
      <div className='CustomHardwareReadOnlyFieldPropertyWrapper__value'>
        {children}
      </div>
    </div>
  );
};
