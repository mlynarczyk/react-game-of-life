import React, { useEffect } from 'react';
import { GameOfLife } from './GameOfLife';
import { useGameOfLife } from './useGameOfLife';

type GameOfLifeProps = {
  rows: number;
  columns: number;
  pleaseRerender: number;
};

function initialGridState(rows: number, columns: number) {
  const row = new Array(columns).fill(0);

  return new Array(rows).fill(row);
}

function calculateCellSize(columns: number) {
  return parseFloat((100 / columns).toFixed(2));
}

export const GameOfLifeController: React.FC<GameOfLifeProps> = ({
  rows,
  columns,
  pleaseRerender,
}) => {
  const {
    grid,
    isSimulationRunning,
    manuallyToggleCell,
    handleSimulationStartClick,
    handleSimulationStopClick,
  } = useGameOfLife({ initialGridState: initialGridState(rows, columns) });

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(pleaseRerender);
  });

  return (
    <GameOfLife
      grid={grid}
      cellSize={calculateCellSize(columns)}
      isSimulationRunning={isSimulationRunning}
      onSimulationStartClick={handleSimulationStartClick}
      onSimulationStopClick={handleSimulationStopClick}
      onCellClick={manuallyToggleCell}
    />
  );
};
