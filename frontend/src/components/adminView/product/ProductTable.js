import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import * as query from "../../../util/baseQuery";

export function ProductTable() {
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
        getData();
    }, [])


    const handleClose = () => setShow(false);
    const handleShow = (action, row, e) => {
        setFormData(row);

        setAction(action);
        setShow(true);
    };

    const handleSave = () => {
        setShow(false)
        console.log(formData)
        if (action == "Edytuj") {
            updateItem(formData)
        }
        if (action == "Dodaj") {
            addItem(formData)
        }
    }

    const getData = () => {
        query.getData("/api/product",alert).then(res=>{
            setState(res)
        });
    }

    const addItem = (data) => {
        console.log("/api/product",data)
        query.addItem("/api/product",alert,data).then(res=>{
            console.log(res)
            getData()
        }).catch(err=>{
            console.log(err)
        });
    };

    const updateItem = (data) => {
        query.updateItem(`/api/product/${data.id_product}`,alert,data).then(res=>{
            getData()
        });
    };

    const deleteItem = (id) => {
        query.deleteItem(`/api/product/${id}`,alert,{}).then(res=>{
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
                        <th>Cena</th>
                        <th>Opis</th>
                        <th>id restauracji</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((row, i) => (
                        <tr key={i}>
                            <td>{row.id_product}</td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                            <td>{row.description}</td>
                            <td>{row.id_restaurant}</td>
                            <td>
                                <Button variant="primary" onClick={handleShow.bind(this, "Edytuj", row)}>
                                    Edytuj
                                </Button>
                                <Button variant="danger" onClick={deleteItem.bind(this, row.id_product)}>
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
                        <Form.Group >
                            <Form.Label>Cena: </Form.Label>
                            <Form.Control type="number" name="price" value={formData.price} step="0.01" onChange={e => handleInputChange(e)} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Opis: </Form.Label>
                            <Form.Control type="text" name="description" value={formData.description} onChange={e => handleInputChange(e)} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Id restauracji: </Form.Label>
                            <Form.Control type="number" name="id_restaurant" value={formData.id_restaurant} onChange={e => handleInputChange(e)} />
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
