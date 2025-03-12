import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from '../BreadcrumbItem';
import { RouteWrapper } from '../../../views/routes/helpers/stories/RouteWrapper';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Michael Pflueger Portfolio/Breadcrumbs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Breadcrumbs for displaying a custom setting hierchy',
      },
    },
  },
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: () => {
    const breadcrumbs: Array<string> = ['All', 'Account', 'Settings'];

    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };

    return (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{ backgroundColor: 'var(--background-workspace-color)' }}>
            {breadcrumbs && breadcrumbs.length !== 0 && (
              <Breadcrumbs>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem
                    key={breadcrumb}
                    label={breadcrumb}
                    onClick={
                      index === breadcrumbs.length - 1
                        ? undefined
                        : () => {
                            onClick();
                          }
                    }
                  />
                ))}
              </Breadcrumbs>
            )}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>
    );
  },
};

export const OneLevel: Story = {
  render: () => {
    const breadcrumbs: Array<string> = ['All', 'Account'];

    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };

    return (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{ backgroundColor: 'var(--background-workspace-color)' }}>
            {breadcrumbs && breadcrumbs.length !== 0 && (
              <Breadcrumbs>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem
                    key={breadcrumb}
                    label={breadcrumb}
                    onClick={
                      index === breadcrumbs.length - 1
                        ? undefined
                        : () => {
                            onClick();
                          }
                    }
                  />
                ))}
              </Breadcrumbs>
            )}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>
    );
  },
};

export const ThreeLevel: Story = {
  render: () => {
    const breadcrumbs: Array<string> = [
      'All',
      'Account',
      'Settings',
      'Security & Privacy',
    ];

    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };

    return (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{ backgroundColor: 'var(--background-workspace-color)' }}>
            {breadcrumbs && breadcrumbs.length !== 0 && (
              <Breadcrumbs maxItems={3} itemsAfterCollapse={2}>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem
                    key={breadcrumb}
                    label={breadcrumb}
                    onClick={
                      index === breadcrumbs.length - 1
                        ? undefined
                        : () => {
                            onClick();
                          }
                    }
                  />
                ))}
              </Breadcrumbs>
            )}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>
    );
  },
};

export const ManyLevel: Story = {
  render: () => {
    const breadcrumbs: Array<string> = [
      'All',
      'Kinds',
      'Of',
      'Different',
      'Breadcrumbs',
      'That',
      'Are',
      'Displayed',
      'In',
      'The',
      'Breadcrumbs',
      'Component',
    ];

    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };

    return (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{ backgroundColor: 'var(--background-workspace-color)' }}>
            {breadcrumbs && breadcrumbs.length !== 0 && (
              <Breadcrumbs maxItems={3} itemsAfterCollapse={2}>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem
                    key={breadcrumb}
                    label={breadcrumb}
                    onClick={
                      index === breadcrumbs.length - 1
                        ? undefined
                        : () => {
                            onClick();
                          }
                    }
                  />
                ))}
              </Breadcrumbs>
            )}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>
    );
  },
};

export const LongBreadcrumbs: Story = {
  render: () => {
    const breadcrumbs: Array<string> = [
      'This is a long breadcrumb',
      'Here is another very long breadcrumb',
      'This is another long breadcrumb',
      'Thisisyetanotherlongverylongbreadcrumb',
    ];

    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };

    return (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{ backgroundColor: 'var(--background-workspace-color)' }}>
            {breadcrumbs && breadcrumbs.length !== 0 && (
              <Breadcrumbs maxItems={3} itemsAfterCollapse={2}>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem
                    key={breadcrumb}
                    label={breadcrumb}
                    onClick={
                      index === breadcrumbs.length - 1
                        ? undefined
                        : () => {
                            onClick();
                          }
                    }
                  />
                ))}
              </Breadcrumbs>
            )}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const breadcrumbs: Array<string> = [
      'Disabling',
      'expand does not seem',
      'to be possible for',
      'MUI',
      'Breadcrumbs',
    ];
    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };

    return (
      <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{ backgroundColor: 'var(--background-workspace-color)' }}>
            {breadcrumbs && breadcrumbs.length !== 0 && (
              <Breadcrumbs disabled maxItems={3} itemsAfterCollapse={2}>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem
                    label={breadcrumb}
                    key={breadcrumb}
                    onClick={
                      index === breadcrumbs.length - 1
                        ? undefined
                        : () => {
                            onClick();
                          }
                    }
                  />
                ))}
              </Breadcrumbs>
            )}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>
    );
  },
};
