export type CellValue = 0 | 1;
export type Grid = CellValue[][];

const neighboringCellsOffsets = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function getCellsNeighbors(grid: Grid, rowIndex: number, columnIndex: number) {
  return neighboringCellsOffsets.map(([rowOffset, columnOffset]) => {
    const neighbor: 1 | 0 | undefined =
      grid[rowIndex + rowOffset] &&
      grid[rowIndex + rowOffset][columnIndex + columnOffset];
    return neighbor === 1 ? 1 : 0;
  });
}

function shouldCellLive(
  grid: Grid,
  value: CellValue,
  rowIndex: number,
  columnIndex: number,
) {
  const neighbors = getCellsNeighbors(grid, rowIndex, columnIndex);
  const livingNeighborsCount = neighbors.reduce(
    (sum: number, value: number) => {
      return sum + value;
    },
    0,
  );

  if (value == 1 && [2, 3].includes(livingNeighborsCount)) return true;

  return livingNeighborsCount === 3;
}

export function calculateNextGridState(grid: Grid) {
  return grid.map((row, rowIndex) => {
    return row.map((cellValue, columnIndex) => {
      return shouldCellLive(grid, cellValue, rowIndex, columnIndex) ? 1 : 0;
    });
  });
}
