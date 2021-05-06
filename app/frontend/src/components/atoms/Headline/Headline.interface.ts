export type HeadlineTypes = 'headline1' | 'headline2';

export type HeadlineProps = {
  text: string;

  type?: HeadlineTypes;
  className?: string;
};
