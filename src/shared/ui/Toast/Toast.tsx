import { Icons } from '../Icons/Icons';
import styles from './Toast.module.scss';
import { ToastProps } from './Toast.types';
import cn from 'classnames';
import toast from 'react-hot-toast';

export const Toast = ({ appearence = 'success', message }: ToastProps) => {
    const getIcon = () => {
        switch (appearence) {
            case 'success':
                return Icons.success;
            case 'warning':
                return Icons.warning;
            case 'error':
                return Icons.error;
            default:
                return Icons.success;
        }
    };

    return toast(
        (t) => (
            <span className={styles.toast} onClick={() => toast.dismiss(t.id)}>
                <div
                    className={cn(styles['icon-wrapper'], {
                        [styles['success']]: appearence === 'success',
                        [styles['warning']]: appearence === 'warning',
                    })}
                >
                    <img
                        src={getIcon()}
                        width="40"
                        height="40"
                        alt="Успешно"
                        className={styles['icon']}
                    />
                </div>
                <div className={styles['message']}>{message}</div>
            </span>
        ),
        {
            className: styles['toast-wrapper'],
            position: 'top-right',
            duration: 3000,
        }
    );
};
