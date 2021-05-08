import { useCallback, useEffect, useState } from 'react';

export const useMediaQueries = <T>(queries: string[], values: T[], defaultValue: T) => {
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  const getValue = useCallback(() => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return values?.[index] || defaultValue;
  }, [defaultValue, mediaQueryLists, values]);

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler));
    return () => mediaQueryLists.forEach((mql) => mql.removeEventListener('change', handler));
  }, [getValue, mediaQueryLists]);

  return value;
};

export const useMediaQuery = <T>(query: string, value: T, defaultValue: T) =>
  useMediaQueries([query], [value], defaultValue);

export const useMediaMatch = (query: string) => useMediaQuery(query, true, false);
