import React from 'react';
import { TextField, Button, Box, Container, OutlinedInput } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { registerBoard } from '../api/BoardApi';
import { useNavigate } from 'react-router-dom';

const BoardRegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(registerBoard, {
        onSuccess: (data) => {
            queryClient.setQueryData('board', data); // 데이터 갱신
            navigate(`/read/${data.boardId}`); // BoardReadPage로 이동
        },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            elements: {
                title: { value: string };
                writer: { value: string };
                content: { value: string };
            };
        };

        const { title, writer, content } = target.elements;

        const data = {
            title: title.value,
            writer: writer.value,
            content: content.value,
        };

        const board = await mutation.mutateAsync(data);
        //navigate(`/read/${board.boardId}`);
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2} p={2}>
                    <TextField
                        label="Title"
                        name="title"
                        sx={{ borderRadius: '4px' }} // Adjust the border radius here
                    />
                    <TextField
                        label="Writer"
                        name="writer"
                        sx={{ borderRadius: '4px' }} // Adjust the border radius here
                    />
                    <TextField
                        label="Content"
                        name="content"
                        multiline
                        minRows={6}
                        maxRows={20} // Adjust the maximum number of rows here
                        sx={{ borderRadius: '4px' }} // Adjust the border radius here
                    />
                    <Button type="submit">Submit</Button>
                </Box>
            </form>
        </Container>
    );
};

export default BoardRegisterPage;
