import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleWrapper } from './StyleWrapper';

interface PaletteProps {
  name: string;
}

export const Palette: FunctionComponent<PaletteProps> = ({ name }) => {
  const [color, setColor] = useState('');
  const styleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (styleRef.current) {
      const hex = getComputedStyle(styleRef.current)
        .backgroundColor.match(/\d+/gm)
        ?.map((numberAsString) => Number(numberAsString).toString(16))
        .join('');
      setColor(`#${hex}`);
    }
  }, []);

  return (
    <StyleWrapper>
      <div
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '5px',
          border: '1px solid #dadee3',
          borderRadius: '25px',
        }}
      >
        <div
          ref={styleRef}
          style={{
            height: '25px',
            width: '25px',
            border: '1px solid #dadee3',
            borderRadius: '50%',
            backgroundColor: `var(--${name})`,
            flexShrink: 0,
          }}
        />
        <div style={{ flexGrow: 1 }}>{name}</div>
        <div>{color}</div>
      </div>
    </StyleWrapper>
  );
};
