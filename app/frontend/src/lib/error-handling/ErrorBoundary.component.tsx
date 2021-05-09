import React from 'react';

type Props = {
  fallback: React.ReactNode;
  children: React.ReactNode;
  onError?: (e: Error) => void;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error) {
    const { props } = this;

    if (props.onError) {
      props.onError(error);
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    const {
      state: { hasError },
      props: { fallback, children },
    } = this;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}
