import { type FunctionComponent, ReactNode } from 'react';
import Linkify, { Props as LinkifyProps } from 'react-linkify';
import cx from 'classnames';
import { LinkIcon } from '../icons';
import './LinkDecorator.css';

interface LinkDecoratorProps {
  children: ReactNode;
  className?: string;
}

export const LinkDecorator: FunctionComponent<LinkDecoratorProps> = ({
  children,
  className,
}) => {
  const componentDecorator: LinkifyProps['componentDecorator'] = (
    decoratedHref,
    decoratedText
  ) => {
    return (
      <a
        className={cx('LinkDecorator', className)}
        href={decoratedHref}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Link to ${decoratedText}`}
      >
        <LinkIcon aria-label='link icon' />
        <span className='LinkDecorator__text'>{decoratedText}</span>
      </a>
    );
  };

  return <Linkify componentDecorator={componentDecorator}>{children}</Linkify>;
};
