import { RefObject, useEffect } from 'react';

type ObserverCallback = (entry: IntersectionObserverEntry) => void;

export const useIntersectionObserver = (
  refs: RefObject<Element> | Array<RefObject<Element>>,
  options: IntersectionObserverInit,
  callback: ObserverCallback
): void => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, options);

    const elements = Array.isArray(refs)
      ? refs.map((ref) => ref.current)
      : [refs.current];

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [refs, options, callback]);
};
