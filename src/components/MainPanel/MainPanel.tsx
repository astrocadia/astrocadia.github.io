import cx from 'classnames';
import { useMemo, type FunctionComponent, type ReactNode } from 'react';
import Collapse from '@mui/material/Collapse';
import { isNil } from '../../utils/lang';
import { AppBreadcrumb } from '../AppBreadcrumb/AppBreadcrumb';
import { useMobileMediaQuery } from '../common/hooks/useMobileMediaQuery';
import './MainPanel.css';
import {
  HorizontalNavigationMenu,
  StandardNavigationMenu,
} from './MainPanelNavigation';
import { type NavItem } from './MainPanelNavigation/common/navigation';

interface MainPanelProps {
  exhibitId?: number;
  className?: string;
  children: ReactNode;
  projectId?: number;
  workspaceId?: number;
  navItems?: Array<NavItem>;
  selectedTabId?: string;
  coplanarContent?: ReactNode;
  onExited?: () => void;
  coplanarOpen?: boolean;
}

export const MainPanel: FunctionComponent<MainPanelProps> = ({
  exhibitId,
  className,
  children,
  projectId,
  workspaceId,
  navItems,
  selectedTabId,
  coplanarContent,
  onExited,
  coplanarOpen,
}) => {
  const mobile = useMobileMediaQuery();

  const navigationBackButtonEntityProps = useMemo(() => {
    if (mobile) {
      return undefined;
    }

    if (!isNil(exhibitId) && !isNil(projectId)) {
      return { projectId };
    }

    if (!isNil(projectId) && !isNil(workspaceId)) {
      return { workspaceId };
    }

    return undefined;
  }, [exhibitId, mobile, projectId, workspaceId]);

  return (
    <div className={cx('MainPanel', className)}>
      <AppBreadcrumb
        workspaceId={workspaceId}
        projectId={projectId}
        exhibitId={exhibitId}
      />
      <div
        className={cx('MainPanel__contentWrapper', {
          MainPanel__contentWrapper_withMenu: navItems?.length && !mobile,
          MainPanel__contentWrapper_withoutMenu: !navItems?.length || mobile,
          MainPanel__contentWrapper_mobile: mobile,
        })}
      >
        {navItems?.length && !mobile && (
          <nav role='navigation' className='MainPanel__menu'>
            <StandardNavigationMenu
              NavigationBackButtonEntityProps={navigationBackButtonEntityProps}
              navItems={navItems}
              selectedId={selectedTabId}
            />
          </nav>
        )}
        <main role='main' className='MainPanel__sectionWrapper'>
          <section className='MainPanel__mainContent'>{children}</section>
          {!mobile && (
            <Collapse
              className='MainPanel__collapsableSectionWrapper'
              in={coplanarOpen}
              orientation='horizontal'
              easing={{
                enter: 'ease-out',
                exit: 'ease-in-out',
              }}
              timeout={350}
              onExited={onExited}
            >
              <section className='MainPanel__coplanarContent'>
                {coplanarContent}
              </section>
            </Collapse>
          )}
          {mobile && coplanarOpen && (
            <section className='MainPanel__coplanarContentMobile'>
              {coplanarContent}
            </section>
          )}
        </main>
      </div>
      {navItems && navItems.length > 1 && mobile && (
        <nav role='navigation' className='MainPanel__menuMobile'>
          <HorizontalNavigationMenu
            navItems={navItems}
            selectedId={selectedTabId}
          />
        </nav>
      )}
    </div>
  );
};
