export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  // ReactErrorBoundary doesn't pass in the component stack trace.
  // Capture that ourselves to pass down via render props
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);

  return (
    <React.Fragment>
      <ErrorBoundary
        onError={(error, info) => {
          if (process.env.NODE_ENV === 'production') {
            uploadErrorDetails(error, info);
          }
          setErrorInfo(info);
        }}
        fallbackRender={fallbackProps => {
          return <AppErrorFallback {...fallbackProps} errorInfo={errorInfo} />;
        }}
      >
        <Component {...pageProps} />;
      </ErrorBoundary>
    </React.Fragment>
  );
}