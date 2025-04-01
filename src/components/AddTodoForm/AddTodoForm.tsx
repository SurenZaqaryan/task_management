import { FaPlus } from 'react-icons/fa6';
import styles from './style.module.css';
import { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addTodo } from '../../redux/todosSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { v4 as uuidv4 } from 'uuid';

const AddTodoForm: FC = () => {
  const [todoName, setTodoName] = useState('');
  const { id: userID } = useSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  const notify = useCallback(() => {
    toast('The task name must be longer than 3 characters');
  }, []);

  const handleAddTodo: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (todoName.length <= 3) {
        notify();
        return;
      }

      dispatch(addTodo({ userID, id: uuidv4(), name: todoName }));
      setTodoName('');
    },
    [todoName, dispatch, notify, userID],
  );

  return (
    <>
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
          <button type="submit" className={styles.add_todo_btn}>
            <FaPlus size={24} color="rgb(55, 130, 134" />
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddTodoForm;
