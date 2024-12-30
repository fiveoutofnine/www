'use client';

import { useEffect } from 'react';

import sdk from '@farcaster/frame-sdk';

const Frame: React.FC = () => {
  // Initialize Farcaster Frame.
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return null;
};

export default Frame;
