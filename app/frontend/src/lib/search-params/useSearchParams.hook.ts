import { useHistory, useLocation } from 'react-router';

const parse = (value: string): string | number => {
  if (['true', 'false'].includes(value)) return JSON.parse(value);

  const parsed = parseInt(value);
  const onlyNumbers = /^\d+$/.test(value);

  return onlyNumbers ? parsed : value;
};

type Result = {
  toggle: (key: string, value: string) => void;
  isActive: (key: string, value: string) => boolean;
  has: (key: string) => boolean;
  get: <T>(key: string, isArray?: boolean) => T | null;
  set: (key: string, value: string) => void;
  delete: (key: string) => void;
  clear: () => void;
};

export const useSearchParams = (): Result => {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);

  return {
    toggle(key, value) {
      const values = params.getAll(key);

      if (values.includes(value)) {
        const filteredValues = values.filter((v) => v !== value);
        params.delete(key);
        for (const filteredValue of filteredValues) params.append(key, filteredValue);
      } else params.append(key, value);

      history.replace({
        search: `?${params.toString()}`,
      });
    },
    get<T>(key: string, isArray = false): T | null {
      const value = isArray ? params.getAll(key) : params.get(key);

      try {
        if (value === null) return null;

        if (isArray) return ((value as string[]).map(parse) as unknown) as T;

        return (parse(value as string) as unknown) as T;
      } catch (e) {
        return null;
      }
    },
    set(key, value) {
      params.set(key, value);
      history.replace({
        search: `?${params.toString()}`,
      });
    },
    delete(key) {
      params.delete(key);
      history.replace({
        search: `?${params.toString()}`,
      });
    },
    isActive(key, value) {
      const values = params.getAll(key);
      return values.includes(value);
    },
    has(key: string) {
      return params.has(key);
    },
    clear() {
      history.replace({
        search: '',
      });
    },
  };
};
