import React, { useEffect } from 'react';
import { Box, Container, TextField, Button } from '@mui/material';
import { fetchBoard, useBoard } from '../api/BoardApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

interface RouteParams {
    boardId: string;
    [key: string]: string;
}

const BoardReadPage: React.FC = () => {
    const navigate = useNavigate();
    const { boardId } = useParams<RouteParams>();
    const queryClient = useQueryClient();

    const { data: board, isLoading, isError } = useBoard(boardId || '');

    useEffect(() => {
        const fetchBoardData = async () => {
            const data = await fetchBoard(boardId || '');
            console.log(data);
        };

        fetchBoardData();
    }, [boardId]);

    const handleEditClick = () => {
        navigate(`/modify/${boardId}`);
    };

    const handleCancelClick = () => {
        queryClient.invalidateQueries('boardList'); // 'boardList' 쿼리 무효화
        navigate('/');
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
                    value={board?.title || ''}
                    disabled
                    sx={{ borderRadius: '4px' }}
                />
                <TextField
                    label="Writer"
                    value={board?.writer || ''}
                    disabled
                    sx={{ borderRadius: '4px' }}
                />
                <TextField
                    label="Content"
                    value={board?.content || ''}
                    disabled
                    multiline
                    minRows={6}
                    maxRows={20}
                    sx={{ borderRadius: '4px' }}
                />
                <Button variant="outlined" onClick={handleEditClick}>Edit</Button>
                <Button variant="outlined" /* onClick={handleDeleteClick} */>Delete</Button>
                <Button variant="outlined" onClick={handleCancelClick}>Cancel</Button>
            </Box>
        </Container>
    );
};

export default BoardReadPage;