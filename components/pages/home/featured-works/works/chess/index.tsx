import type { FC } from 'react';

import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

import ChessPiece from '@/components/common/chess-piece';
import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { Button } from '@/components/ui';

const ChessFeature: FC = () => {
  return (
    <FeatureDisplay
      className="w-full md:w-64"
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
        <Button size="sm" href="/chess" rightIcon={<ChevronRight />} disabled>
          Play
        </Button>
      }
      tags={[<CategoryTag key={0} category="NFT" />, <CategoryTag key={1} category="On-chain" />]}
    >
      <ChessFeatureDetail
        image={IMAGE}
        tokenId={0}
        userMove={{ from: 26, to: 20 }}
        contractMove={{ from: 7, to: 19 }}
        boardAfterMove="bcedcb909999000000091000110111326523"
      />
    </FeatureDisplay>
  );
};

const IMAGE =
  'PHN0eWxlPjpyb290ey0tYToxMDAwcHg7LS1iOjY7LS1jOjEycHg7LS1kOjM5NHB4Oy0tZTojRTU2NzFDOy0tZjojRTU2NzFDOy0tZzojRTU2NzFDOy0taDojRTU2NzFDOy0taTojMUE5OEUzOy0tbjpjYWxjKCgzOTRweCAtICh2YXIoLS1iKSAtIDEpKnZhcigtLWMpKS92YXIoLS1iKSk7LS1vOmNhbGMoMTA2cHggKyB2YXIoLS1uKSk7LS1wOmNhbGModmFyKC0tYSkvMil9c2VjdGlvbntoZWlnaHQ6dmFyKC0tYSk7d2lkdGg6dmFyKC0tYSk7YmFja2dyb3VuZDp2YXIoLS1lKTtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtvdmVyZmxvdzpoaWRkZW59LmN7aGVpZ2h0OjA7d2lkdGg6MDtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2l0aW9uOjAuMjVzfS5jOmhvdmVye3RyYW5zZm9ybTp0cmFuc2xhdGUoMHB4LC02NHB4KTt0cmFuc2l0aW9uOjAuMjVzfS5jPip7aGVpZ2h0OnZhcigtLW4pO3dpZHRoOnZhcigtLW4pO2JvcmRlci1ib3R0b206NHB4IHNvbGlkIGJsYWNrO2JvcmRlci1yaWdodDo0cHggc29saWQgYmxhY2s7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkIGJsYWNrO2JvcmRlci10b3A6MXB4IHNvbGlkIGJsYWNrO3RyYW5zZm9ybS1vcmlnaW46MCAwO3Bvc2l0aW9uOnJlbGF0aXZlO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYz4qOm50aC1jaGlsZCgxKXt3aWR0aDp2YXIoLS1kKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWYpO3RyYW5zZm9ybTpyb3RhdGUoOTBkZWcpc2tld1goLTMwZGVnKXNjYWxlWSgwLjg2NCl9LmM+KjpudGgtY2hpbGQoMil7aGVpZ2h0OnZhcigtLWQpO2JvdHRvbTp2YXIoLS1uKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWcpO3RyYW5zZm9ybTpyb3RhdGUoLTMwZGVnKXNrZXdYKC0zMGRlZylzY2FsZVkoMC44NjQpfSNoe2JhY2tncm91bmQtY29sb3I6dmFyKC0taCl9I2l7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pKX0uYz4qOm50aC1jaGlsZCgzKXtib3R0b206Y2FsYyh2YXIoLS1kKSArIHZhcigtLW4pKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWgpO2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDIsMWZyKTtncmlkLXRlbXBsYXRlLXJvd3M6cmVwZWF0KDIsMWZyKTt0cmFuc2Zvcm06cm90YXRlKDIxMGRlZylza2V3KC0zMGRlZylzY2FsZVkoMC44NjQpfS5yMHt0b3A6Y2FsYyh2YXIoLS1vKSArIDAqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMHtsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2NioxMSoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMXt0b3A6Y2FsYyh2YXIoLS1vKSArIDEqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMXtsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2NioxMCoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMnt0b3A6Y2FsYyh2YXIoLS1vKSArIDIqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMntsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2Nio5Kih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIze3RvcDpjYWxjKHZhcigtLW8pICsgMyoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMze2xlZnQ6Y2FsYyh2YXIoLS1wKSAtIDAuODY2KjgqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjR7dG9wOmNhbGModmFyKC0tbykgKyA0Kih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzR7bGVmdDpjYWxjKHZhcigtLXApIC0gMC44NjYqNyoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yNXt0b3A6Y2FsYyh2YXIoLS1vKSArIDUqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jNXtsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2Nio2Kih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnI2e3RvcDpjYWxjKHZhcigtLW8pICsgNioodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmM2e2xlZnQ6Y2FsYyh2YXIoLS1wKSAtIDAuODY2KjUqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjd7dG9wOmNhbGModmFyKC0tbykgKyA3Kih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzd7bGVmdDpjYWxjKHZhcigtLXApIC0gMC44NjYqNCoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yOHt0b3A6Y2FsYyh2YXIoLS1vKSArIDgqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jOHtsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2NiozKih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnI5e3RvcDpjYWxjKHZhcigtLW8pICsgOSoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmM5e2xlZnQ6Y2FsYyh2YXIoLS1wKSAtIDAuODY2KjIqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjEwe3RvcDpjYWxjKHZhcigtLW8pICsgMTAqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMTB7bGVmdDpjYWxjKHZhcigtLXApIC0gMC44NjYqMSoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMTF7dG9wOmNhbGModmFyKC0tbykgKyAxMSoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMxMXtsZWZ0OmNhbGModmFyKC0tcCkgKyAwLjg2NiowKih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIxMnt0b3A6Y2FsYyh2YXIoLS1vKSArIDEyKih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzEye2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjEqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjEze3RvcDpjYWxjKHZhcigtLW8pICsgMTMqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMTN7bGVmdDpjYWxjKHZhcigtLXApICsgMC44NjYqMioodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMTR7dG9wOmNhbGModmFyKC0tbykgKyAxNCoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMxNHtsZWZ0OmNhbGModmFyKC0tcCkgKyAwLjg2NiozKih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIxNXt0b3A6Y2FsYyh2YXIoLS1vKSArIDE1Kih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzE1e2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjQqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjE2e3RvcDpjYWxjKHZhcigtLW8pICsgMTYqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMTZ7bGVmdDpjYWxjKHZhcigtLXApICsgMC44NjYqNSoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMTd7dG9wOmNhbGModmFyKC0tbykgKyAxNyoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMxN3tsZWZ0OmNhbGModmFyKC0tcCkgKyAwLjg2Nio2Kih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIxOHt0b3A6Y2FsYyh2YXIoLS1vKSArIDE4Kih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzE4e2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjcqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjE5e3RvcDpjYWxjKHZhcigtLW8pICsgMTkqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMTl7bGVmdDpjYWxjKHZhcigtLXApICsgMC44NjYqOCoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMjB7dG9wOmNhbGModmFyKC0tbykgKyAyMCoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMyMHtsZWZ0OmNhbGModmFyKC0tcCkgKyAwLjg2Nio5Kih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIyMXt0b3A6Y2FsYyh2YXIoLS1vKSArIDIxKih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzIxe2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjEwKih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIyMnt0b3A6Y2FsYyh2YXIoLS1vKSArIDIyKih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzIye2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjExKih2YXIoLS1uKSArIHZhcigtLWMpKSl9PC9zdHlsZT48c2VjdGlvbj48ZGl2IGNsYXNzPSJjIHIwIGMxMSI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByMSBjMTAiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjEgYzEyIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHIyIGM5Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHIyIGMxMSI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByMiBjMTMiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjMgYzgiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjMgYzEwIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHIzIGMxMiI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByMyBjMTQiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjQgYzciPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjQgYzkiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjQgYzExIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI0IGMxMyI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByNCBjMTUiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjUgYzYiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjUgYzgiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjUgYzEwIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI1IGMxMiI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByNSBjMTQiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjUgYzE2Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI2IGM3Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI2IGM5Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI2IGMxMSI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByNiBjMTMiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjYgYzE1Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI3IGM4Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI3IGMxMCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByNyBjMTIiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjcgYzE0Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI4IGM5Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI4IGMxMSI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByOCBjMTMiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjkgYzEwIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI5IGMxMiI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByMTAgYzExIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48L3NlY3Rpb24+';

