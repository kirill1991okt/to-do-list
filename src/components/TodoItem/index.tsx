import React from 'react';
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
    <li key={todo.id} className={styles.card}>
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
          <button onClick={onChangeFocus}>
            <AiFillEdit />
          </button>
        )}
        {!todo.completed && (
          <button onClick={() => onCompletedTodo(todo.id)}>
            <IoCheckmarkDoneSharp />
          </button>
        )}
        <button onClick={() => onRemoveTask(todo.id)}>
          <IoClose />
        </button>
      </div>
      {todo.completed && <span>done</span>}
    </li>
  );
};

export default TodoItem;
