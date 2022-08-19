import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { UserItem } from './components/UserItem';

export type userData = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: any,
    phone: string,
    website: string,
    company: any,
}

type todoData = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}

function App() {
    const [users, setUsers] = useState<userData[]>([]);
    const [todos, setTodos] = useState<todoData[]>([]);

    const listUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((users) => {
            setUsers(users);
        });
    }

    const listTodos = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.json())
        .then((todos) => {
            setTodos(todos);
        });
    }

    useEffect(()=>{
        listUsers();
    },[])

    useEffect(()=>{
        console.log(users)
    },[users])

  return (
    <div className="App">
      <Container>
        <Row>
            <Col sm={6} className={'usersList'}>
                {users.map((user) => {
                    return(
                        <UserItem user={user}/>
                    )
                })}
            </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
