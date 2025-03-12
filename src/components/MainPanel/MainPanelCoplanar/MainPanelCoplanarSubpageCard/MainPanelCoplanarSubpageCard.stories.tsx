import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { Badge } from '../../../common/badges';
import { CheckIcon, SoftwareComponentIcon } from '../../../common/icons';
import { MainPanelCoplanarSubpageCard } from './MainPanelCoplanarSubpageCard';

const meta: Meta<typeof MainPanelCoplanarSubpageCard> = {
  title:
    'Design System/Composite Components/MainPanelCoplanar/MainPanelCoplanarSubpageCard',
  tags: ['autodocs'],
  component: MainPanelCoplanarSubpageCard,
  decorators: [
    (Story) => {
      return (
        <ThemeProviderWrapper>
          <div
            style={{
              backgroundColor: 'white',
              padding: '16px',
            }}
          >
            <Story />
          </div>
        </ThemeProviderWrapper>
      );
    },
  ],
  args: {
    badgeProps: { Icon: SoftwareComponentIcon },
    title: 'Subpage Title',
    subtitle: 'Description',
    // Since Storybook will add its own onClick handler, we need to set it to undefined
    onClick: undefined,
  },
  parameters: {
    design: {
      type: 'figma',
      link: 'https://www.figma.com/design/0jimeeoOUb0jnANEyfRvW4/Component-Details?m=auto&node-id=624-288048',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainPanelCoplanarSubpageCard>;

export const Default: Story = {};
export const NoSubtitle: Story = {
  args: {
    subtitle: undefined,
  },
};
export const NoBadge: Story = {
  args: {
    badgeProps: undefined,
  },
};

export const LongTitle: Story = {
  args: {
    title:
      'Subpage Title with a long title that will cause the text to create an ellipses if I do it right',
  },
};

export const LongDescription: Story = {
  args: {
    subtitle: `Once upon a time, in the chaotic world of office supplies, there lived a gumband named Stretch. Stretch was a unique little gumband, known for his vibrant colors and incredible elasticity. He spent his days wrapped around stacks of papers, securing pens together, and occasionally launching paperclips in a spontaneous game of office warfare. But despite his busy schedule, Stretch felt a void in his rubbery little heart. He longed for love.

    One sunny morning, as the office bustled with the usual Monday madness, Stretch found himself in a precarious position. He was tasked with holding together a particularly unruly stack of documents for Mr. Thompson, the office manager. As Stretch strained to keep the papers in place, he noticed a beautiful, glossy, pink paperclip sitting elegantly on the edge of the desk. Her name was Clippy, and she was the talk of the office with her sleek curves and shiny exterior.
    
    Stretch felt a twang of excitement. Could Clippy be the one to fill the void in his elastic heart? He had to find a way to get her attention. Summoning all his courage, Stretch decided to make his move during the lunch break when the office would be relatively quiet.
    
    As the clock struck noon, Stretch saw his opportunity. Mr. Thompson had left for lunch, leaving his desk unattended. Stretch wiggled free from the stack of papers and bounced over to Clippy. She sparkled under the fluorescent lights, and Stretch felt a flutter of nerves. 
    
    "Hi there," he began, trying to sound casual but failing miserably as his voice squeaked.
    
    Clippy looked up, surprised. "Oh, hello. Aren't you the gumband from Mr. Thompson's desk?"
    
    "Yes, yes, I am!" Stretch replied, a little too eagerly. "My name is Stretch. I couldn't help but notice you from across the desk. You're the most beautiful paperclip I've ever seen."
    
    Clippy blushed a little, her pink hue deepening. "Why, thank you, Stretch. That's very sweet of you."
    
    Emboldened by her response, Stretch continued, "Would you like to, um, maybe get tangled up sometime? I mean, you know, metaphorically speaking. I could show you around the office, introduce you to the other supplies."
    
    Clippy giggled, a delightful tinkling sound. "I'd like that, Stretch. How about tomorrow during lunch break?"
    
    Stretch could hardly contain his excitement. "It's a date!"
    
    The rest of the day passed in a blur for Stretch. He could hardly wait for lunchtime the next day. When the moment finally arrived, Stretch bounded over to Clippy. They explored the office together, meeting the quirky stapler, the ever-busy highlighters, and even the mysterious paper shredder who spoke in riddles.
    
    As they spent more time together, Stretch and Clippy discovered they had a lot in common. They both loved organizing chaos, enjoyed the quiet after office hours, and had a knack for finding humor in the mundane.
    
    One day, as they were perched on the edge of the desk watching the sunset through the office window, Stretch turned to Clippy. "You know, Clippy, I think I found what I was looking for."
    
    Clippy smiled. "And what’s that, Stretch?"
    
    "Love," Stretch said softly. "With you."
    
    Clippy's eyes twinkled as she replied, "I feel the same way, Stretch."
    
    From that day on, Stretch and Clippy were inseparable. They faced the challenges of office life together, always finding joy in each other’s company. And though they were just a gumband and a paperclip, they proved that love knows no bounds, not even in the world of office supplies.`,
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert('Clicked!');
    },
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <div
        style={{ backgroundColor: 'blue', height: '100px', width: '100%' }}
      />
    ),
  },
};

export const WithHeaderAction: Story = {
  args: {
    headerAction: <Badge Icon={CheckIcon} />,
  },
};

export const WithHeaderActionAndChildren: Story = {
  args: {
    headerAction: <Badge Icon={CheckIcon} />,
    children: (
      <div
        style={{ backgroundColor: 'blue', height: '100px', width: '100%' }}
      />
    ),
  },
};

export const Siblings: Story = {
  render: (props) => {
    return (
      <>
        <MainPanelCoplanarSubpageCard
          {...props}
          headerAction={<Badge Icon={CheckIcon} />}
        />
        <MainPanelCoplanarSubpageCard {...props}>
          <div
            style={{ backgroundColor: 'blue', height: '100px', width: '100%' }}
          />
        </MainPanelCoplanarSubpageCard>
        <MainPanelCoplanarSubpageCard {...props} />
      </>
    );
  },
};
