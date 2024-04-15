import {Outlet} from 'react-router-dom';
import styles from './CommonWrapper.module.scss';

export const CommonWrapper = () => {
    return (
        <div className={styles.wrapper}>
            {/* <Header /> */}
            <Outlet />
        </div>
    );
};
