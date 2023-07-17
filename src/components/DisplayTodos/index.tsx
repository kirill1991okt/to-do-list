import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
        <motion.button
          className={sort === sortState.ALL ? styles.all : ''}
          whileHover={{ scale: 1.1, opacity: 0.9 }}
          whileTap={{ scale: 1 }}
          onClick={() => dispatch(changeSort(sortState.ALL))}
        >
          All
        </motion.button>
        <motion.button
          className={sort === sortState.ACTIVE ? styles.active : ''}
          whileHover={{ scale: 1.1, opacity: 0.9 }}
          whileTap={{ scale: 1 }}
          onClick={() => dispatch(changeSort(sortState.ACTIVE))}
        >
          Active
        </motion.button>
        <motion.button
          className={sort === sortState.COMPLETED ? styles.completed : ''}
          whileHover={{ scale: 1.1, opacity: 0.9 }}
          whileTap={{ scale: 1 }}
          onClick={() => dispatch(changeSort(sortState.COMPLETED))}
        >
          Completed
        </motion.button>
      </div>

      <ul>
        <AnimatePresence>
          {todoArray.length > 0 && sort === sortState.ACTIVE
            ? todoArray.map((todo: IData) => {
                return (
                  !todo.completed && <TodoItem key={todo.id} todo={todo} />
                );
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
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
