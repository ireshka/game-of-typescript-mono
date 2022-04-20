export class CellOfLife {
  constructor(private cellValue: number, private neighboursNumber: number) {}
  public tick() {
    if (this.neighboursNumber === 3) return 1;
    if (this.cellValue === 1 && this.neighboursNumber === 2) return 1;
    return 0;
  }
}

export class GameOfLife {
  constructor(private inputBoard: Board) {}
  public tick() {
    this.inputBoard = this.inputBoard.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        const neighboursNumber = this.getNeighboursNumber({
          cellIndex,
          rowIndex,
        });
        return new CellOfLife(cell, neighboursNumber).tick();
      });
    });
    return this;
  }

  public getState() {
    return this.inputBoard;
  }

  private getNeighboursNumber(cellPosition: CellPosition) {
    return getNeighboursNumber(this.inputBoard, cellPosition);
  }
}

export type Cell = 0 | 1;
export type Row = Cell[];
export type Board = Row[];

type CellPosition = {
  rowIndex: number;
  cellIndex: number;
};

const getCellValue = (
  row: undefined | number[],
  cellIndex: number
): Cell => {
  if (row === undefined) return 0;
  return row[cellIndex] === 1 ? 1 : 0;
};

export const getNeighboursNumber = (
  inputBoard: Board,
  cellPosition: CellPosition
): number => {
  const { cellIndex, rowIndex } = cellPosition;
  return (
    getCellValue(inputBoard[rowIndex - 1], cellIndex - 1) +
    getCellValue(inputBoard[rowIndex - 1], cellIndex) +
    getCellValue(inputBoard[rowIndex - 1], cellIndex + 1) +
    getCellValue(inputBoard[rowIndex], cellIndex - 1) +
    getCellValue(inputBoard[rowIndex], cellIndex + 1) +
    getCellValue(inputBoard[rowIndex + 1], cellIndex - 1) +
    getCellValue(inputBoard[rowIndex + 1], cellIndex) +
    getCellValue(inputBoard[rowIndex + 1], cellIndex + 1)
  );
};
