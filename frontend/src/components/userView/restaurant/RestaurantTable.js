import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { authFetch ,UserId} from '../../../util/authProvider'
import { useAlert } from 'react-alert'
export function RestaurantTable() {
    const alert = useAlert()
    const [state, setState] = useState([])
    const [dataRestaurant, setDataRestaurant] = useState({})
    const [opinionRestaurant, setRestaurantOpinions] = useState({})
    const [idRestaurant, setIdRestaurant] = useState(0)
    const [show, setShow] = useState(false);
    const [action, setAction] = useState("");
    const [opinion, setOpinion] = useState("")
    const [rate, setRate] = useState("")
    useEffect(() => {
        getRestaurant();
    }, [])


    const handleClose = () => setShow(false);
    const handleShow = (row) => {
        setIdRestaurant(row.id_restaurant)
        setShow(true);

        setOpinion(row.opinion || "")
        setRate(row.rate || "5")
    };
    const handleSave = async() => {
        try{
            var res = await ( await authFetch(`/api/review`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content:opinion, rating:rate, id_user :UserId.getUserId(), id_restaurant:idRestaurant })
            })).json();
            if(res.success){
                alert.success(res.message);
            }else{
                alert.error(JSON.stringify(res.message));
            }
        }catch(err) {
            alert.error(JSON.stringify(err));
        }
        setShow(false)
    }

    //drugi modal( opinie userów ):
    const [showOpinions, setShowOpinions] = useState(false);
    const handleCloseOp = () => setShowOpinions(false);
    const handleShowOp = (id) => {
        // console.log(id);
        setRestaurantOpinions({})
        authFetch(`/api/restaurant/` + id)
            .then(r => r.json())
            .then(data => {
                setRestaurantOpinions(data.res)
            })
        setShowOpinions(true);
    }

    //trzeci modal (zamówienia):
    const [showOrders, setShowOrders] = useState(false);
    const [address, setAddress] = useState("");
    const handleCloseOr = () => setShowOrders(false);
    const handleShowOr = (row) => {
        // console.log(id);
        setDataRestaurant({});
        setAddress("");
        setIdRestaurant(row.id_restaurant)
        authFetch(`/api/restaurant/` + row.id_restaurant)
            .then(r => r.json())
            .then(data => {
                data.res.products.map((item) => {
                    item.quantity = "0";
                })
                setDataRestaurant(data.res)
            })
        setShowOrders(true);
    }
    const handleSaveOr = async() => {
        try{
            var res = await ( await authFetch(`/api/order/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id_user: UserId.getUserId(), id_restaurant:idRestaurant, address, products: dataRestaurant.products})
            })).json();
            if(res.success){
                alert.success(res.message);
            }else{
                alert.error(JSON.stringify(res.message));
            }
        }catch(err) {
            alert.error(JSON.stringify(err));
        }
        setShow(false)
        setShowOrders(false)
    }

 
    

    const getRestaurant = () => {
        authFetch(`/api/restaurant`)
            .then(r => r.json())
            .then(data => {
                setState(data.res)
            })

    }
    
    return (
        <>
            <Table responsive striped bordered hover size="md">
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Adres</th>
                        <th>Opis</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((row, i) => (
                        <tr key={i}>
                            <td>{row.name}</td>
                            <td>{row.address}</td>
                            <td>{row.description}</td>
                            <td>
                                <Button variant="success" onClick={handleShow.bind(this, row)}>
                                    Prześlij opinię
                                </Button>
                                <Button variant="success" onClick={handleShowOp.bind(this, row.id_restaurant)}>
                                    Opinie
                                </Button>
                                <Button variant="success" onClick={handleShowOr.bind(this, row)}>
                                    Zamów
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group >
                            <Form.Label>Opinia: </Form.Label>
                            <Form.Control as="textarea" rows={10} value={opinion} onChange={e => setOpinion(e.target.value)} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Check type="range" min="0" max="10" step="1" value={rate} onChange={e => setRate(e.target.value)} />
                            {rate}
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

            {/* opinie  */}
            <Modal show={showOpinions} onHide={handleCloseOp}>
                <Modal.Header closeButton>
                    <Modal.Title>Opinie klientów: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive striped bordered hover size="md">
                        <thead>
                            <tr>
                                <th>Opinia</th>
                                <th>Ocena</th>
                            </tr>
                        </thead>
                        <tbody>
                            {opinionRestaurant.reviews ? opinionRestaurant.reviews.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.content}</td>
                                    <td>{row.rating}/10</td>
                                </tr>
                            )) : ""}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOp}>
                        Zamknij
            </Button>

                </Modal.Footer>
            </Modal>
            {/* zamówienia */}

            <Modal show={showOrders} onHide={handleCloseOr}>
                <Modal.Header closeButton>
                    <Modal.Title>Złóż zamówienie:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group >
                            <Form.Label>Adres: </Form.Label>
                            <Form.Control type="text" placeholder="Odbiór osobisty" value={address} onChange={e => setAddress(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <Table responsive striped bordered hover size="md">
                        <thead>
                            <tr>
                                <th>Nazwa</th>
                                <th>Cena</th>
                                <th>Opis</th>
                                <th>Ilość</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataRestaurant.products ? dataRestaurant.products.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.name}</td>
                                    <td>{row.price}</td>
                                    <td>{row.description}</td>
                                    <td>

                                        <Form>
                                            <Form.Group>

                                                <Form.Control type="number" min="0" max="100" value={row.quantity} onChange={e => setDataRestaurant(s => {
                                                    var tmp = { ...s };
                                                    if (tmp.products[i].quantity > 100) {
                                                        tmp.products[i].quantity = 100;
                                                    }
                                                    else if (tmp.products[i].quantity < 0) {
                                                        tmp.products[i].quantity = 0;
                                                    }
                                                    else {
                                                        tmp.products[i].quantity = e.target.value;
                                                    }
                                                    return tmp;
                                                })} />
                                            </Form.Group>
                                        </Form>
                                    </td>
                                </tr>
                            )) : ""}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOr}>
                        Anuluj
            </Button>
                    <Button variant="primary" onClick={handleSaveOr}>
                        Zamów
            </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
