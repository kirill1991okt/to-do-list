import React from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { IData, selectState } from '../../redux/slices/todoReducer';
import {
  changeSort,
  selectSort,
  sortState,
} from '../../redux/slices/sortReducer';
import TodoItem from '../TodoItem';

import styles from './displayTodos.module.scss';

const DisplayTodos = () => {
  const dispatch = useAppDispatch();
  const todoArray = useAppSelector(selectState);
  const sort = useAppSelector(selectSort);

  return (
    <div className={styles.display}>
      <div className={styles.buttons}>
        <button onClick={() => dispatch(changeSort(sortState.ALL))}>All</button>
        <button onClick={() => dispatch(changeSort(sortState.ACTIVE))}>
          Active
        </button>
        <button onClick={() => dispatch(changeSort(sortState.COMPLETED))}>
          Completed
        </button>
      </div>
      <ul>
        {todoArray.length > 0 && sort === sortState.ACTIVE
          ? todoArray.map((todo: IData) => {
              return !todo.completed && <TodoItem key={todo.id} todo={todo} />;
            })
          : null}
        {todoArray.length > 0 && sort === sortState.COMPLETED
          ? todoArray.map((todo: IData) => {
              return todo.completed && <TodoItem key={todo.id} todo={todo} />;
            })
          : null}
        {todoArray.length > 0 && sort === sortState.ALL
          ? todoArray.map((todo: IData) => {
              return <TodoItem key={todo.id} todo={todo} />;
            })
          : null}
      </ul>
    </div>
  );
};

export default DisplayTodos;
