export type TextTypes = 'body' | 'caption';

export type TextProps = {
  text: string;

  color?: string;
  type?: TextTypes;
  className?: string;
  currentColor?: boolean;
};
