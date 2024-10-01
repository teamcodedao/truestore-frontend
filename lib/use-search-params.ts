import {useEffect, useState} from 'react';

function createRegister() {
  let hasBeenCalled = false;

  return () => {
    if (hasBeenCalled) {
      return;
    }
    hasBeenCalled = true;
    if (typeof window === 'undefined') {
      return;
    }
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
  };
}

const register = createRegister();
register();

export function useSearchParams() {
  const [search, setSearch] = useState(() => {
    try {
      return new URLSearchParams(window.location.search);
    } catch {
      return new URLSearchParams();
    }
  });

  useEffect(() => {
    function handleLocationchange() {
      setSearch(new URLSearchParams(window.location.search));
    }
    window.addEventListener('locationchange', handleLocationchange);
    return () => {
      window.removeEventListener('locationchange', handleLocationchange);
    };
  }, []);

  return search;
}
