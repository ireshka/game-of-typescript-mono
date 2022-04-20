import * as React from 'react';
import { Stack, Button, Box, Alert, Typography } from '@mui/material';
import { BoardGrid } from '../BoardGrid/index';
import { Board, GameOfLife } from '@l22-got-monorepo/got-core';
import { generateBlankBoard } from '../../utils/generateBlankBoard';


export const BoardWidget = () => {
  const [boardObject, setBoardObject] = React.useState<GameOfLife | null>(null);
  const [boardState, setBoardState] = React.useState<Board | null>(null);
  const [startingCellNumber, setStartingCellNumber] = React.useState<number>(0);
  const [message, setMessage] = React.useState<string | null>(null);
  const [maxStartingCellsNumber, setMaxStartingCellsNumber] = React.useState<number>(0);
  const [boardDimension] = React.useState<number>(10);

  const displayBlankBoard = async () => {
    setBoardState(generateBlankBoard(boardDimension));
    setMaxStartingCellsNumber(boardDimension*boardDimension*0.2);
  };

  const tickGame = async () => {
    console.log('Tick game');
    setMessage(null);
    if (boardObject === null) {
      const board = new GameOfLife(boardState);
      setBoardObject(board);
      setBoardState(board.tick().getState())
    } else {
      console.log('only tick');
      setBoardState(boardObject.tick().getState());
    }
  };

  const isGameLoaded = boardState !== null;

  const onCellClick = (rowIndex: number, cellIndex: number) => {
    if (boardObject) return;
    if (startingCellNumber >= maxStartingCellsNumber ) {
      setMessage(`No more than ${maxStartingCellsNumber} starting cells`);
      return;
    };
    setStartingCellNumber((prev) => prev + 1);
    console.log(`Row index: ${rowIndex} - Cell index: ${cellIndex}`);
    setBoardState((prev) => {
      const newBoard = prev.map((row, rIndex) => {
        if (rIndex === rowIndex) {
          return row.map((cell, cIndex) => cellIndex === cIndex ? 1 : cell )
        } else return row;
      });
      return newBoard;
    })
  };

  const restartGame = () => {
    setStartingCellNumber(0);
    setBoardState(generateBlankBoard(boardDimension));
    setBoardObject(null);
  }

  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {!isGameLoaded && (
          <Button variant="contained" onClick={displayBlankBoard}>
            {'Start game'}
          </Button>
        )}
        {isGameLoaded && (
          <>
            <Typography sx={{mr: '1rem'}}>{boardObject ? 'Your turn': `Click max ${maxStartingCellsNumber}`}</Typography>
            <Button variant="contained" onClick={tickGame}>
              {'Next generation'}
            </Button>
          </>
        )}
      </Stack>
      {message && <Alert severity="warning">{message}</Alert>}
      {isGameLoaded &&
        (
          <Box sx={{ pt: '2rem' }}>
            <BoardGrid board={boardState} onCellClick={onCellClick} />
          </Box>
        )}
      {isGameLoaded && (
        <Stack direction="row" justifyContent="center" sx={{ pt: '0.5rem' }}>
          <Button variant="contained" onClick={restartGame}>
            {'Restart game'}
          </Button>
        </Stack>
      )}
    </>
  );
};
