import { FC } from 'react';
import AddTodoForm from '../../components/AddTodoForm/AddTodoForm';
import Header from '../../components/Header/Header';
import TodosList from '../../components/TodosList/TodosList';
import styles from './style.module.css';

const Dashboard: FC = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <AddTodoForm />
        <TodosList />
      </div>
    </>
  );
};

export default Dashboard;