type ChessFeatureDetailProps = {
  image: string;
  tokenId: number;
  userMove: { from: number; to: number };
  contractMove: { from: number; to: number };
  boardAfterMove: string;
};

const ChessFeatureDetail: FC<ChessFeatureDetailProps> = ({
  image,
  tokenId,
  userMove,
  contractMove,
  boardAfterMove,
}) => {
  const getPieceNotation = (index: number) => {
    return `${'ABCDEF'[index % 6]}${6 - Math.floor(index / 6)}`;
  };

  return (
    <div className="flex h-full w-full space-x-2 p-2">
      <a
        className="h-full"
        href={`https://etherscan.io/nft/0xb543f9043b387ce5b3d1f0d916e42d8ea2eba2e0/${tokenId}`}
        style={{
          aspectRatio: '1 / 1',
          transform: 'scale(0.128)' /* Height is hard-coded, so this should always be `0.128` */,
          transformOrigin: '0 0',
        }}
        target="_blank"
        rel="noopener noreferrer"
        dangerouslySetInnerHTML={{
          __html: Buffer.from(image, 'base64')
            .toString()
            /* 62.5 = 8 * (1000 / 128) */
            .replace('<section', '<section style="border-radius:62.5px"'),
        }}
      />

      <div className="flex w-full flex-col justify-between rounded-lg bg-gray-3 p-2">
        <div className="mx-auto grid w-[72px] grid-cols-6 grid-rows-6 overflow-hidden rounded border border-gray-6">
          {boardAfterMove
            .toLowerCase()
            .split('')
            .map((piece, index) => {
              const pieceOverlap =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (userMove.from === index) +
                (userMove.to === index) +
                (contractMove.from === index) +
                (contractMove.to === index);
              const pieceColor =
                piece < '8' ? 'stroke-gray-1 text-gray-12' : 'stroke-gray-12 text-gray-1';

              return (
                <div
                  key={index}
                  className={clsx(
                    'flex h-3 w-3 items-center justify-center text-[0.5rem]',
                    pieceOverlap > 1
                      ? 'bg-purple-9'
                      : userMove.from === index
                      ? 'bg-blue-3'
                      : userMove.to === index
                      ? 'bg-blue-9'
                      : contractMove.from === index
                      ? 'bg-red-3'
                      : contractMove.to === index
                      ? 'bg-red-9'
                      : (2709 >> index % 12) & 1
                      ? 'bg-gray-9'
                      : 'bg-gray-4',
                  )}
                >
                  {piece === '1' || piece === '9' ? (
                    <ChessPiece.Pawn className={clsx('h2 w-2', pieceColor)} />
                  ) : piece === '2' || piece === 'a' ? (
                    <ChessPiece.Bishop className={clsx('h2 w-2', pieceColor)} />
                  ) : piece === '3' || piece === 'b' ? (
                    <ChessPiece.Rook className={clsx('h2 w-2', pieceColor)} />
                  ) : piece === '4' || piece === 'c' ? (
                    <ChessPiece.Knight className={clsx('h2 w-2', pieceColor)} />
                  ) : piece === '5' || piece === 'd' ? (
                    <ChessPiece.Queen className={clsx('h2 w-2', pieceColor)} />
                  ) : piece === '6' || piece === 'e' ? (
                    <ChessPiece.King className={clsx('h2 w-2', pieceColor)} />
                  ) : null}
                </div>
              );
            })}
        </div>
        <div className="flex justify-between text-[0.5rem] font-medium">
          <div>
            <div className="text-blue-9">User</div>
            <div className="text-gray-12">
              {getPieceNotation(userMove.from)} <span className="text-gray-11">-&gt;</span>{' '}
              {getPieceNotation(userMove.to)}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-red-9">Contract</div>
            <div className="text-gray-12">
              {getPieceNotation(contractMove.from)} <span className="text-gray-11">-&gt;</span>{' '}
              {getPieceNotation(contractMove.to)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessFeature;
