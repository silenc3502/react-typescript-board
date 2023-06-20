import {UseQueryResult, useQuery, useMutation, UseMutationResult} from 'react-query';
import { Board } from '../entity/Board';
import { useBoardStore } from '../store/BoardStore';
import { springAxiosInst } from '../../../utility/axiosInst';

export const fetchBoardList = async (): Promise<Board[]> => {
  const response = await springAxiosInst.get<Board[]>('/jpa-board/list');
  return response.data;
};

const useBoardListQuery = (): UseQueryResult<Board[], unknown> => {
  const setBoards = useBoardStore((state) => state.setBoards);

  const queryResult: UseQueryResult<Board[], unknown> = useQuery('boardList', fetchBoardList, {
    onSuccess: (data) => {
      setBoards(data);
    },
  });

  return queryResult;
};

export const registerBoard = async (data: { title: string; writer: string; content: string }): Promise<void> => {
  await springAxiosInst.post('/jpa-board/register', data);
};

export const useBoardRegisterMutation = (): UseMutationResult<void, unknown, { title: string; writer: string; content: string }> => {
  return useMutation(registerBoard);
};

export default useBoardListQuery;
