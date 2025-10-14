import FiveoutofnineHeader from './(components)/header';
import {
  BytebeatFeature,
  ChessFeature,
  ColormapRegistryFeature,
  Mp4Feature,
  OnChainMusicFeature,
  RunningFeature,
  TxDotCoolFeature,
  TypingFeature,
  WebPFeature,
} from './(components)/works';

import ContainerLayout from '@/components/layouts/container';

export default function Page() {
  return (
    <ContainerLayout className="flex flex-col space-y-4">
      <FiveoutofnineHeader />
      <div className="grid grid-cols-2 gap-4 min-[560px]:grid-cols-4 min-[960px]:grid-cols-6">
        <ChessFeature />
        <TxDotCoolFeature />
        <TypingFeature />
        <RunningFeature />
        <ColormapRegistryFeature />
        <OnChainMusicFeature />
        <BytebeatFeature />
        <Mp4Feature />
        <WebPFeature />
      </div>
    </ContainerLayout>
  );
}
