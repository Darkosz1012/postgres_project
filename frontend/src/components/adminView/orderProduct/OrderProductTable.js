import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import * as query from "../../../util/baseQuery";

export function OrderProductTable() {
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
        query.getData("/api/order-product",alert).then(res=>{
            setState(res)
        });
    }

    const addItem = (data) => {
        query.addItem("/api/order-product",alert,data).then(res=>{
            getData()
        });
    };

    const updateItem = (data) => {
        query.updateItem(`/api/order-product/${data.id_orders_products}`,alert,data).then(res=>{
            getData()
        });
    };

    const deleteItem = (id) => {
        query.deleteItem(`/api/order-product/${id}`,alert,{}).then(res=>{
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
                        <th>id zamówienia</th>
                        <th>id produktu</th>
                        <th>Ilość</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((row, i) => (
                        <tr key={i}>
                            <td>{row.id_orders_products}</td>
                            <td>{row.id_order}</td>
                            <td>{row.id_product}</td>
                            <td>{row.quantity}</td>
                            <td>
                                <Button variant="primary" onClick={handleShow.bind(this, "Edytuj", row)}>
                                    Edytuj
                        </Button>
                                <Button variant="danger" onClick={deleteItem.bind(this, row.id_orders_products)}>
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
                            <Form.Label>id zamówienia: </Form.Label>
                            <Form.Control type="number" name="id_order" value={formData.id_order} onChange={e => handleInputChange(e)} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>id produktu: </Form.Label>
                            <Form.Control type="number" name="id_product" value={formData.id_product} onChange={e => handleInputChange(e)} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Ilość: </Form.Label>
                            <Form.Control type="number" name="quantity" value={formData.quantity} onChange={e => handleInputChange(e)} />
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
