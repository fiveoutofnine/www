import ChessFeature from './(components)/works/chess';

import ContainerLayout from '@/components/layouts/container';
import FiveoutofnineHeader from '@/components/pages/home/header';

export default function Page() {
  return (
    <ContainerLayout className="flex flex-col space-y-4">
      <FiveoutofnineHeader />
      {/* Featured works. */}
      <div className="grid grid-cols-2 gap-4 min-[560px]:grid-cols-4 min-[960px]:grid-cols-6">
        <ChessFeature />
      </div>
    </ContainerLayout>
  );
}
