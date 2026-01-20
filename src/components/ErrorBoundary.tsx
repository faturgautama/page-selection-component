import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch rendering errors
 * Ensures the component displays a fallback UI if rendering fails
 * Maintains functionality even when styles fail to load
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Component rendering error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Fallback UI with minimal inline styles
      // This ensures the component remains visible even if CSS fails
      return (
        <div
          style={{
            width: '370px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: '#fff',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            color: '#333',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
            Component Error
          </h3>
          <p style={{ margin: '0 0 10px 0' }}>
            The page selection component encountered an error and cannot be displayed.
          </p>
          <details style={{ fontSize: '12px', color: '#666' }}>
            <summary style={{ cursor: 'pointer', marginBottom: '5px' }}>
              Error details
            </summary>
            <pre
              style={{
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '11px',
              }}
            >
              {this.state.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
