import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
