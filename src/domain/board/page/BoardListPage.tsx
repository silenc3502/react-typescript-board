// import React from 'react';

// const BoardListPage: React.FC = () => {
//   return (
//     <div>
//       <h2>Hi</h2>
//     </div>
//   );
// };

import React, { useEffect } from 'react';
import {
  TableContainer,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useBoardStore } from '../store/BoardStore';
import useBoardListQuery, { fetchBoardList } from '../api/BoardApi';

import { Link, useNavigate } from 'react-router-dom';

const BoardListPage = () => {
  const { data: boards, isLoading, isError } = useBoardListQuery();
  const setBoards = useBoardStore((state) => state.setBoards);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBoardList();
      console.log(data)
      setBoards(data);
    };

    fetchData();
  }, [setBoards]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Error occurred while fetching board list</Typography>;
  }

  if (!boards) {
    return <Typography>No data available</Typography>;
  }

  const handleRowClick = (boardId: number) => {
    navigate(`/read/${boardId}`);
  };

  // 만약 Response에 맞춰서 interface를 구성한다면 아래와 같은 구성도 가능
  const columnCount: number = 3

  if (boards === null) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg">
      <Button component={Link} to="/register" variant="contained"
              color="primary" style={{ marginTop: '20px' }}>
        글쓰기
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="board table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50%' }}>Title</TableCell>
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
                <TableRow key={board.boardId} onClick={() => handleRowClick(board.boardId)} style={{ cursor: 'pointer' }}>
                  <TableCell>{board.title}</TableCell>
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
