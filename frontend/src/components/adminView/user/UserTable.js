import {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import * as query from "../../../util/baseQuery";

export function UserTable() {
    const alert = useAlert();
    const [state, setState] = useState([])
    const [id_user, setIdUser] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [show, setShow] = useState(false)
    const [action, setAction] = useState("")

    useEffect(() => {
        getData();
    }, [])
    

    const handleClose = () => setShow(false);
    const handleShow = (action,row,e) =>{ 
        setIdUser(row.id_user || 0)
        setUsername(row.username || "");
        setPassword("");
        setRole(row.role || "");

        setAction(action);
        setShow(true);
    };

    const handleSave = () => {
        setShow(false)
        if(action == "Edytuj"){
            updateItem({id_user, username,password,role})
        }
        if(action == "Dodaj"){
            addItem({username,password,role})
        }
    }
    
    const getData = () => {
        query.getData("/api/user",alert).then(res=>{
            setState(res)
        });
    }

    const addItem = (data) => {
        query.addItem("/api/user",alert,data).then(res=>{
            getData()
        });
    };

    const updateItem = (data) => {
        query.updateItem(`/api/user/${data.id_user}`,alert,data).then(res=>{
            getData()
        });
    };

    const deleteItem = (id) => {
        query.deleteItem(`/api/user/${id}`,alert,{}).then(res=>{
            getData()
        });
    };

    if(!Array.isArray(state)){
        return (<></>)
    }
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
                        <Button variant="danger" onClick={deleteItem.bind(this,row.id_user)}>
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
            <Modal.Title>{action}</Modal.Title>
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
            <Button variant="primary" onClick={handleSave}>
                Zapisz
            </Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}
