export type HeadlineTypes = 'h1' | 'h2' | 'h3';

export type HeadlineProps = {
  text: string;

  type?: HeadlineTypes;
  className?: string;
  asSpan?: boolean;
};
