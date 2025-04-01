import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './style.module.css';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import Todo from '../Todo/Todo';
import { CiSearch } from 'react-icons/ci';
import { getTodos } from '../../redux/todosSlice';
import { ClipLoader, SyncLoader } from 'react-spinners';
import Pagination from '../Pagination/Pagination';
import Tabs from '../Tabs/Tabs';

const TodosList: FC = () => {
  const GROUP_SIZE = 5;
  const [tab, setTab] = useState('all');
  const { todos } = useSelector((state: RootState) => state.todos);
  const { id: userID } = useSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [isPaginationLoading, setPaginationLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const isEmptyQuery = useMemo(() => {
    return (debouncedQuery: string) => /^\s+$/.test(debouncedQuery);
  }, []);

  // setting debounced query effect
  useEffect(() => {
    if (isFirstRender || isEmptyQuery(query)) {
      return;
    }
    setIsLoading(true);

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, isFirstRender, isEmptyQuery]);

  // get todos request

  useEffect(() => {
    dispatch(getTodos({ userID, query: debouncedQuery }));
  }, [dispatch, userID, debouncedQuery]);

  const handleChangeActivePage = useCallback(
    (page: number) => {
      if (activePage === page) return;
      setPaginationLoading(true);
      setActivePage(page);

      setTimeout(() => {
        setPaginationLoading(false);
      }, 1000);
    },
    [activePage],
  );

  const handleChangeTab = useCallback((tab: string) => {
    setTab(tab);
    setQuery('');
    setDebouncedQuery('');
  }, []);

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        if (tab === 'all') {
          return true;
        } else if (tab === 'active') {
          return todo.isCompleted === false;
        } else {
          return todo.isCompleted === true;
        }
      })
      .reverse();
  }, [todos, tab]);

  const startIndex = (activePage - 1) * GROUP_SIZE;
  const endIndex = startIndex + GROUP_SIZE;
  const totalPages = Math.ceil(filteredTodos.length / GROUP_SIZE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const todosToShow = useMemo(() => {
    return filteredTodos.slice(startIndex, endIndex);
  }, [startIndex, endIndex, filteredTodos]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs_wrapper}>
        <Tabs tab={tab} handleChangeTab={handleChangeTab} />

        <div className={styles.input_wrapper}>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsFirstRender(false);
            }}
            className={styles.search_input}
          />
          {isLoading ? (
            // @ts-ignore
            <ClipLoader size={20} color="rgb(55, 130, 134)" />
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
              <SyncLoader size={10} color="rgb(55, 130, 134)" />
            }
          </div>
        ) : filteredTodos.length ? (
          todosToShow.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })
        ) : (
          <div className={styles.no_todos_message_wrapper}>
            {debouncedQuery ? (
              <span className={styles.no_todos_message}>No todos with name - {debouncedQuery}</span>
            ) : (
              <span className={styles.no_todos_message}>No todos with status {tab}</span>
            )}
          </div>
        )}
      </div>

      <Pagination
        pageNumbers={pageNumbers}
        activePage={activePage}
        handleChangeActivePage={handleChangeActivePage}
      />
    </div>
  );
};

export default memo(TodosList);
