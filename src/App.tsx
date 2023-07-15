import React from 'react';
import Todos from './components/Todos';
import DisplayTodos from './components/DisplayTodos';

import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.root}>
      <h1>Todo App</h1>
      <Todos />
      <DisplayTodos />
    </div>
  );
}

export default App;
