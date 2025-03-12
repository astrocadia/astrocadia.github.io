import { useEffect, useState } from 'react';

/**
 * Hook to have an interval in a component
 * The value of tick will be the time (as a Date object) of the most recent interval
 *
 * @param [intervalMS=10000] - how often (in ms) to update the current time
 */
export const useInterval = (intervalMS: number = 1000 * 10) => {
  const [tick, setTick] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(new Date());
    }, intervalMS);

    return () => {
      clearInterval(interval);
    };
  }, [intervalMS, setTick]);

  return tick;
};
