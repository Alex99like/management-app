import { IColumn, IColumnReq } from '../types/column.type';
import { api } from './Api.service';

export const columnApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query<IColumn[], { boardId: string }>({
      query: ({ boardId }) => `boards/${boardId}/columns`,
      providesTags: () => [{ type: 'Columns' }],
    }),
    createBoard: builder.mutation<IColumn, { column: IColumnReq; boardId: string }>({
      query: ({ boardId, column }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body: column,
      }),
      invalidatesTags: () => [{ type: 'Columns' }],
    }),
  }),
});

export const { useLazyGetColumnsQuery } = columnApi;
