import { IBoard, IBoardReq } from '../types/board.type';
import { api } from './Api.service';

export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<IBoard[], void>({
      query: () => 'boards',
      providesTags: () => [{ type: 'Boards' }],
    }),
    createBoard: builder.mutation<IBoard, IBoardReq>({
      query: (board) => ({
        url: 'boards',
        method: 'POST',
        body: board,
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
  }),
});

export const { useGetBoardsQuery, useCreateBoardMutation } = boardApi;
