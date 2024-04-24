import './reset.css';
import '@/shared/main.module.css';

import styles from './CommonWrapper.module.scss';

import { Outlet } from 'react-router-dom';
import { CustomHeader } from '@/widgets';

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
