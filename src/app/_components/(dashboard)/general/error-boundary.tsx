'use client';
import React, { Component } from 'react';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service console
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback text passed as a prop
      return (
        <h1
          className={clsx(
            contentFont.className,
            'text-[20px] font-bold text-center',
          )}>
          {this.props.fallbackText || 'Something went wrong.'}
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

