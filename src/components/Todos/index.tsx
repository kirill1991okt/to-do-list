import React from 'react';
import { nanoid } from 'nanoid';
import { useAppDispatch } from '../../redux/hooks';
import { addTodos, IData } from '../../redux/slices/todoReducer';

import styles from './todos.module.scss';

const Todos: React.FC = () => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = React.useState<string>('');

  const handelChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  };

  const onAddTodo = (): void => {
    const data: IData = {
      id: nanoid(),
      item: todo,
      completed: false,
    };
    dispatch(addTodos(data));
    setTodo('');
  };

  return (
    <div className={styles.root}>
      <input
        type='text'
        onChange={(e) => handelChanges(e)}
        className={styles.input}
        value={todo}
      />
      <button onClick={onAddTodo}>Add Task</button>
    </div>
  );
};

export default Todos;
