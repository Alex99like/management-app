import { ITask, ITaskReq } from '../types/tasks.type';
import { api } from './Api.service';

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], { boardId: string; columnsId: string }>({
      query: ({ boardId, columnsId }) => `boards/${boardId}/columns/${columnsId}`,
      providesTags: () => [{ type: 'Tasks' }],
    }),
    createTask: builder.mutation<ITask, { task: ITaskReq; boardId: string; columnsId: string }>({
      query: ({ boardId, columnsId, task }) => ({
        url: `boards/${boardId}/columns/${columnsId}`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: () => [{ type: 'Columns' }],
    }),
  }),
});

export const { useGetTasksQuery } = tasksApi;
