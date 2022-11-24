export interface IColumnReq {
  title: string;
  tasks: Array<{ id: number; task: string }>;
}

export interface IColumn extends IColumnReq {
  id: number;
  order: Array<number>;
}
