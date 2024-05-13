import DesignNavBar from './(components)/nav-bar';

import ContainerLayout from '@/components/layouts/container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContainerLayout className="relative flex max-w-[90rem] flex-col space-x-0 px-0 pb-6 pt-0 md:flex-row md:space-x-16">
      <DesignNavBar />
      <article className="prose prose-gray max-w-none grow px-4 dark:prose-invert md:px-0">
        {children}
        <hr className="mb-6 mt-6 w-full rounded-full border-gray-6 md:mt-12" />
      </article>
    </ContainerLayout>
  );
}
