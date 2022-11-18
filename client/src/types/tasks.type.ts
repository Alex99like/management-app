export interface ITaskReq {
  title: string;
  description: string;
  userId: string;
}

export interface ITask extends ITaskReq {
  order: number;
  boardId: string;
  columnId: string;
  id: string;
}
