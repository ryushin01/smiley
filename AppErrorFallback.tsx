import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { FallbackProps } from 'react-error-boundary';


interface AEFProps extends FallbackProps {
  errorInfo: React.ErrorInfo | null;
}

const sliceErrorStack = (stackTrace = '', numLines = 10) => {
  const lines = stackTrace.split('\n');
  const firstNLines = lines.slice(0, numLines);
  const joinedLines = firstNLines.join('\n');
  return joinedLines;
};

export const AppErrorFallback = ({ error, errorInfo, resetErrorBoundary }: AEFProps) => {
  return (
    <Jumbotron>
      <Alert variant="danger">
        <h2>An Error Occurred</h2>
        <p>
          The application detected an error, and it's been reported to the application development team. You can try clicking
          "Reload the Page" to return to the page you were on previously.
        </p>
        <p>
          If the error keeps occurring, please file a bug report with the following details, and include any steps to reproduce the issue:
        </p>

        <Button onClick={resetErrorBoundary}>Reload the Page</Button>

        <h3>Error Details</h3>
        <h5>Message</h5>
        <pre>{error.message}</pre>
        <details>
          <summary>Expand to Show Error Stack Traces</summary>
          <h5>Stack Trace</h5>
          <pre>{sliceErrorStack(error.stack)}</pre>
          <h4>Component Stack</h4>
          <pre>{sliceErrorStack(errorInfo?.componentStack)}</pre>
        </details>
      </Alert>
    </Jumbotron>
  );
};