'use client';

import { useState } from 'react';

import { CodeBlock } from '@/components/ui';
import type { CodeBlockLanguage } from '@/components/ui/code-block/types';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const LANGUAGE_OPTIONS: { label: string; value: CodeBlockLanguage }[] = [
  { label: 'Solidity', value: 'sol' },
  { label: 'Bytecode', value: 'none' },
];
const SOLIDITY_SOURCE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Counter {
    uint256 public count;

    function get() public view returns (uint256) {
        return count;
    }

    function inc() public {
        count += 1;
    }

    function dec() public {
        count -= 1;
    }
}`;
const BYTECODE_SOURCE =
  '6080604052348015600e575f80fd5b506101d98061001c5f395ff3fe608060405234801561000f575f80fd5b506004361061004a575f3560e01c806306661abd1461004e578063371303c01461006c5780636d4ce63c14610076578063b3bcfa8214610094575b5f80fd5b61005661009e565b60405161006391906100f7565b60405180910390f35b6100746100a3565b005b61007e6100bd565b60405161008b91906100f7565b60405180910390f35b61009c6100c5565b005b5f5481565b60015f808282546100b4919061013d565b92505081905550565b5f8054905090565b60015f808282546100d69190610170565b92505081905550565b5f819050919050565b6100f1816100df565b82525050565b5f60208201905061010a5f8301846100e8565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610147826100df565b9150610152836100df565b925082820190508082111561016a57610169610110565b5b92915050565b5f61017a826100df565b9150610185836100df565b925082820390508181111561019d5761019c610110565b5b9291505056fea264697066735822122020a990357915839cfe47dd4824292037d65dcfbdef8a8f857d1af7318c78bc8964736f6c63430008190033';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const CodeBlockSwitcherDemo: React.FC = () => {
  const [language, setLanguage] = useState<CodeBlockLanguage>('sol');

  if (language === 'sol') {
    return (
      <CodeBlock
        language="sol"
        fileName="Counter.sol"
        switcher={{
          options: LANGUAGE_OPTIONS,
          value: language,
          onChange: (value) => setLanguage(value),
        }}
      >
        {SOLIDITY_SOURCE}
      </CodeBlock>
    );
  }

  return (
    <CodeBlock
      language="none"
      fileName="Counter.sol bytecode"
      switcher={{
        options: LANGUAGE_OPTIONS,
        value: language,
        onChange: (value) => setLanguage(value),
      }}
      showLineNumbers={false}
      breakLines
    >
      {BYTECODE_SOURCE}
    </CodeBlock>
  );
};

export default CodeBlockSwitcherDemo;
