import {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import * as query from "../../../util/baseQuery";

export function RestaurantTable() {
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
    const handleShow = (action,row,e) =>{ 
        setFormData(row)

        setAction(action);
        setShow(true);
    };

    const handleSave = () => {
        setShow(false)
        if(action == "Edytuj"){
            updateItem(formData)
        }
        if(action == "Dodaj"){
            addItem(formData)
        }
    }
    
    const getData = () => {
        query.getData("/api/restaurant",alert).then(res=>{
            setState(res)
        });
    }

    const addItem = (data) => {
        query.addItem("/api/restaurant",alert,data).then(res=>{
            getData()
        });
    };

    const updateItem = (data) => {
        query.updateItem(`/api/restaurant/${data.id_restaurant}`,alert,data).then(res=>{
            getData()
        });
    };

    const deleteItem = (id) => {
        query.deleteItem(`/api/restaurant/${id}`,alert,{}).then(res=>{
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
                    <th>Adres</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Opis</th>
                    <th>Widoczne dla użytkowników</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {state.map((row,i)=>(
                    <tr key={i}>
                        <td>{row.id_restaurant}</td>
                        <td>{row.name}</td>
                        <td>{row.address}</td>
                        <td>{row.latitude}</td>
                        <td>{row.longitude}</td>
                        <td>{row.description}</td>
                        <td>{row.publish.toString()}</td>
                        <td>
                        <Button variant="primary" onClick={handleShow.bind(this,"Edytuj",row)}>
                            Edytuj
                        </Button>
                        <Button variant="danger" onClick={deleteItem.bind(this,row.id_restaurant)}>
                            Usuń
                        </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Button variant="success" onClick={handleShow.bind(this,"Dodaj", {})}>
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
                        <Form.Label>Adres: </Form.Label>
                        <Form.Control type="text"  name="address"  value={formData.address} onChange={e => handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Latitude: </Form.Label>
                        <Form.Control type="text" name="latitude"  value={formData.latitude} onChange={e =>  handleInputChange(e)} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Longitude: </Form.Label>
                        <Form.Control type="text" name="longitude"  value={formData.longitude} onChange={e => handleInputChange(e)} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Opis: </Form.Label>
                        <Form.Control type="text" name="description"  value={formData.description} onChange={e => handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Check type="checkbox" name="publish"  label="Widoczne dla użytkowników" checked={formData.publish} onChange={e => handleInputChange(e)} />
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
