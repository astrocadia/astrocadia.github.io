import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../views/routes/helpers/stories/RouteWrapper';
import { CardList } from '../../common/CardList';
import '../../common/CardList/CardList.css';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';

const meta: Meta<typeof ProjectCard> = {
  title: 'Design System/Composite Components/ProjectCard',
  tags: ['autodocs'],
  component: ProjectCard,
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <ProjectCard
          projectId={1}
          exhibitCount={5}
          name='Lorem ipsum dolor sit'
        />
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};

export const LongTitle: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <ProjectCard
          projectId={1}
          exhibitCount={3}
          name='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
        />
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};

export const CardListExample: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <RouteWrapper>
        <CardList className='CardList CardList__workspaceProjects'>
          <ProjectCard
            projectId={1}
            exhibitCount={0}
            name='Lorem ipsum dolor sit'
          />
          <ProjectCard
            projectId={2}
            exhibitCount={1}
            name='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium'
          />
          <ProjectCard
            projectId={3}
            exhibitCount={3}
            name='Lorem ipsum dolor sit amet'
          />
          <ProjectCard
            projectId={4}
            exhibitCount={3}
            name='Lorem, ipsum dolor.'
          />
          <ProjectCard
            projectId={5}
            exhibitCount={4}
            name='Lorem ipsum dolor sit amet consectetur adipisicing elit'
          />
          <ProjectCardSkeleton />
        </CardList>
      </RouteWrapper>
    </ThemeProviderWrapper>
  ),
};
