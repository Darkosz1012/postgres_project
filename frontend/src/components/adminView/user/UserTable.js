import {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import { authFetch } from '../../../util/authProvider'
import { Button, Modal, Form } from 'react-bootstrap';

export function UserTable() {

    const [state, setState] = useState([])
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [show, setShow] = useState(false)

    useEffect(() => {
        getUser();
    }, [])
    

    const handleClose = () => setShow(false);
    const handleShow = (action,row) =>{ 
        console.log(row)
        setUsername(row.username || "");
        setPassword("");
        setRole(row.role || "");
        setShow(true);
    };
    
    const getUser = () =>{
        authFetch(`/api/user`)
        .then(r => r.json())
        .then(data => {
            setState(data.res)
        })
    }

    const addUser = (data) =>{ 
        authFetch(`/api/user`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
            getUser();
        })
    };

    const updateUser = (data) =>{ 
        authFetch(`/api/user/${data.id_user}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
            getUser();
        })
    };

    const deleteUser = (id) =>{ 
        authFetch(`/api/user/${id}`,{
            method:"DELETE"
        })
        .then(r => r.json())
        .then(data => {
            getUser();
        })
    };
    return (
        <>
        <Table responsive striped bordered hover size="md">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Nazwa użytkownika</th>
                    <th>Hasło</th>
                    <th>Rola</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {state.map((row,i)=>(
                    <tr key={i}>
                        <td>{row.id_user}</td>
                        <td>{row.username}</td>
                        <td>{row.password}</td>
                        <td>{row.role}</td>
                        <td>
                        <Button variant="primary" onClick={handleShow.bind(this,"Edytuj",row)}>
                            Edytuj
                        </Button>
                        <Button variant="danger" onClick={deleteUser.bind(this,row.id_user)}>
                            Usuń
                        </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Button variant="success" onClick={handleShow.bind(this,"Dodaj")}>
            Dodaj
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group >
                        <Form.Label>Nazwa użytkownika: </Form.Label>
                        <Form.Control type="text"  value={username} onChange={e => setUsername(e.target.value)} />
                        
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Hasło: </Form.Label>
                        <Form.Control type="password"  value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Rola: </Form.Label>
                        <Form.Control type="text"  value={role} onChange={e => setRole(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Anuluj
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Zapisz
            </Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}
