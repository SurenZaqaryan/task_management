import { FaPlus } from 'react-icons/fa6';
import styles from './style.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addTodo } from '../../redux/todosSlice';
import { RootState } from '../../redux/store';
import { v4 as uuidv4 } from 'uuid';

function AddTodoForm() {
  const [todoName, setTodoName] = useState('');
  const dispatch = useDispatch();
  const { id: userID } = useSelector((state: RootState) => state.user.user);

  const notify = () => toast('The task name must be longer than 3 characters');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoName.length <= 3) {
      notify();
      return;
    }

    dispatch(addTodo({ userID, id: uuidv4(), name: todoName }));
    setTodoName('');
  };

  return (
    <form className={styles.form} onSubmit={handleAddTodo}>
      <h2 className={styles.todos_title}>Todos</h2>
      <ToastContainer />
      <div className={styles.input_wrapper}>
        <input
          placeholder="Whats needs to be done?"
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className={styles.input}
        />
        <button className={styles.add_todo_btn}>
          <FaPlus size={24} color="rgb(55, 130, 134" />
        </button>
      </div>
    </form>
  );
}

export default AddTodoForm;
