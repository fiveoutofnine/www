import ContainerLayout from '@/components/layouts/container';
import { Button } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ErrorLayoutProps = {
  statusCode?: number;
  children?: React.ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ statusCode, children }) => {
  const header = statusCode === 404 ? 'PageNotFound()' : `InternalServerError(${statusCode})`;
  const message = statusCode === 404 ? '0x924C0FAD' : '0x2145B8F0';

  return (
    <ContainerLayout className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-medium text-gray-12 md:text-5xl">
        <pre className="rounded-lg border border-gray-6 bg-gray-4 p-2 md:rounded-xl md:p-3">
          {header}
        </pre>
      </h1>
      <a
        className="mt-2 text-center font-mono text-base font-medium text-red-9 hover:underline md:mt-4 md:text-xl"
        href={`https://sig.eth.samczsun.com/api/v1/signatures?all=true&function=${message}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        FAIL. REASON: {message}
      </a>
      <Button href="/" size="md" variant="secondary" intent="info" className="mt-6">
        Return home
      </Button>
      {children}
    </ContainerLayout>
  );
};

export default ErrorLayout;
