import { type FunctionComponent } from 'react';
import { ImgHTMLAttributes } from 'react';
import './ComponentDetailsHeaderMainImage.css';

export interface ComponentDetailsHeaderMainImageProps {
  imageProps: ImgHTMLAttributes<HTMLImageElement>;
}

export const ComponentDetailsHeaderMainImage: FunctionComponent<
  ComponentDetailsHeaderMainImageProps
> = ({ imageProps }) => {
  return (
    <div className='ComponentDetailsHeaderMainImage'>
      {!!imageProps && (
        <img alt={imageProps.alt || 'Component Detail Image'} {...imageProps} />
      )}
    </div>
  );
};
