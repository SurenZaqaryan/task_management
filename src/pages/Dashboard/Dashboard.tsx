import AddTodoForm from '../../components/AddTodoForm/AddTodoForm';
import Header from '../../components/Header/Header';
import TodosList from '../../components/TodosList/TodosList';
import styles from './style.module.css';

function Dashboard() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <AddTodoForm />
          <TodosList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
