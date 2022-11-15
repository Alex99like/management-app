import React, { FC, PropsWithChildren } from 'react';
import { IButton } from '../elements.props';
import styles from './Button.module.scss';

export const Button: FC<PropsWithChildren<IButton>> = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};
