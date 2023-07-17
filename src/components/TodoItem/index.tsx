import React from 'react';
import { motion } from 'framer-motion';
import { AiFillEdit } from 'react-icons/ai';
import { IoCheckmarkDoneSharp, IoClose } from 'react-icons/io5';
import { useAppDispatch } from '../../redux/hooks';
import {
  IData,
  completedTodos,
  removeTodos,
  updateTodos,
} from '../../redux/slices/todoReducer';

import styles from './todoItem.module.scss';

type TodoItemType = {
  todo: IData;
};

const TodoItem: React.FC<TodoItemType> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const [textValue, setTextValue] = React.useState(textAreaRef.current?.value);

  const onChangeFocus = (): void => {
    if (textAreaRef.current) {
      textAreaRef.current.disabled = false;
      textAreaRef.current.focus();
    }
  };

  const onRemoveTask = (id: string): void => {
    dispatch(removeTodos(id));
  };

  const onUpdateTodo = (
    e: React.KeyboardEvent,
    id: string,
    value: string
  ): void => {
    if (e.key === 'Enter') {
      if (textValue === '') {
        onRemoveTask(id);
      } else {
        if (textAreaRef.current) {
          textAreaRef.current.disabled = true;
        }
        dispatch(updateTodos({ id, item: value }));
      }
    }
  };

  const onBlurTextarea = (id: string, value: string): void => {
    if (textValue === '') {
      onRemoveTask(id);
    } else {
      if (textAreaRef.current) {
        textAreaRef.current.disabled = true;
      }
      dispatch(updateTodos({ id, item: value }));
    }
  };

  const onCompletedTodo = (id: string): void => {
    dispatch(completedTodos(id));
  };

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      exit={{ opacity: 0, scale: 0.7 }}
      key={todo.id}
      className={styles.card}
    >
      <textarea
        ref={textAreaRef}
        onChange={(e) => setTextValue(e.target.value)}
        defaultValue={todo.item}
        disabled={true}
        onKeyDown={(e) =>
          onUpdateTodo(e, todo.id, textAreaRef.current?.value as string)
        }
        onBlur={() =>
          onBlurTextarea(todo.id, textAreaRef.current?.value as string)
        }
      />
      <div className={styles.buttons}>
        {!todo.completed && (
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={onChangeFocus}
          >
            <AiFillEdit />
          </motion.button>
        )}
        {!todo.completed && (
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onCompletedTodo(todo.id)}
          >
            <IoCheckmarkDoneSharp style={{ color: 'green' }} />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemoveTask(todo.id)}
        >
          <IoClose style={{ color: 'red' }} />
        </motion.button>
      </div>
      {todo.completed && (
        <motion.span
          whileHover={{
            scale: 1.1,
            opacity: 0.9,
            textDecorationLine: 'line-through',
          }}
          whileTap={{ scale: 1 }}
          onClick={() => onCompletedTodo(todo.id)}
        >
          done
        </motion.span>
      )}
    </motion.li>
  );
};

export default TodoItem;
