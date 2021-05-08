export type TextTypes = 'number' | 'body' | 'caption';

export type TextProps = {
  text: string;

  color?: string;
  type?: TextTypes;
  className?: string;
};
