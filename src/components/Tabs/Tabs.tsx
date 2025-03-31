import { memo } from 'react';
import styles from './style.module.css';

type TabsProps = { handleChangeTab: (page: string) => void; tab: string };

function Tabs({ handleChangeTab, tab }: TabsProps) {
  return (
    <div className={styles.tabs_container}>
      <div
        onClick={() => handleChangeTab('all')}
        className={styles.tab}
        style={{
          color: tab === 'all' ? 'rgb(55, 130, 134)' : 'grey',
        }}>
        All
      </div>
      <div
        onClick={() => handleChangeTab('active')}
        className={styles.tab}
        style={{
          color: tab === 'active' ? 'rgb(55, 130, 134)' : 'grey',
        }}>
        Active
      </div>
      <div
        onClick={() => handleChangeTab('completed')}
        className={styles.tab}
        style={{
          color: tab === 'completed' ? 'rgb(55, 130, 134)' : 'grey',
        }}>
        Completed
      </div>
    </div>
  );
}

export default memo(Tabs);
