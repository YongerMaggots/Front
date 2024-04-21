import {Outlet} from 'react-router-dom';
import './reset.css';
import styles from './CommonWrapper.module.scss';
import {CustomHeader} from '@/widgets';

export const CommonWrapper = () => {
    return (
        <div className={styles.wrapper}>
            <CustomHeader />
            <main className={styles.content}>
                <Outlet />
            </main>
            {/* <CustomFooter /> */}
        </div>
    );
};
