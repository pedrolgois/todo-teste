import React, { useEffect, useState } from 'react';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { UserItem } from './components/UserItem';
import { TodosModal } from './components/TodosModal';

// Tipagem dos dados do usuário
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

// Tipagem dos TODO's
export type todoData = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}

function App() {
    const [todos, setTodos] = useState<todoData[]>([]);
    const [user, setUser] = useState<userData>({} as userData);
    const [users, setUsers] = useState<userData[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    // Lista todos os usuarios e todos os Todos
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.json())
        .then((todos) => {
            setTodos(todos);
        });
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((users) => {
            setUsers(users);
        });
    },[])

  return (
    <div className="App">
      <Container>
        <Row>
            <Col sm={6} className={'usersList'}>
                {users.map((user) => {
                    return(
                        <UserItem user={user} setOpenModal={setOpenModal} setUser={setUser}/>
                    )
                })}
            </Col>
        </Row>
      </Container>
      {openModal &&
        <TodosModal todos={todos} user={user} setOpenModal={setOpenModal} setTodos={setTodos}/>
      }
    </div>
  );
}

export default App;
