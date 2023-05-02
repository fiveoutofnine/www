import type { Address } from 'viem';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /* Site */
      FIVEOUTOFNINE_API_KEY: string;
      /* Config */
      NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS: Address;
      /* Supabase */
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_KEY: string;
      /* Services */
      NEXT_PUBLIC_ALCHEMY_ID: string;
    }
  }
}

export {};
