import { useContext } from 'react';

import { SimulatorContext } from '../providers/SimulatorProvider';

export default function useSimulator() {
  const context = useContext(SimulatorContext);

  return context;
}
