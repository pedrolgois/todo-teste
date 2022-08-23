// @flow fsc
import React, { useEffect, useState } from 'react';
import { todoData, userData } from '../../App';
import { TodoItem } from '../TodoItem';

import styles from './index.module.css';

type Props = {
    todos: todoData[];
    user: userData;
    setOpenModal: any,
    setTodos: any,
};

export const TodosModal = (props: Props) => {
    const [userTodos, setUserTodos] = useState<todoData[]>(props.todos.filter((t) => t.userId == props.user.id))
    const [newTodo, setNewTodo] = useState<string>('');

    // Função que filtra os TODO's de acordo com o select (todos, concluidos, pendentes)
    const filterTodos = (filter: string) =>{
        const _todos = props.todos.filter((t) => t.userId === props.user.id);
        if(filter === '1'){
            return _todos.filter((t) => t.completed === false);
        }else if(filter === '2'){
            return _todos.filter((t) => t.completed === true);
        } else{
            return _todos;
        }
    };

    // Função que envia o todo novo e adiciona a resposta da requisição a lista de todos os TODO's
    const addTodo = () =>{
        if(newTodo != ''){
            fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify({
                completed: false,
                title: newTodo,
                userId: props.user.id,
                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    const _todos = props.todos;
                    _todos.unshift(json);
                    props.setTodos(_todos);
                    setUserTodos(_todos.filter((t) => t.userId === props.user.id));
                });   
            setNewTodo('');
        } else{
            alert('Digite um TODO valido')
        }
    };

    // Função que atualiza o TODO selecionado, marcando ou desmarcando ele como concluido
    const updateTodo = (_todo: todoData) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${_todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({
            completed: _todo.completed ? false : true,
            title: _todo.title,
            userId: _todo.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                const _todos = props.todos;
                _todos[_todos.findIndex((t)=> t.id === _todo.id)]  = json;
                props.setTodos(_todos);
                setUserTodos(_todos.filter((t) => t.userId === props.user.id));
            })
            // Este catch só existe pois os TODO's novos não existem no banco então irão dar erro na requisição
            // Ele então "simula" uma resposta, pra que ele atualize o marcador
            .catch(()=>{
                const _todos = props.todos;
                _todos[_todos.findIndex((t)=> t.id === _todo.id)]  = {
                    id: _todo.id,
                    completed: _todo.completed ? false : true,
                    title: _todo.title,
                    userId: _todo.userId,
                };
                props.setTodos(_todos);
                setUserTodos(_todos.filter((t) => t.userId === props.user.id));
            });   
    }

    return (
        <div className={styles.modal}>
            <div className={styles.bgClose} onClick={()=>props.setOpenModal(false)}/>
            <div className={styles.container}>
                <h1 className={styles.title}>My todos</h1>
                <div className={styles.add}>
                    <div>
                        <input 
                            placeholder='Add new...'
                            name='todoText'
                            onChange={(e) => setNewTodo(e.target.value)}
                            value={newTodo} 
                        />
                        <button onClick={addTodo}>+</button>  
                    </div>
                </div>
                <div className={styles.filter}>
                    <label>Filtro: </label>
                    <select 
                        name='' 
                        onChange={(e) => setUserTodos(filterTodos(e.target.value))}
                    >
                        <option value='0'>Todos</option>
                        <option value='1'>Pendentes</option>
                        <option value='2'>Concluidos</option>
                    </select>
                </div>
                <span className={styles.xClose} onClick={()=>props.setOpenModal(false)}>X</span>
                {userTodos.map((todo)=>{
                    return(
                        <TodoItem todo={todo} updateTodo={updateTodo}/>
                    )
                })}            
            </div>
        </div>
    );
};