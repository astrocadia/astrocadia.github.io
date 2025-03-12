import {
  FunctionComponent,
  Children,
  cloneElement,
  isValidElement,
  Attributes,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import cx from 'classnames';
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
} from '@mui/material';
import { ChevronIcon } from '../icons';
import './Breadcrumbs.css';

const MAX_BREADCRUMBS = 3 as const;

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  disabled?: boolean;
}

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({
  className,
  children,
  disabled,
  ...props
}) => {
  // this is to pass the disabled prop from Breadcrumbs to all children
  const modifiedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { disabled } as Attributes);
    }
    return child;
  });

  // set up a ref to the breadcrumbs container to auto scroll right
  const breadcrumbsRef = useRef<HTMLElement>(null);

  const scrollRightWhenOverflowed = useCallback(
    (breadcrumbsRefCurrent: Element) => {
      if (
        breadcrumbsRefCurrent.scrollWidth > breadcrumbsRefCurrent.clientWidth
      ) {
        breadcrumbsRefCurrent.scroll({
          behavior: 'smooth',
          left: breadcrumbsRefCurrent.scrollWidth,
        });
      }
    },
    []
  );

  const onExpandClick = useCallback(() => {
    const breadcrumbsRefCurrent = breadcrumbsRef.current?.firstElementChild;
    if (breadcrumbsRefCurrent) {
      setTimeout(() => scrollRightWhenOverflowed(breadcrumbsRefCurrent), 100);
    }
  }, [scrollRightWhenOverflowed]);

  useEffect(() => {
    // MuiBreadcrumbs wraps the children under a top level div
    const breadcrumbsRefCurrent = breadcrumbsRef.current?.firstElementChild;
    if (breadcrumbsRefCurrent) {
      // scroll right on initial render if overflowed
      setTimeout(() => scrollRightWhenOverflowed(breadcrumbsRefCurrent), 100);
    }
  }, [scrollRightWhenOverflowed]);

  return (
    <MuiBreadcrumbs
      className={cx('Breadcrumbs', className, {
        Breadcrumbs__disabled: disabled,
      })}
      separator={<ChevronIcon />}
      {...props}
      ref={breadcrumbsRef}
      slotProps={{
        collapsedIcon: {
          onClick: onExpandClick,
        },
      }}
      maxItems={props.maxItems ?? MAX_BREADCRUMBS}
    >
      {modifiedChildren}
    </MuiBreadcrumbs>
  );
};
