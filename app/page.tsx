import FiveoutofnineHeader from './(components)/header';
import BytebeatFeature from './(components)/works/bytebeat';
import ChessFeature from './(components)/works/chess';
import ColormapRegistryFeature from './(components)/works/colormap-registry';
import Mp4Feature from './(components)/works/mp4';
import OnChainMusicFeature from './(components)/works/on-chain-music';
import RunningFeature from './(components)/works/running';
import TxDotCoolFeature from './(components)/works/tx-dot-cool';
import TypingFeature from './(components)/works/typing';
import WebPFeature from './(components)/works/webp';

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
