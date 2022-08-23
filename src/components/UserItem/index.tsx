// @flow 
import * as React from 'react';
import { userData } from '../../App';

import styles from './index.module.css'

type Props = {
    user: userData,
    setOpenModal: any,
    setUser: any,
};

export const UserItem = (props: Props) => {
    return (
        <div className={styles.user} onClick={()=> {props.setOpenModal(true); props.setUser(props.user)}}>
            <div className={styles.icon}>{props.user.name[0]}</div>
            <div className={styles.info}>
                <h2>{props.user.name}</h2>
                <small>{props.user.email}</small>
            </div>
            <div className={styles.acess}>
            </div>
        </div>
    );
};