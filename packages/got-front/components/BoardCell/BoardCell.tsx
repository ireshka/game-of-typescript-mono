import { Box } from "@mui/material";


type BoardCellProps = {
  rowIndex: number,
  cellIndex: number,
  cellValue: number,
  onCellClick: (rowIndex: number, cellIndex: number) => void;
}

export const BoardCell = ({ rowIndex, cellIndex, cellValue, onCellClick }: BoardCellProps) => {
  // console.log(rowIndex);
  // console.log(cellIndex);
  const cellColor = cellValue ? 'blue' : 'lightgray';
  return (
    <Box sx={{ aspectRatio: '1/1', backgroundColor: cellColor }} onClick={() => onCellClick(rowIndex, cellIndex)} />
  );
};