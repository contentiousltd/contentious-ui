import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="c-error">
          <div className="c-error__inner">
            <div className="c-error__heading-group">
              <h1 className="c-error__heading">Something went wrong</h1>
              <p className="c-error__message">
                An unexpected error occurred. You can try recovering or return to the home page.
              </p>
            </div>
            {this.state.error && (
              <pre className="c-error__detail">
                {this.state.error.message}
              </pre>
            )}
            <div className="c-error__actions">
              <button onClick={this.handleReset} className="c-error__btn">
                Try again
              </button>
              <a href="/" className="c-error__btn c-error__btn--primary">
                Go to home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
