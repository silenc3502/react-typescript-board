// import React from 'react';

// const BoardListPage: React.FC = () => {
//   return (
//     <div>
//       <h2>Hi</h2>
//     </div>
//   );
// };

// export default BoardListPage;

import React from 'react';
import useBoardList from '../api/BoardApi';
import { CircularProgress, Typography } from '@mui/material';

const BoardListPage = () => {
  const { data: boards, isLoading, isError } = useBoardList();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Error occurred while fetching board list</Typography>;
  }

  return (
    <div>
      <Typography variant="h1">Board List</Typography>
      {boards?.map((board) => (
        <div key={board.boardId}>
          <Typography variant="h2">{board.title}</Typography>
          <Typography variant="body1">{board.content}</Typography>
        </div>
      ))}
    </div>
  );
};

export default BoardListPage;