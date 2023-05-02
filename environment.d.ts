import type { Address } from 'viem';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /* Site */
      FIVEOUTOFNINE_API_KEY: string;
      /* Config */
      NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS: Address;
      /* Services */
      NEXT_PUBLIC_ALCHEMY_ID: string;
    }
  }
}

export {};
