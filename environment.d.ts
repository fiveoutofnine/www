import type { Address } from 'viem';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Site
      FIVEOUTOFNINE_API_KEY: string;
      GOOGLE_SHEETS_ID_RUNNING: string;
      GOOGLE_SHEETS_API_KEY_RUNNING: string;
      // Config
      NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS: Address;
      // Database
      DATABASE_URL: string;
      // Upstash
      UPSTASH_URL: string;
      UPSTASH_TOKEN: string;
      // Services
      NEXT_PUBLIC_ALCHEMY_ID: string;
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
    }
  }
}

export {};
