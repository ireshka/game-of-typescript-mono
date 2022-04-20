import {
  Board,
  CellOfLife,
  GameOfLife,
  getNeighboursNumber,
} from './got-core';

describe(GameOfLife.name, () => {
  it('for empty board should return empty board', () => {
    const inputBoard: Board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const outputBoard: Board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(new GameOfLife(inputBoard).tick().getState()).toEqual(outputBoard);
  });
  it('kill cell if it does not have any neightbours', () => {
    const inputBoard: Board = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const outputBoard: Board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(new GameOfLife(inputBoard).tick().getState()).toEqual(outputBoard);
  });
  it('3 cells should alive and one more be born', () => {
    const inputBoard: Board = [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ];
    const outputBoard: Board = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    expect(new GameOfLife(inputBoard).tick().getState()).toEqual(outputBoard);
  });
  it('should make magic for harded board', () => {
    const inputBoard: Board = [
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 0],
    ];
    const outputBoard: Board = [
      [1, 1, 0, 0],
      [1, 0, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 0],
      [1, 0, 1, 1],
    ];
    expect(new GameOfLife(inputBoard).tick().getState()).toEqual(outputBoard);
  });
});

describe(CellOfLife.name, () => {
  it('if is alive should stay alive with 3 alive neighbours', () => {
    expect(new CellOfLife(1, 3).tick()).toBe(1);
  });

  it('if is alive should stay alive with 2 alive neighbours', () => {
    expect(new CellOfLife(1, 2).tick()).toBe(1);
  });

  it('if is alive should die if numbers of alive neighbours is not 2 or 3', () => {
    expect(new CellOfLife(1, 0).tick()).toBe(0);
    expect(new CellOfLife(1, 1).tick()).toBe(0);
    expect(new CellOfLife(1, 4).tick()).toBe(0);
  });
  it('if is dead should alive when  there are 3 alive neighbours', () => {
    expect(new CellOfLife(0, 3).tick()).toBe(1);
  });
});

describe(`${getNeighboursNumber.name} returns sum of neighbours:`, () => {
  it('0 if all neighbours are dead', () => {
    const inputBoard: Board = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    expect(getNeighboursNumber(inputBoard, { rowIndex: 1, cellIndex: 1 })).toBe(
      0
    );
  });

  it('3 if there are 3 live neighbours', () => {
    const inputBoard: Board = [
      [1, 0, 0],
      [1, 1, 0],
      [1, 0, 0],
    ];
    expect(getNeighboursNumber(inputBoard, { rowIndex: 1, cellIndex: 1 })).toBe(
      3
    );
  });

  it('2 if there are 2 live neighbours when cell is located on the edge of the board', () => {
    const inputBoard: Board = [
      [1, 0, 0],
      [1, 1, 0],
      [1, 0, 0],
    ];
    expect(getNeighboursNumber(inputBoard, { rowIndex: 2, cellIndex: 0 })).toBe(
      2
    );
  });
});
