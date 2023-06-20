import { UseQueryResult, useQuery } from 'react-query';
import { Board } from '../entity/Board';
import { useBoardStore } from '../store/BoardStore';
import { springAxiosInst } from '../../../utility/axiosInst';

export const fetchBoardList = async (): Promise<Board[]> => {
  const response = await springAxiosInst.get<Board[]>('/jpa-board/list');
  return response.data;
};

const useBoardList = (): UseQueryResult<Board[], unknown> => {
  const setBoards = useBoardStore((state) => state.setBoards);

  const queryResult: UseQueryResult<Board[], unknown> = useQuery('boardList', fetchBoardList, {
    onSuccess: (data) => {
      setBoards(data);
    },
  });

  return queryResult;
};

export default useBoardList;
