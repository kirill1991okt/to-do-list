import React from 'react';
import { nanoid } from 'nanoid';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../redux/hooks';
import { addTodos, IData } from '../../redux/slices/todoReducer';
import Modal from 'react-responsive-modal';

import 'react-responsive-modal/styles.css';
import styles from './todos.module.scss';

const Todos: React.FC = () => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);

  const isModal = () => setOpen(!open);

  const sendTaskToReduce = () => {
    const data: IData = {
      id: nanoid(),
      item: todo,
      completed: false,
    };
    dispatch(addTodos(data));
    setTodo('');
  };

  const handelChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  };

  const onAddTodo = (): void => {
    if (todo === '') {
      isModal();
    } else {
      sendTaskToReduce();
    }
  };

  const onKeyAddTodo = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendTaskToReduce();
    }
  };

  return (
    <div className={styles.root}>
      <input
        type='text'
        onChange={(e) => handelChanges(e)}
        onKeyDown={(e) => onKeyAddTodo(e)}
        className={styles.input}
        value={todo}
      />
      <motion.button
        whileHover={{ scale: 1.1, opacity: 0.9 }}
        whileTap={{ scale: 0.9 }}
        onClick={onAddTodo}
      >
        Add Task
      </motion.button>
      <Modal
        open={open}
        onClose={isModal}
        classNames={{
          modal: styles.customModal,
        }}
      >
        <h2>Warning! </h2>
        <p>Field must be filled</p>
      </Modal>
    </div>
  );
};

export default Todos;
