// @flow 
import React from 'react';
import { todoData } from '../../App';

import styles from './index.module.css'

type Props = {
    todo: todoData;
    updateTodo: any;
};

export const TodoItem = (props: Props) => {
    
    return (
        <div className={[styles.todo, styles[props.todo.completed.toString()]].join(' ')}>
            <input 
                type="checkbox" 
                checked={props.todo.completed} 
                onChange={()=> props.updateTodo(props.todo)}
                title={`marcar como ${props.todo.completed ? 'pendente' : 'completo'}`}
                data-toggle="tooltip"
                data-placement="bottom"
            />
            <h2>{props.todo.title}</h2>
        </div>
    );
};