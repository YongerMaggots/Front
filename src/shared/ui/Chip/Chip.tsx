import classNames from 'classnames';
import styles from './Chip.module.scss';
import { ChipProps } from './Chip.types';

export const Chip = ({ children, className }: ChipProps) => {
    return (
        <span className={classNames(styles.chip, className)}>{children}</span>
    );
};
