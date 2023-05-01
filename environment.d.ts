import type { Address } from 'viem';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /* Services */
      NEXT_PUBLIC_ALCHEMY_ID: string;
      /* Config */
      NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS: Address;
    }
  }
}

export {};
