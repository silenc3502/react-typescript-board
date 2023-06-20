// First
// import React from 'react';

// const BoardListPage: React.FC = () => {
//   return (
//     <div>
//       <h2>Hi</h2>
//     </div>
//   );
// };

// export default BoardListPage;

// Second
// import React from 'react';
// import useBoardList from '../api/BoardApi';
// import { CircularProgress, Typography } from '@mui/material';
//
// const BoardListPage = () => {
//   const { data: boards, isLoading, isError } = useBoardList();
//
//   if (isLoading) {
//     return <CircularProgress />;
//   }
//
//   if (isError) {
//     return <Typography>Error occurred while fetching board list</Typography>;
//   }
//
//   return (
//     <div>
//       <Typography variant="h1">Board List</Typography>
//       {boards?.map((board) => (
//         <div key={board.boardId}>
//           <Typography variant="h2">{board.title}</Typography>
//           <Typography variant="body1">{board.content}</Typography>
//         </div>
//       ))}
//     </div>
//   );
// };
//
// export default BoardListPage;

import React, { useEffect } from 'react';
import { TableContainer, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, CircularProgress } from '@mui/material';
import { useBoardStore } from '../store/BoardStore';
import { useQuery } from 'react-query';
import useBoardList, { fetchBoardList } from '../api/BoardApi';
import { Board } from '../entity/Board';

const BoardListPage = () => {
  const { data: boards, isLoading, isError } = useBoardList();
  const setBoards = useBoardStore((state) => state.setBoards);

  useEffect(() => {
    if (boards) {
      setBoards(boards);
    }
  }, [boards, setBoards]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Error occurred while fetching board list</Typography>;
  }

  if (!boards) {
    return <Typography>No data available</Typography>;
  }

  // 만약 Response에 맞춰서 interface를 구성한다면 아래와 같은 구성도 가능
  const columnCount: number = 3

  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="board table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Writer</TableCell>
              <TableCell align="right">Create Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center">현재 등록된 게시물이 없습니다.</TableCell>
              </TableRow>
            ) : (
              boards && boards.map((board) => (
                <TableRow key={board.boardId}>
                  <TableCell component="th" scope="row">
                    {board.title}
                  </TableCell>
                  <TableCell align="right">{board.writer}</TableCell>
                  <TableCell align="right">{board.createDate}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BoardListPage;
