import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Todo from '../Todo/Todo';
import { CiSearch } from 'react-icons/ci';
import { getTodos } from '../../redux/todosSlice';
import { ClipLoader, SyncLoader } from 'react-spinners';

function TodosList() {
  const [tab, setTab] = useState('all');
  const { todos } = useSelector((state: RootState) => state.todos);
  const { id: userID } = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [isPaginationLoading, setPaginationLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!/^\s+$/.test(debouncedQuery)) {
      dispatch(getTodos({ userID, query: debouncedQuery }));
    }
  }, [debouncedQuery, dispatch, userID]);

  useEffect(() => {
    dispatch(getTodos({ userID }));
  }, [dispatch, userID]);

  const groupSize = 5;
  const startIndex = (activePage - 1) * groupSize;
  const endIndex = startIndex + groupSize;

  const filteredTodos = todos.filter((todo) => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return todo.isCompleted === false;
    } else {
      return todo.isCompleted === true;
    }
  });

  const handleChangeActivePage = (page: number) => {
    setPaginationLoading(true);

    setTimeout(() => {
      setActivePage(page);
      setPaginationLoading(false);
    }, 1000);
  };

  const totalPages = Math.ceil(filteredTodos.length / groupSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <div className={styles.tabs_wrapper}>
        <div className={styles.tabs_container}>
          <div
            onClick={() => setTab('all')}
            className={styles.tab}
            style={{
              color: tab === 'all' ? 'rgb(55, 130, 134)' : 'grey',
            }}>
            All
          </div>
          <div
            onClick={() => setTab('active')}
            className={styles.tab}
            style={{
              color: tab === 'active' ? 'rgb(55, 130, 134)' : 'grey',
            }}>
            Active
          </div>
          <div
            onClick={() => setTab('completed')}
            className={styles.tab}
            style={{
              color: tab === 'completed' ? 'rgb(55, 130, 134)' : 'grey',
            }}>
            Completed
          </div>
        </div>
        <div className={styles.input_wrapper}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search_input}
          />
          {isLoading ? (
            // @ts-ignore
            <ClipLoader color="rgb(55, 130, 134)" size={20} />
          ) : (
            <CiSearch size={20} color="rgb(55, 130, 134)" />
          )}
        </div>
      </div>

      <div className={styles.todos_wrapper}>
        {isPaginationLoading ? (
          <div className={styles.loading_wrapper}>
            {
              // @ts-ignore
              <SyncLoader color="rgb(55, 130, 134)" size={20} />
            }
          </div>
        ) : (
          filteredTodos.slice(startIndex, endIndex).map((todo) => {
            // @ts-ignore
            return <Todo key={todo.id} todo={todo} />;
          })
        )}
      </div>
      <div className={styles.page_numbers_wrapper}>
        {pageNumbers.map((page) => {
          return (
            <div
              style={{
                color: activePage === page ? 'rgb(55, 130, 134)' : 'rgb(90, 90, 90)',
                border:
                  activePage === page ? '1px solid rgb(55, 130, 134)' : '1px solid rgb(90, 90, 90)',
              }}
              className={styles.page_number}
              key={page}
              onClick={() => handleChangeActivePage(page)}>
              {page}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodosList;
