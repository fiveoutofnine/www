import type { FC } from 'react';

export const BishopPiece: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Chess Bishop Piece</title>
      <desc>A chess bishop piece.</desc>
      <path
        d="M10.625 1c-.76 0-1.375.614-1.375 1.375 0 .692.511 1.263 1.177 1.362C8.494 5.59 5.47 9.164 5.47 13.375c0 2.037 1.323 3.107 2.406 3.64v1.172h8.25v-1.172c1.083-.538 2.406-1.608 2.406-3.64 0-1.603-.438-3.11-1.087-4.473l-4.271 4.271a.69.69 0 0 1-.971 0 .69.69 0 0 1 0-.971l4.559-4.559c-.997-1.637-2.226-2.986-3.188-3.906a1.379 1.379 0 0 0 1.177-1.362c0-.76-.614-1.375-1.375-1.375h-2.75ZM7.187 19.563 5.41 21.34A.97.97 0 0 0 6.097 23h11.807a.97.97 0 0 0 .687-1.659l-1.779-1.779H7.188Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const KingPiece: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Chess King Piece</title>
      <desc>A chess king piece.</desc>
      <path
        d="M12 1c.76 0 1.375.614 1.375 1.375v.688h.688a1.374 1.374 0 1 1 0 2.75h-.688v2.062h6.531a1.718 1.718 0 0 1 1.586 2.38l-3.305 7.932H5.813l-3.304-7.932a1.718 1.718 0 0 1 1.586-2.38h6.531V5.812h-.688c-.76 0-1.374-.614-1.374-1.375 0-.76.614-1.375 1.374-1.375h.688v-.687A1.372 1.372 0 0 1 12 1ZM4.034 21.341l1.779-1.779h12.375l1.778 1.78A.97.97 0 0 1 19.278 23H4.722a.97.97 0 0 1-.687-1.66Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const KnightPiece: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Chess Knight Piece</title>
      <desc>A chess knight piece.</desc>
      <path
        d="m6.5 3.063-.571.571a2.741 2.741 0 0 0-.804 1.942v5.69c0 .459.228.889.61 1.142l.456.301c.614.412 1.405.46 2.066.129l.138-.069a2.13 2.13 0 0 0 .314-.193l2.122-1.59a.8.8 0 1 1 .928 1.302l-5.5 3.751a2.605 2.605 0 0 0-1.134 2.148h13.75l1.242-6.832c.09-.485.133-.98.133-1.473V9.25A8.252 8.252 0 0 0 12 1H5.976a.853.853 0 0 0-.383 1.611l.907.451Zm1.031 2.921a.86.86 0 1 1 1.719 0 .86.86 0 0 1-1.719 0ZM3.346 21.341A.97.97 0 0 0 4.034 23h15.932a.97.97 0 0 0 .688-1.659l-1.779-1.779H5.125l-1.779 1.78Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PawnPiece: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Chess Pawn Piece</title>
      <desc>A chess pawn piece.</desc>
      <path
        d="M14.544 9.8A4.769 4.769 0 0 0 12 1a4.769 4.769 0 0 0-2.544 8.8h-.39a1.465 1.465 0 0 0-.16 2.924l-.573 5.143h7.334l-.573-5.143a1.469 1.469 0 0 0 1.306-1.457c0-.812-.655-1.467-1.467-1.467h-.39ZM5.702 21.23A1.035 1.035 0 0 0 6.435 23h11.13a1.035 1.035 0 0 0 .732-1.77L16.4 19.334H7.6l-1.898 1.898Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const QueenPiece: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Chess Queen Piece</title>
      <desc>A chess queen piece.</desc>
      <path
        d="M12 1a2.406 2.406 0 1 1 0 4.813A2.406 2.406 0 0 1 12 1ZM6.762 7.179A1.346 1.346 0 0 1 8.06 6.156c.528 0 .97.31 1.19.73a3.095 3.095 0 0 0 5.5 0c.22-.42.662-.73 1.19-.73.658 0 1.16.464 1.298 1.023a2.752 2.752 0 0 0 3.949 1.757 1.195 1.195 0 0 1 1.581 1.672l-4.593 7.58H5.825l-4.593-7.58a1.192 1.192 0 0 1 1.581-1.672A2.752 2.752 0 0 0 6.762 7.18Zm-.95 12.383h12.375l1.78 1.78A.97.97 0 0 1 19.278 23H4.72a.97.97 0 0 1-.687-1.66l1.778-1.779Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RookPiece: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Chess Rook Piece</title>
      <desc>A chess rook piece.</desc>
      <path
        d="M3.2 8.333v-6.6c0-.403.33-.733.733-.733h2.934c.403 0 .733.33.733.733v1.834c0 .201.165.366.367.366h1.466a.368.368 0 0 0 .367-.366V1.733c0-.403.33-.733.733-.733h2.934c.403 0 .733.33.733.733v1.834c0 .201.165.366.367.366h1.466a.368.368 0 0 0 .367-.366V1.733c0-.403.33-.733.733-.733h2.934c.403 0 .733.33.733.733v6.6c0 .463-.215.899-.587 1.174l-2.346 1.76.733 6.6H5.4l.733-6.6-2.346-1.76A1.457 1.457 0 0 1 3.2 8.333Zm8.067 4.4h1.466c.404 0 .734-.33.734-.733V9.8a1.466 1.466 0 1 0-2.934 0V12c0 .403.33.733.734.733Zm-8.498 8.498 1.898-1.898h14.666l1.898 1.898a1.035 1.035 0 0 1-.733 1.77H3.502a1.035 1.035 0 0 1-.734-1.77Z"
        fill="currentColor"
      />
    </svg>
  );
};
