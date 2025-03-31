import { IoMdClose } from 'react-icons/io';
import styles from './style.module.css';
import { BarLoader } from 'react-spinners';

function LogoutModal({
  setIsModalActive,
  handleLogout,
  isLoading,
}: {
  handleLogout: () => void;
  setIsModalActive: (value: boolean) => void;
  isLoading: boolean;
}) {
  return (
    <div className={styles.container} onClick={() => setIsModalActive(false)}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close_btn_wrapper}>
          <IoMdClose onClick={() => setIsModalActive(false)} size={24} cursor="pointer" />
        </div>
        <div className={styles.title_and_text_wrapper}>
          <h2 className={styles.title}>Logout Confirmation</h2>
          <span className={styles.text}>Are you sure you want to logout?</span>
        </div>

        <div>
          {isLoading ? (
            <div className={styles.btns_wrapper}>
              {
                // @ts-ignore
                <BarLoader color="rgb(55, 130, 134)" />
              }
            </div>
          ) : (
            <div className={styles.btns_wrapper}>
              <button onClick={() => handleLogout()} className={styles.confirm_btn}>
                Logout
              </button>
              <button onClick={() => setIsModalActive(false)} className={styles.cancel_btn}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
