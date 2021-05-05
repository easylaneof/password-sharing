export type TextTypes = 'text' | 'caption';

export type TextProps = {
  text: string;

  color?: string;
  type?: TextTypes;
  className?: string;
};
