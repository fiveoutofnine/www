import type { NextPage } from 'next';

import ErrorLayout from '@/components/layouts/error';

const Custom404Page: NextPage = () => {
  return <ErrorLayout statusCode={404} />;
};

export default Custom404Page;
