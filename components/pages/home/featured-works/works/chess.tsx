import { type FC, useState } from 'react';

import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { ChessFeature } from '@/lib/types/chess';
import { CHESS_NFT_FALLBACK } from '@/lib/constants/chess-nfts';

import ChessPiece from '@/components/common/chess-piece';
import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { Button, IconButton, Tooltip } from '@/components/ui';

const ChessFeature: FC = () => {
  return (
    <FeatureDisplay
      className="w-full min-[960px]:w-64 col-span-2"
      name="Chess"
      description="On-chain chess engine"
      symbol={
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
        >
          <title>Chess Knight Piece</title>
          <desc>A chess knight piece.</desc>
          <path
            d="M12.112 3.063H7.415l.735.55a1.032 1.032 0 0 1 0 1.65l-.28.21c-.429.322-.687.83-.687 1.37l-.013 3.91c0 .44.21.856.567 1.11l.082.055a1.227 1.227 0 0 0 1.427-.004l2.144-1.56a1.03 1.03 0 0 1 1.212 1.668l-2.145 1.56-2.311 1.68a2.345 2.345 0 0 0-.726.863H5.245c.228-.95.765-1.8 1.543-2.42a2.185 2.185 0 0 1-.163-.11l-.082-.057a3.414 3.414 0 0 1-1.43-2.793l.012-3.91c.004-.85.288-1.663.8-2.316l-.018-.013A1.948 1.948 0 0 1 7.071 1h5.04a8.138 8.138 0 0 1 8.014 9.565l-.988 5.56H17.04l1.053-5.921a6.075 6.075 0 0 0-5.981-7.141Zm-6.076 16.5-.709 1.375h13.346l-.713-1.375H6.036Zm13.565-1.32 1.139 2.2A1.75 1.75 0 0 1 19.184 23H4.816a1.75 1.75 0 0 1-1.556-2.557l1.139-2.2a1.37 1.37 0 0 1 1.22-.743h12.762c.515 0 .984.288 1.22.743ZM9.766 6.5a.86.86 0 1 1 0 1.719.86.86 0 0 1 0-1.719Z"
            fill="currentColor"
          />
        </svg>
      }
      button={
        <Tooltip content='WIP'>
          <Button size="sm" href="/chess" rightIcon={<ChevronRight />} disabled>
            Play
          </Button>
        </Tooltip>
      }
      tags={[<CategoryTag key={0} category="NFT" />, <CategoryTag key={1} category="On-chain" />]}
    >
      <ChessFeatureDetail />
    </FeatureDisplay>
  );
};

const ChessFeatureDetail: FC = () => {
  const [nft, setNft] = useState<ChessFeature>(CHESS_NFT_FALLBACK);

  const fetchNextMove = async () => {
    // Skip from game 0 to game 3 if end.
    const nextTokenId = nft.tokenId === 8 ? 83 : nft.tokenId + 1;
    const res = await fetch(`/api/chess/feature/${nextTokenId}`);
    const data = await res.json();

    setNft(data);
  };

  const fetchPrevMove = async () => {
    // Skip from game 3 to game 0 if end.
    const prevTokenId = nft.tokenId === 83 ? 8 : nft.tokenId - 1;
    const res = await fetch(`/api/chess/feature/${prevTokenId}`);
    const data = await res.json();

    setNft(data);
  };

  const getPieceNotation = (index: number) => {
    return `${'ABCDEF'[index % 6]}${6 - Math.floor(index / 6)}`;
  };

  return (
    <div className="relative flex h-full w-full space-x-2 p-2">
      <Tooltip content={nft.name}>
        <a
          className="h-full"
          href={`https://etherscan.io/tx/${nft.txHash}`}
          style={{
            aspectRatio: '1 / 1',
            transform: 'scale(0.128)', /* Height is hard-coded, so this should always be `0.128` */
            transformOrigin: '0 0',
          }}
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{
            __html: Buffer.from(nft.image, 'base64')
              .toString()
              /* 62.5 = 8 * (1000 / 128) */
              .replace('<section', '<section style="border-radius:62.5px"'),
          }}
        />
      </Tooltip>
      <IconButton
        className="absolute bottom-2.5 left-1"
        size="sm"
        onClick={fetchPrevMove}
        disabled={nft.tokenId === 0}
        aria-label='View previous move'
        >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className="absolute bottom-2.5 left-[6.25rem]"
        size="sm"
        onClick={fetchNextMove}
        disabled={nft.tokenId === 100}
        aria-label='View next move'
        >
        <ChevronRight />
      </IconButton>

      <div className="flex w-full flex-col justify-between">
        <div className="mx-auto grid w-[96px] grid-cols-6 grid-rows-6 overflow-hidden rounded border border-gray-6">
          {nft.boardAfterMove
            .toLowerCase()
            .split('')
            .map((piece, index) => {
              const pieceOverlap =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (nft.userMove.from === index) +
                (nft.userMove.to === index) +
                (nft.contractMove.from === index) +
                (nft.contractMove.to === index);
              const pieceColor =
                piece < '8' ? 'stroke-gray-12 text-gray-1' : 'stroke-gray-1 text-gray-12';

              return (
                <div
                  key={index}
                  className={clsx(
                    'flex h-4 w-4 items-center justify-center text-[0.5rem]',
                    pieceOverlap > 1
                      ? 'bg-purple-9'
                      : nft.userMove.from === index
                      ? 'bg-blue-3'
                      : nft.userMove.to === index
                      ? 'bg-blue-9'
                      : nft.contractMove.from === index
                      ? 'bg-red-3'
                      : nft.contractMove.to === index
                      ? 'bg-red-9'
                      : (2709 >> index % 12) & 1
                      ? 'bg-gray-9'
                      : 'bg-gray-4',
                  )}
                >
                  {piece === '1' || piece === '9' ? (
                    <ChessPiece.Pawn className={clsx('h-3 w-3', pieceColor)} />
                  ) : piece === '2' || piece === 'a' ? (
                    <ChessPiece.Bishop className={clsx('h-3 w-3', pieceColor)} />
                  ) : piece === '3' || piece === 'b' ? (
                    <ChessPiece.Rook className={clsx('h-3 w-3', pieceColor)} />
                  ) : piece === '4' || piece === 'c' ? (
                    <ChessPiece.Knight className={clsx('h-3 w-3', pieceColor)} />
                  ) : piece === '5' || piece === 'd' ? (
                    <ChessPiece.Queen className={clsx('h-3 w-3', pieceColor)} />
                  ) : piece === '6' || piece === 'e' ? (
                    <ChessPiece.King className={clsx('h-3 w-3', pieceColor)} />
                  ) : null}
                </div>
              );
            })}
        </div>
        <div className="flex justify-between text-[0.5rem] font-medium">
          <div>
            <div className="text-blue-9">User</div>
            <div className="text-gray-12">
              {getPieceNotation(nft.userMove.from)} <span className="text-gray-11">-&gt;</span>{' '}
              {getPieceNotation(nft.userMove.to)}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-red-9">Contract</div>
            <div className="text-gray-12">
              {getPieceNotation(nft.contractMove.from)} <span className="text-gray-11">-&gt;</span>{' '}
              {getPieceNotation(nft.contractMove.to)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessFeature;
