declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /* Services */
      NEXT_PUBLIC_ALCHEMY_ID: string;
    }
  }
}

export {};
