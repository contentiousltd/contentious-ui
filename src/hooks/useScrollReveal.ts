import { useLayoutEffect, useEffect } from "react";

/**
 * Scroll-triggered fade-in for elements marked with [data-reveal].
 *
 * Call at the App level, passing the current route as a dependency
 * so the hook re-runs on navigation:
 *
 *   const [location] = useLocation(); // wouter, react-router, etc.
 *   useScrollReveal([location]);
 *
 * How it works:
 *   1. useLayoutEffect (before first paint) — elements below the fold
 *      receive .reveal-pending (opacity: 0). Above-fold elements are
 *      never hidden, so there is no flash of invisible content.
 *   2. useEffect (after paint) — an IntersectionObserver watches the
 *      hidden elements and removes .reveal-pending as they approach
 *      the viewport, triggering the CSS opacity transition.
 *
 * The consuming project must define the CSS transition:
 *   [data-reveal]                { transition: opacity 900ms ease; }
 *   [data-reveal].reveal-pending { opacity: 0; }
 */
export function useScrollReveal(deps: unknown[] = []) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      // Reset any previous reveal state from the last route.
      el.classList.remove("reveal-pending");
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal-pending");
      }
    });
  // deps intentionally spread — caller controls when this re-runs
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const pending = document.querySelectorAll<HTMLElement>(".reveal-pending");
    if (!pending.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay) || 0;
          setTimeout(() => el.classList.remove("reveal-pending"), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
    );

    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
