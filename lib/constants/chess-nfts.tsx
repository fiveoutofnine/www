import type { ChessFeature } from '@/lib/types/chess';

export const CHESS_NFT_FALLBACK: ChessFeature = {
  image:
    'PHN0eWxlPjpyb290ey0tYToxMDAwcHg7LS1iOjY7LS1jOjEycHg7LS1kOjM5NHB4Oy0tZTojRTU2NzFDOy0tZjojRTU2NzFDOy0tZzojRTU2NzFDOy0taDojRTU2NzFDOy0taTojMUE5OEUzOy0tbjpjYWxjKCgzOTRweCAtICh2YXIoLS1iKSAtIDEpKnZhcigtLWMpKS92YXIoLS1iKSk7LS1vOmNhbGMoMTA2cHggKyB2YXIoLS1uKSk7LS1wOmNhbGModmFyKC0tYSkvMil9c2VjdGlvbntoZWlnaHQ6dmFyKC0tYSk7d2lkdGg6dmFyKC0tYSk7YmFja2dyb3VuZDp2YXIoLS1lKTtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtvdmVyZmxvdzpoaWRkZW59LmN7aGVpZ2h0OjA7d2lkdGg6MDtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2l0aW9uOjAuMjVzfS5jOmhvdmVye3RyYW5zZm9ybTp0cmFuc2xhdGUoMHB4LC02NHB4KTt0cmFuc2l0aW9uOjAuMjVzfS5jPip7aGVpZ2h0OnZhcigtLW4pO3dpZHRoOnZhcigtLW4pO2JvcmRlci1ib3R0b206NHB4IHNvbGlkIGJsYWNrO2JvcmRlci1yaWdodDo0cHggc29saWQgYmxhY2s7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkIGJsYWNrO2JvcmRlci10b3A6MXB4IHNvbGlkIGJsYWNrO3RyYW5zZm9ybS1vcmlnaW46MCAwO3Bvc2l0aW9uOnJlbGF0aXZlO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYz4qOm50aC1jaGlsZCgxKXt3aWR0aDp2YXIoLS1kKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWYpO3RyYW5zZm9ybTpyb3RhdGUoOTBkZWcpc2tld1goLTMwZGVnKXNjYWxlWSgwLjg2NCl9LmM+KjpudGgtY2hpbGQoMil7aGVpZ2h0OnZhcigtLWQpO2JvdHRvbTp2YXIoLS1uKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWcpO3RyYW5zZm9ybTpyb3RhdGUoLTMwZGVnKXNrZXdYKC0zMGRlZylzY2FsZVkoMC44NjQpfSNoe2JhY2tncm91bmQtY29sb3I6dmFyKC0taCl9I2l7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pKX0uYz4qOm50aC1jaGlsZCgzKXtib3R0b206Y2FsYyh2YXIoLS1kKSArIHZhcigtLW4pKTtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWgpO2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KDIsMWZyKTtncmlkLXRlbXBsYXRlLXJvd3M6cmVwZWF0KDIsMWZyKTt0cmFuc2Zvcm06cm90YXRlKDIxMGRlZylza2V3KC0zMGRlZylzY2FsZVkoMC44NjQpfS5yMHt0b3A6Y2FsYyh2YXIoLS1vKSArIDAqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMHtsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2NioxMSoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMXt0b3A6Y2FsYyh2YXIoLS1vKSArIDEqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMXtsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2NioxMCoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMnt0b3A6Y2FsYyh2YXIoLS1vKSArIDIqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMntsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2Nio5Kih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIze3RvcDpjYWxjKHZhcigtLW8pICsgMyoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMze2xlZnQ6Y2FsYyh2YXIoLS1wKSAtIDAuODY2KjgqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjR7dG9wOmNhbGModmFyKC0tbykgKyA0Kih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzR7bGVmdDpjYWxjKHZhcigtLXApIC0gMC44NjYqNyoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yNXt0b3A6Y2FsYyh2YXIoLS1vKSArIDUqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jNXtsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2Nio2Kih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnI2e3RvcDpjYWxjKHZhcigtLW8pICsgNioodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmM2e2xlZnQ6Y2FsYyh2YXIoLS1wKSAtIDAuODY2KjUqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjd7dG9wOmNhbGModmFyKC0tbykgKyA3Kih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzd7bGVmdDpjYWxjKHZhcigtLXApIC0gMC44NjYqNCoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yOHt0b3A6Y2FsYyh2YXIoLS1vKSArIDgqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jOHtsZWZ0OmNhbGModmFyKC0tcCkgLSAwLjg2NiozKih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnI5e3RvcDpjYWxjKHZhcigtLW8pICsgOSoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmM5e2xlZnQ6Y2FsYyh2YXIoLS1wKSAtIDAuODY2KjIqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjEwe3RvcDpjYWxjKHZhcigtLW8pICsgMTAqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMTB7bGVmdDpjYWxjKHZhcigtLXApIC0gMC44NjYqMSoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMTF7dG9wOmNhbGModmFyKC0tbykgKyAxMSoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMxMXtsZWZ0OmNhbGModmFyKC0tcCkgKyAwLjg2NiowKih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIxMnt0b3A6Y2FsYyh2YXIoLS1vKSArIDEyKih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzEye2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjEqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjEze3RvcDpjYWxjKHZhcigtLW8pICsgMTMqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMTN7bGVmdDpjYWxjKHZhcigtLXApICsgMC44NjYqMioodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMTR7dG9wOmNhbGModmFyKC0tbykgKyAxNCoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMxNHtsZWZ0OmNhbGModmFyKC0tcCkgKyAwLjg2NiozKih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIxNXt0b3A6Y2FsYyh2YXIoLS1vKSArIDE1Kih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzE1e2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjQqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjE2e3RvcDpjYWxjKHZhcigtLW8pICsgMTYqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMTZ7bGVmdDpjYWxjKHZhcigtLXApICsgMC44NjYqNSoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMTd7dG9wOmNhbGModmFyKC0tbykgKyAxNyoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMxN3tsZWZ0OmNhbGModmFyKC0tcCkgKyAwLjg2Nio2Kih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIxOHt0b3A6Y2FsYyh2YXIoLS1vKSArIDE4Kih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzE4e2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjcqKHZhcigtLW4pICsgdmFyKC0tYykpKX0ucjE5e3RvcDpjYWxjKHZhcigtLW8pICsgMTkqKHZhcigtLW4pLzIgKyB2YXIoLS1jKSkpfS5jMTl7bGVmdDpjYWxjKHZhcigtLXApICsgMC44NjYqOCoodmFyKC0tbikgKyB2YXIoLS1jKSkpfS5yMjB7dG9wOmNhbGModmFyKC0tbykgKyAyMCoodmFyKC0tbikvMiArIHZhcigtLWMpKSl9LmMyMHtsZWZ0OmNhbGModmFyKC0tcCkgKyAwLjg2Nio5Kih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIyMXt0b3A6Y2FsYyh2YXIoLS1vKSArIDIxKih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzIxe2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjEwKih2YXIoLS1uKSArIHZhcigtLWMpKSl9LnIyMnt0b3A6Y2FsYyh2YXIoLS1vKSArIDIyKih2YXIoLS1uKS8yICsgdmFyKC0tYykpKX0uYzIye2xlZnQ6Y2FsYyh2YXIoLS1wKSArIDAuODY2KjExKih2YXIoLS1uKSArIHZhcigtLWMpKSl9PC9zdHlsZT48c2VjdGlvbj48ZGl2IGNsYXNzPSJjIHIwIGMxMSI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByMSBjMTAiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjEgYzEyIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHIyIGM5Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHIyIGMxMSI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByMiBjMTMiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjMgYzgiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjMgYzEwIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHIzIGMxMiI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByMyBjMTQiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjQgYzciPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjQgYzkiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjQgYzExIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI0IGMxMyI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByNCBjMTUiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjUgYzYiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjUgYzgiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjUgYzEwIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI1IGMxMiI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByNSBjMTQiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjUgYzE2Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI2IGM3Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI2IGM5Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI2IGMxMSI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByNiBjMTMiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjYgYzE1Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI3IGM4Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI3IGMxMCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByNyBjMTIiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjcgYzE0Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI4IGM5Ij48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI4IGMxMSI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByOCBjMTMiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjxkaXYgaWQ9ImgiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjxkaXYgaWQ9ImkiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImMgcjkgYzEwIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJoIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPSJjIHI5IGMxMiI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PGRpdiBpZD0iaCI+PC9kaXY+PGRpdiBpZD0iaSI+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz0iYyByMTAgYzExIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJpIj48L2Rpdj48ZGl2IGlkPSJoIj48L2Rpdj48L2Rpdj48L2Rpdj48L3NlY3Rpb24+',
  tokenId: 0,
  name: 'Game #0, Move #0',
  txHash: '0x8311b52701649871be2d3ecb0f78fb2177a705afe6659995b51b38d88747dc98',
  userMove: { from: 26, to: 20 },
  contractMove: { from: 7, to: 19 },
  boardAfterMove: '325623101111000000019000990999bcdecb',
};

