import type { NextPage, NextPageContext } from 'next';

import ErrorLayout from '@/components/layouts/error';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ErrorPageProps = {
  statusCode?: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  return <ErrorLayout statusCode={statusCode} />;
};

// -----------------------------------------------------------------------------
// Get initial props
// -----------------------------------------------------------------------------

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
