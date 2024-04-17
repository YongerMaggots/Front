import {Outlet} from 'react-router-dom';
import {Header} from '@/widgets';
import './reset.css';
import styles from './CommonWrapper.module.scss';

export const CommonWrapper = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.content}>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
};
