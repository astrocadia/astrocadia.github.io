import humanizeDuration from 'humanize-duration';

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'day',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
});

export const humanize = (seconds: number): string => {
  const rawHumanized = shortEnglishHumanizer(Math.round(seconds * 1000), {
    delimiter: '_',
    spacer: '-',
  });

  const splitHumanized = rawHumanized.split('_');

  let finalHumanized = '';
  splitHumanized.forEach((grain) => {
    const [value, unit] = grain.split('-');
    finalHumanized += ` ${value.length === 1 ? '0' : ''}${value}${unit}`;
  });

  return finalHumanized.trim();
};
