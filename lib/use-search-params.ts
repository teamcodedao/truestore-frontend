import {useEffect, useState} from 'react';

export function useSearchParams() {
  const [search, setSearch] = useState(() => {
    try {
      return new URLSearchParams(window.location.search);
    } catch {
      return new URLSearchParams();
    }
  });

  useEffect(() => {
    (() => {
      const oldPushState = history.pushState;
      history.pushState = function pushState(...args) {
        const ret = oldPushState.apply(this, args);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      };

      const oldReplaceState = history.replaceState;
      history.replaceState = function replaceState(...args) {
        const ret = oldReplaceState.apply(this, args);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      };

      window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'));
      });
    })();
    window.addEventListener('locationchange', function () {
      setSearch(new URLSearchParams(window.location.search));
    });
  }, []);

  return search;
}
