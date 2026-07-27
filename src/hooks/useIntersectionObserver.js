import { useEffect, useRef } from 'react';

const useIntersectionObserver = (options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Stop observing once revealed
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = elementsRef.current;
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [options.threshold, options.rootMargin]);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return { addToRefs };
};

export default useIntersectionObserver;