// We omit the `image` property because it can be fetched from Ethereum.
export const CHESS_NFTS: Record<string, Omit<ChessFeature, 'image'>> = {
  1: {
    tokenId: 1,
    name: 'Game #0, Move #1',
    txHash: '0x8311b52701649871be2d3ecb0f78fb2177a705afe6659995b51b38d88747dc98',
    userMove: { from: 24, to: 18 },
    contractMove: { from: 9, to: 15 },
    boardAfterMove: '325623101011000100919000090999bcdecb',
  },
  2: {
    tokenId: 2,
    name: 'Game #0, Move #2',
    txHash: '0x8311b52701649871be2d3ecb0f78fb2177a705afe6659995b51b38d88747dc98',
    userMove: { from: 27, to: 21 },
    contractMove: { from: 10, to: 22 },
    boardAfterMove: '325623101001000100919910090099bcdecb',
  },
  3: {
    tokenId: 3,
    name: 'Game #0, Move #3',
    txHash: '0x8311b52701649871be2d3ecb0f78fb2177a705afe6659995b51b38d88747dc98',
    userMove: { from: 29, to: 22 },
    contractMove: { from: 15, to: 22 },
    boardAfterMove: '325623101001000000919910090090bcdecb',
  },
  4: {
    tokenId: 4,
    name: 'Game #0, Move #4',
    txHash: '0x8311b52701649871be2d3ecb0f78fb2177a705afe6659995b51b38d88747dc98',
    userMove: { from: 32, to: 22 },
    contractMove: { from: 8, to: 14 },
    boardAfterMove: '3256231000010010009199d0090090bc0ecb',
  },
  5: {
    tokenId: 5,
    name: 'Game #0, Move #5',
    txHash: '0x8311b52701649871be2d3ecb0f78fb2177a705afe6659995b51b38d88747dc98',
    userMove: { from: 22, to: 27 },
    contractMove: { from: 3, to: 10 },
    boardAfterMove: '325023100061001000919900090d90bc0ecb',
  },
  6: {
    tokenId: 6,
    name: 'Game #0, Move #6',
    txHash: '0x8311b52701649871be2d3ecb0f78fb2177a705afe6659995b51b38d88747dc98',
    userMove: { from: 27, to: 17 },
    contractMove: { from: 10, to: 9 },
    boardAfterMove: '32502310060100100d919900090090bc0ecb',
  },
  7: {
    tokenId: 7,
    name: 'Game #0, Move #7',
    txHash: '0x8311b52701649871be2d3ecb0f78fb2177a705afe6659995b51b38d88747dc98',
    userMove: { from: 31, to: 27 },
    contractMove: { from: 1, to: 22 },
    boardAfterMove: '30502310060100100d919920090c90b00ecb',
  },
  8: {
    tokenId: 8,
    name: 'Game #0, Move #8',
    txHash: '0x8311b52701649871be2d3ecb0f78fb2177a705afe6659995b51b38d88747dc98',
    userMove: { from: 21, to: 14 },
    contractMove: { from: 37, to: 37 },
    boardAfterMove: '30502310060100900d919020090c90b00ecb',
  },
  83: {
    tokenId: 83,
    name: 'Game #3, Move #0',
    txHash: '0x0a89bc8e306d60e72ba747ac4237ea6b7e6c0b639bf68ad4188a09d9fc8a806b',
    userMove: { from: 26, to: 20 },
    contractMove: { from: 9, to: 15 },
    boardAfterMove: '325623111011000100009000990999bcdecb',
  },
  84: {
    tokenId: 84,
    name: 'Game #3, Move #1',
    txHash: '0x46ac36a4469cee44af9630a905971667efa2f6982e902241934b290eca4151fa',
    userMove: { from: 20, to: 15 },
    contractMove: { from: 8, to: 15 },
    boardAfterMove: '325623110011000100000000990999bcdecb',
  },
  85: {
    tokenId: 85,
    name: 'Game #3, Move #2',
    txHash: '0xbe958cce8840443879ab1e3d1443d2912920fb6c40c8e2075e984f5588563de5',
    userMove: { from: 32, to: 2 },
    contractMove: { from: 3, to: 2 },
    boardAfterMove: '326023110011000100000000990999bc0e0b',
  },
  86: {
    tokenId: 86,
    name: 'Game #3, Move #3',
    txHash: '0x90ca0ab785bbc274b1e8b3726fc5fe1b3aaba9cc61b7aef0dc74fdfcf88720de',
    userMove: { from: 34, to: 21 },
    contractMove: { from: 2, to: 3 },
    boardAfterMove: '320623110011000100000c00990999bc0e0b',
  },
  87: {
    tokenId: 87,
    name: 'Game #3, Move #4',
    txHash: '0xe5b224dd1a015a0b9f2d2db1aa48b1d8df561cc40debfe541fac472079c598b2',
    userMove: { from: 31, to: 18 },
    contractMove: { from: 7, to: 13 },
    boardAfterMove: '320623100011010100c00c00990999b00e0b',
  },
  88: {
    tokenId: 88,
    name: 'Game #3, Move #5',
    txHash: '0x9d33af88e7781416cfbb4239886997da392a550a28ec3ac16587325038be8312',
    userMove: { from: 18, to: 26 },
    contractMove: { from: 4, to: 14 },
    boardAfterMove: '320603100011012100000c0099c999b00e0b',
  },
  89: {
    tokenId: 89,
    name: 'Game #3, Move #6',
    txHash: '0x44042fd3e77301188e2ebfc2c5a3c1010c7cd4f79fcc1c0ac1edcb228eadd3f4',
    userMove: { from: 24, to: 12 },
    contractMove: { from: 10, to: 16 },
    boardAfterMove: '320603100001912110000c0009c999b00e0b',
  },
  90: {
    tokenId: 90,
    name: 'Game #3, Move #7',
    txHash: '0xbb26db2b3e79d2c57c9e1a2bcf5bdb6dd936acc68a6d5d368319b6120c1667c3',
    userMove: { from: 21, to: 13 },
    contractMove: { from: 6, to: 13 },
    boardAfterMove: '32060300000191211000000009c999b00e0b',
  },
  91: {
    tokenId: 91,
    name: 'Game #3, Move #8',
    txHash: '0xde2f980662397589694f6570d23e725d77f34ac8c95b7e1b1c29ec94eeb0a573',
    userMove: { from: 27, to: 21 },
    contractMove: { from: 16, to: 21 },
    boardAfterMove: '32060300000191210000010009c099b00e0b',
  },
  92: {
    tokenId: 92,
    name: 'Game #3, Move #9',
    txHash: '0xc8907668e78a190ff0d326a0a5783ba7574707e9da31e74adccf24c11446f2f3',
    userMove: { from: 28, to: 21 },
    contractMove: { from: 14, to: 21 },
    boardAfterMove: '32060300000191010000020009c009b00e0b',
  },
  93: {
    tokenId: 93,
    name: 'Game #3, Move #10',
    txHash: '0xdb1a29faf472418075059a4472c855f798e8590162a1ef63ca93c26e1e934bd6',
    userMove: { from: 35, to: 34 },
    contractMove: { from: 13, to: 19 },
    boardAfterMove: '32060300000190010001020009c009b00eb0',
  },
  94: {
    tokenId: 94,
    name: 'Game #3, Move #11',
    txHash: '0x123481c8bd61ec6bb870225d56bdcae5a85ded12bbe5a3b4ba352ebc4250580d',
    userMove: { from: 22, to: 27 },
    contractMove: { from: 26, to: 13 },
    boardAfterMove: '0206033000019c0100010200090009b00eb0',
  },
  95: {
    tokenId: 95,
    name: 'Game #3, Move #12',
    txHash: '0xf80fb5c55e806e1482539b1b24c22eaf711afa94c6be58b32ead23326a162287',
    userMove: { from: 13, to: 21 },
    contractMove: { from: 3, to: 2 },
    boardAfterMove: '026003300001900100010c00090009b00eb0',
  },
  96: {
    tokenId: 96,
    name: 'Game #3, Move #13',
    txHash: '0xefe6f7136ac5cb8a021cffdccda11d53951c01350552e333f08bb6762ca77bad',
    userMove: { from: 30, to: 32 },
    contractMove: { from: 2, to: 3 },
    boardAfterMove: '020603300001900100010c0009000900beb0',
  },
  97: {
    tokenId: 97,
    name: 'Game #3, Move #14',
    txHash: '0x250efb0d3e8255ac625a4354cf790d4c372e1a1e76ee6359e4e65f8b6228270b',
    userMove: { from: 32, to: 14 },
    contractMove: { from: 11, to: 23 },
    boardAfterMove: '02060330000090b100010c01090009000eb0',
  },
  98: {
    tokenId: 98,
    name: 'Game #3, Move #15',
    txHash: '0x3d4e8580dc58fc1857c0760ec9854e55d142cdf6af1a99360f7da800f0ad1164',
    userMove: { from: 33, to: 27 },
    contractMove: { from: 6, to: 0 },
    boardAfterMove: '32060300000090b100010c01090e090000b0',
  },
  99: {
    tokenId: 99,
    name: 'Game #3, Move #16',
    txHash: '0x4529cf56cd23a1669622716cb7a39518e1838dabaeead41cbd7029377348f6ed',
    userMove: { from: 21, to: 13 },
    contractMove: { from: 0, to: 12 },
    boardAfterMove: '0206030000003cb100010001090e090000b0',
  },
  100: {
    tokenId: 100,
    name: 'Game #3, Move #17',
    txHash: '0xfe52282cb05cb367e7425ce90c2d6ae6a50d477ea02167545aa90d6a86f6d0fa',
    userMove: { from: 14, to: 2 },
    contractMove: { from: 37, to: 37 },
    boardAfterMove: '02b6030000003c0100010001090e090000b0',
  },
};
