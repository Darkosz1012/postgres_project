import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import * as query from "../../../util/baseQuery";

export function OrderTable() {
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
        query.getData("/api/order",alert).then(res=>{
            setState(res)
        });
    }

    const addItem = (data) => {
        query.addItem("/api/order",alert,data).then(res=>{
            getData()
        });
    };

    const updateItem = (data) => {
        query.updateItem(`/api/order/${data.id_order}`,alert,data).then(res=>{
            getData()
        });
    };

    const deleteItem = (id) => {
        query.deleteItem(`/api/order/${id}`,alert,{}).then(res=>{
            getData()
        });
    };

    const deleteItemAll = (id) => {
        query.deleteItem(`/api/order/all/${id}`,alert,id).then(res=>{
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
                        <th>id użytkownika</th>
                        <th>id restauracji</th>
                        <th>id status</th>
                        <th>Data</th>
                        <th>Adres</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((row, i) => (
                        <tr key={i}>
                            <td>{row.id_order}</td>
                            <td>{row.id_user}</td>
                            <td>{row.id_restaurant}</td>
                            <td>{row.id_status}</td>
                            <td>{row.date}</td>
                            <td>{row.address}</td>
                            <td>
                                <Button variant="primary" onClick={handleShow.bind(this, "Edytuj", row)}>
                                    Edytuj
                        </Button>
                                <Button variant="danger" onClick={deleteItem.bind(this, row.id_order)}>
                                    Usuń
                        </Button>
                            <Button variant="danger" onClick={deleteItemAll.bind(this, row.id_order)}>
                                        Usuń z powiązaniami 
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
                            <Form.Label>Id użytkownika: </Form.Label>
                            <Form.Control type="text" name="id_user" value={formData.id_user} onChange={e => handleInputChange(e)} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Id restauracji: </Form.Label>
                            <Form.Control type="text" name="id_restaurant" value={formData.id_restaurant} onChange={e => handleInputChange(e)} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Id status: </Form.Label>
                            <Form.Control type="text" name="id_status" value={formData.id_status} onChange={e => handleInputChange(e)} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Data: </Form.Label>
                            <Form.Control type="text"  name="date" value={formData.date} onChange={e => handleInputChange(e)} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Adres: </Form.Label>
                            <Form.Control type="text" name="address" value={formData.address} onChange={e => handleInputChange(e)} />
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
