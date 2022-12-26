import {Button, Col, Container, Form, InputGroup, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../../configs/axios";
import Loading from "../Loading/Loading";
import {Link} from "react-router-dom";
import {handleDelete} from "../../configs/functions";

const OrderList = () => {

    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');


    useEffect(() => {
        const getOrders = async () => {
            const data = await axiosClient.get("orders");
            setOrderList(data);
            console.log(data)
            setLoading(false);
        };
        getOrders();
    }, []);

    return (
        <Container>
            {loading && <Loading />}
            <Row>
                <Col>
                    <div className="d-flex justify-content-between mt-5">
                        <h3 className="text-primary">Order Management</h3>
                    </div>
                    <InputGroup size="sm" className="mb-3 w-50">
                        <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
                        <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={(e) => {
                                setSearch(e.target.value)
                                const value = search.trim().toLowerCase();
                                document.querySelectorAll('#hihi').forEach(item => {
                                    if (value === '') item.classList.remove('andi');
                                    !item.innerText.toLowerCase().includes(value) ? item.classList.add('andi') : item.classList.remove('andi');
                                })
                            }}
                        />
                    </InputGroup>
                    {orderList.length > 0 ? (
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Shipping</th>
                                <th>Delivery Method</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderList.length > 0 &&
                                orderList.map((c, i) => (
                                    <tr key={c._id} id={'hihi'}>
                                        <td>{i + 1}</td>
                                        <td>{c.fullName}</td>
                                        <td>{c.email}</td>
                                        <td>{c.shipping}</td>
                                        <td>{c.deliveryMethod}</td>
                                        <td>{c.status}</td>
                                        <td>{c.createdAt.substring(0,10)}</td>
                                        <td>
                                            <Button variant="info">
                                                <Link
                                                    className="text-white text-decoration-none"
                                                    to={`/orders/update/${c._id}`}
                                                >
                                                    View
                                                </Link>
                                            </Button>{" "}
                                            <Button
                                                onClick={() => {
                                                    handleDelete(
                                                        "orders/delete",
                                                        c._id,
                                                        setOrderList
                                                    );
                                                }}
                                                variant="danger"
                                            >
                                                Delete
                                            </Button>{" "}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <h4 className="mt-5 text-center"> Orders are empty now!</h4>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default OrderList;