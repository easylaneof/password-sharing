export type TimeInputProps = {
  hours: string;
  minutes: string;
  setHours: (h: string) => void;
  setMinutes: (m: string) => void;
  label: string;

  className?: string;
  error?: string;
};
