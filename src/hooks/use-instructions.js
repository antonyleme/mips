import { useContext } from 'react';

import { InstructionsContext } from '../providers/InstructionsProvider';

export default function useInstructions() {
  const context = useContext(InstructionsContext);

  return context;
}
