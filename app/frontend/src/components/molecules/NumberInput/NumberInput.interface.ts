export type NumberInputProps = {
  value: number;
  setValue: (h: number) => void;
  label: string;
  max: number;

  min?: number;
  className?: string;
  error?: string;
};
