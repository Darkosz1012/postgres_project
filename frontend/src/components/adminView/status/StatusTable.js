import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import * as query from "../../../util/baseQuery";

export function StatusTable() {
    const alert = useAlert();
    const [state, setState] = useState([])
    const [formData, setFormData] = useState({});
    const [show, setShow] = useState(false)
    const [action, setAction] = useState("")

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormData(s => {
            return { ...s, [name]: value }
        });

    }

    useEffect(() => {
        getData()
    }, [])


    const handleClose = () => setShow(false);
    const handleShow = (action, row, e) => {
        setFormData(row);

        setAction(action);
        setShow(true);
    };

    const handleSave = () => {
        setShow(false)
        if (action == "Edytuj") {
            updateItem(formData)
        }
        if (action == "Dodaj") {
            addItem(formData)
        }
    }

    const getData = () => {
        query.getData("/api/status",alert).then(res=>{
            setState(res)
        });
    }

    const addItem = (data) => {
        query.addItem("/api/status",alert,data).then(res=>{
            getData()
        });
    };

    const updateItem = (data) => {
        query.updateItem(`/api/status/${data.id_status}`,alert,data).then(res=>{
            getData()
        });
    };

    const deleteItem = (id) => {
        query.deleteItem(`/api/status/${id}`,alert,{}).then(res=>{
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
                        <th>Nazwa</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((row, i) => (
                        <tr key={i}>
                            <td>{row.id_status}</td>
                            <td>{row.name}</td>
                            <td>
                                <Button variant="primary" onClick={handleShow.bind(this, "Edytuj", row)}>
                                    Edytuj
                        </Button>
                                <Button variant="danger" onClick={deleteItem.bind(this, row.id_status)}>
                                    Usuń
                        </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="success" onClick={handleShow.bind(this, "Dodaj", {})}>
                Dodaj
        </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group >
                            <Form.Label>Nazwa: </Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={e => handleInputChange(e)} />
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
