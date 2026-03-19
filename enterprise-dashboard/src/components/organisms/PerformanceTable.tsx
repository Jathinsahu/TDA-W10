import React, { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';

interface PerformanceData {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

interface PerformanceTableProps {
  data: PerformanceData[];
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({ data }) => {
  const calculateProgress = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  const maxValue = Math.max(...data.map((d) => d.uv));

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Page</TableCell>
            <TableCell align="right">UV</TableCell>
            <TableCell align="right">PV</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.uv}</TableCell>
              <TableCell align="right">{row.pv}</TableCell>
              <TableCell align="right">{row.amt.toLocaleString()}</TableCell>
              <TableCell align="right">
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress(row.uv, maxValue)}
                  sx={{ width: '100px', ml: 'auto' }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(PerformanceTable);
