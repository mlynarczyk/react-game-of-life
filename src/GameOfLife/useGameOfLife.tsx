import { useCallback, useMemo, useState } from 'react';
import produce from 'immer';
import useInterval from 'use-interval';
import { calculateNextGridState, Grid } from './gameOfLifeHelpers';

type useGameOfLifeArguments = {
  initialGridState: Grid;
};

export const useGameOfLife = ({ initialGridState }: useGameOfLifeArguments) => {
  const [grid, setGrid] = useState<Grid>(initialGridState);

  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(
    false,
  );

  const manuallyToggleCell = useCallback(
    function(rowIndex: number, columnIndex: number) {
      setGrid((gridState) => {
        return produce(gridState, (gridDraft) => {
          gridDraft[rowIndex][columnIndex] =
            gridDraft[rowIndex][columnIndex] === 0 ? 1 : 0;
        });
      });
    },
    [setGrid],
  );

  const handleSimulationStartClick = useCallback(() => {
    setIsSimulationRunning(true);
  }, [setIsSimulationRunning]);

  const handleSimulationStopClick = useCallback(() => {
    setIsSimulationRunning(false);
  }, [setIsSimulationRunning]);

  useInterval(
    () => {
      if (!isSimulationRunning) return;

      setGrid((grid) => calculateNextGridState(grid));
    },
    isSimulationRunning ? 1000 : null,
  );

  // eslint-disable-next-line no-console
  console.log('called useGameOfLife hook');

  return useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('recalculated return value');

    return {
      grid,
      isSimulationRunning,
      manuallyToggleCell,
      handleSimulationStartClick,
      handleSimulationStopClick,
    };
  }, [
    grid,
    isSimulationRunning,
    manuallyToggleCell,
    handleSimulationStartClick,
    handleSimulationStopClick,
  ]);
};
