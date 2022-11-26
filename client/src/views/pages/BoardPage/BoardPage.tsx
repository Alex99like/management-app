import { NavLink } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import Column from '../../components/Column/Column';
import styles from './BoardPage.module.scss';
import {
  useCreateColumnMutation,
  useGetColumnsQuery,
  useUpdateColumnMutation,
} from '../../../services/Column.service';
import { useGetBoardsQuery } from '../../../services/Board.service';
import { useAppSelector } from '../../../store/store';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loder-border.json';
import cn from 'classnames';
import { FormColumn } from '../../components/FormColumn/FormColumn';
import { useFormColumn } from '../../components/FormColumn/useFormColumn';
import { useEffect, useState } from 'react';
import { IColumnReq } from '../../../types/column.type';
import { toastr } from 'react-redux-toastr';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

function BoardPage() {
  const boardId = useAppSelector((state) => state.root.boardId);

  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useGetColumnsQuery({ boardId });
  const { data: boardData } = useGetBoardsQuery();
  const { activeModal, column, closeModal, type, callCreate } = useFormColumn();

  const [create, { isSuccess, data: dataItem, isLoading: isLoadingCreate }] =
    useCreateColumnMutation();

  const [update, { isLoading: isLoadingUpdate }] = useUpdateColumnMutation();

  useEffect(() => {
    if (isSuccess) {
      toastr.success('Success!', `Column created ${dataItem ? dataItem.title : ''}!`);
      closeModal();
    }
  }, [dataItem, isSuccess]);

  useEffect(() => {
    if (isLoadingCreate && !isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && !isLoadingUpdate) setLoading(false);
  }, [isLoadingCreate, isLoadingUpdate]);

  const handleCreateColumn = (data: IColumnReq) => {
    if (type === 'create') create({ column: { title: data.title }, boardId });
  };

  const dragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      const changedColumn = data?.find((column) => {
        if (destination.index > source.index) {
          column.order === destination.index + 1;
          return column;
        } else {
          column.order === destination.index - 1;
          return column;
        }
      });
      const actualColumn = data?.find((column) => column.id === draggableId);
      if (actualColumn && changedColumn) {
        update({
          column: { order: destination.index + 1, title: actualColumn.title },
          boardId,
          columnsId: actualColumn.id,
        });
        update({
          column: { order: source.index + 1, title: changedColumn.title },
          boardId,
          columnsId: changedColumn.id,
        });
      }
      return;
    }

    const start = data?.find((column) => column.id === source.droppableId);
    const finish = data?.find((column) => column.id === destination.droppableId);

    if (start === finish) {
      console.log(result);
      useEffect(() => {
        const { data } = useGetTasksQuery({ boardId, columnsId: props.id });
      })
      // const newTaskOrder = Array.from(start.order);
      // newTaskOrder.splice(source.index, 1);
      // newTaskOrder.splice(destination.index, 0, draggableId);

      // const newColumn = {
      //   ...start,
      //   order: newTaskOrder,
      // };

      // const newState = {
      //   ...data,
      //   columns: {
      //     ...data.columns,
      //     [newColumn.id]: newColumn,
      //   },
      // };
      // setData(newState);
      return;
    }
    // else {
    //   const startTaskOrder = Array.from(start.order);
    //   startTaskOrder.splice(source.index, 1);
    //   const newStart = {
    //     ...start,
    //     order: startTaskOrder,
    //   };

    //   const finishTaskOrder = Array.from(finish.order);
    //   finishTaskOrder.splice(destination.index, 0, draggableId);
    //   const newFinish = {
    //     ...finish,
    //     order: finishTaskOrder,
    //   };

    // const newState = {
    //   ...data,
    //   columns: {
    //     ...data.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };
    // setData(newState);
    // }
  };
  //console.log('DATA', data); [{id: '8069b527-d7ec-4dbe-85cb-f758f7624edf', title: 'Mall', order: 1}, {id: '209bff6e-4a4f-4d3f-967a-9bfa4f886a91', title: 'SHHH', order: 2}]

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Lottie
          className={cn(styles.loader, { [styles.active]: isLoading })}
          animationData={Loader}
        />
      ) : (
        <>
          {activeModal && (
            <FormColumn
              handleColumn={handleCreateColumn}
              column={column}
              activeModal={activeModal}
              close={closeModal}
              loading={loading}
            />
          )}
          <div className={styles.topPanel}>
            <NavLink to="/main" className={styles.button}>
              <img src={arrow} alt="arrow" className={styles.arrow} />
              Back
            </NavLink>
            <h3>{boardData?.find((board) => board.id === boardId)?.title || ''}</h3>
          </div>
          <DragDropContext onDragEnd={dragEndHandler}>
            <Droppable droppableId="all" direction="horizontal" type="column">
              {(provided) => (
                <div className={styles.board} {...provided.droppableProps} ref={provided.innerRef}>
                  {data &&
                    data.map((column, index) => {
                      return (
                        <Column key={column.id} id={column.id} title={column.title} index={index} />
                      );
                    })}
                  <div>
                    <AddButton title="column" callCreate={callCreate} />
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </div>
  );
}

export default BoardPage;
