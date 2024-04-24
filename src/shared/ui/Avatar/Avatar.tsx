import { Tools } from '@/shared/lib';
import { Avatar as AntdAvatar } from 'antd';
import { AvatarProps } from './Avatar.types';
import classNames from 'classnames';
import styles from './Avatar.module.scss';

export const Avatar = ({ src, size, name, className }: AvatarProps) => {
    return (
        <AntdAvatar
            src={src}
            size={size}
            className={classNames(styles.avatar, className)}
        >
            {Tools.getFirstLetter(name)}
        </AntdAvatar>
    );
};
