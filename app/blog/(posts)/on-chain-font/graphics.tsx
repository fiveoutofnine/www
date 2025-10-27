import { type Address, checksumAddress } from 'viem';

export const NFTGraphic: React.FC<{ address?: Address }> = ({ address }) => {
  return (
    <svg
      width="256"
      height="256"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <path
        className="fill-gray-1 stroke-gray-6"
        d="M1 9v238q0 8 8 8h238q8 0 8-8V9q0-8-8-8H9Q1 1 1 9"
        strokeWidth="2"
      />
      <text
        className="fill-gray-12 font-mono text-[16px] font-normal"
        x="50%"
        y="125"
        textAnchor="middle"
        dominantBaseline="auto"
      >
        fiveoutofnine
      </text>
      <text
        className="fill-gray-11 font-mono text-[14px] font-normal"
        x="50%"
        y="131"
        textAnchor="middle"
        dominantBaseline="hanging"
      >
        {address ? checksumAddress(address).slice(0, 10) : '0xA85572Cd'}
      </text>
    </svg>
  );
};
