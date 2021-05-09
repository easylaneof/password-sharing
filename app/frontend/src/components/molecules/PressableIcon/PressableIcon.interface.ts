export type PressableIconVariants = 'generate' | 'share';

export type PressableIconProps = {
  icon: PressableIconVariants;
  onClick: () => void;

  disabled?: boolean;
  className?: string;
};
