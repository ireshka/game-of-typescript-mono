import { Box } from "@mui/material";


type BoardCellProps = {
  rowIndex: number,
  cellIndex: number,
  cellValue: number
}

export const BoardCell = ({ rowIndex, cellIndex, cellValue }: BoardCellProps) => {
  console.log(rowIndex);
  console.log(cellIndex);
  const cellColor = cellValue ? 'blue' : 'lightgray';
  return (
    <Box sx={{ aspectRatio: '1/1', backgroundColor: cellColor }}>
      {cellValue}
    </Box>
  );
};