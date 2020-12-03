import React, { Component } from 'react';

import './error-boundary.styles.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super();
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorImageOverlay">
          <div className="errorImageContainer" />
          <h2 className="errorImageText">Sorry this page is broken</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
