import { useDispatch } from 'react-redux';
import { changeTodo, deleteTodo, toggleIsCompleted } from '../../redux/todosSlice';
import { CiEdit } from 'react-icons/ci';
import styles from './style.module.css';
import { useState } from 'react';

type TodoType = {
  id: string;
  name: string;
  userID: string;
  isCompleted: boolean;
};

function Todo({ todo }: { todo: TodoType }) {
  const { name, id, isCompleted } = todo;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleDeleteTodo = () => {
    dispatch(deleteTodo({ id }));
  };

  const handleToggleIsCompleted = () => {
    dispatch(toggleIsCompleted({ id }));
  };

  const handleSaveChanges = () => {
    dispatch(changeTodo({ id, newName: editedName }));
    setIsEditMode(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.name_and_checkbox_wrapper}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggleIsCompleted}
          className={styles.is_completed_checkbox}
        />
        {isEditMode ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className={styles.todo_name_edit_input}
          />
        ) : (
          <span className={styles.todo_name}>{name}</span>
        )}
      </div>

      {isEditMode ? (
        <div className={styles.cancel_and_save_btns_wrapper}>
          <button
            onClick={() => {
              setIsEditMode(false);
              setEditedName(name);
            }}
            className={styles.cancel_btn}>
            Cancel
          </button>
          <button onClick={handleSaveChanges} className={styles.save_btn}>
            Save
          </button>
        </div>
      ) : (
        <div className={styles.edit_and_delete_wrapper}>
          <CiEdit
            cursor={'pointer'}
            size={24}
            className={styles.edit_btn}
            onClick={() => setIsEditMode(true)}
          />
          <button onClick={handleDeleteTodo} className={styles.delete_btn}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Todo;
