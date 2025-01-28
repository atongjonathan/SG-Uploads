import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }; // Save error to state
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    // Optionally log the error to an external service
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  copyErrorToClipboard = () => {
    const { error, errorInfo } = this.state;
    const errorText = `Error: ${error.toString()}\n\nStack trace:\n${errorInfo.componentStack}`;
    navigator.clipboard.writeText(errorText).then(() => {
      alert("Error copied to clipboard!");
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error && this.state.error.toString()}</pre>
          <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          <button onClick={this.copyErrorToClipboard}>Copy Error</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
