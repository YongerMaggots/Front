import { Popover } from 'antd';
import styles from './AddNewChildrenButton.module.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export const AddNewChildrenButton = ({ error }: { error?: boolean }) => {
    const navigate = useNavigate();

    const handleNavigateToChildren = () => {
        navigate('/child/new');
    };

    return (
        <Popover content={<>Добавить нового ребенка</>}>
            <button
                className={classNames(styles.container, {
                    [styles.error]: error,
                })}
                onClick={handleNavigateToChildren}
            >
                <button className={styles.button}>+</button>
            </button>
        </Popover>
    );
};
