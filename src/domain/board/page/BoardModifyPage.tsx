import React, { useState } from 'react';
import { Box, Container, TextField, Button } from '@mui/material';
import { useBoard, useBoardUpdateMutation } from '../api/BoardApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

interface RouteParams {
  boardId: string;
  [key: string]: string;
}

const BoardModifyPage: React.FC = () => {
  const navigate = useNavigate();
  const { boardId } = useParams<RouteParams>();
  const queryClient = useQueryClient();

  const { data: board, isLoading, isError } = useBoard(boardId || '');
  const mutation = useBoardUpdateMutation();

  const [title, setTitle] = useState(board?.title || '');
  const [content, setContent] = useState(board?.content || '');

  const handleSaveClick = async () => {
    //const { title, content, writer } = board || {};
    const { writer } = board || {};
    console.log('board: ' + JSON.stringify(board))

    console.log('boardId: ' + boardId + ', title: ' + title + 
        ', content: ' + content + ', writer: ' + writer)
  
    if (title && content && writer) {
      const updatedData = {
        boardId,
        title,
        content,
        writer
      };
  
      await mutation.mutateAsync(updatedData);

      queryClient.invalidateQueries(['board', boardId]);

      navigate(`/read/${boardId}`);
    }
  };

  const handleCancelClick = () => {
    navigate(`/read/${boardId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred.</div>;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ borderRadius: '4px' }}
        />
        <TextField
          label="Content"
          value={content}
          multiline
          minRows={6}
          maxRows={20}
          sx={{ borderRadius: '4px' }}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="outlined" onClick={handleSaveClick}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancelClick}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default BoardModifyPage;
