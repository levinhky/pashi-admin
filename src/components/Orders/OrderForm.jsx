import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {handleEdit, handleGetOne, handlePost, vnd} from "../../configs/functions";
import {useNavigate, useParams} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {toastError} from "../../configs/toasts";

const OrderForm = () => {
    const [orderDetail, setOrderDetail] = useState({});
    const [status, setStatus] = useState('');
    const [products, setProducts] = useState([]);
    const [range, setRange] = useState(0);
    const navigate = useNavigate();
    const {orderId} = useParams();

    useEffect(() => {
        const getOrder = async () => {
            handleGetOne("orders", orderId).then((order) => {
                setOrderDetail(order);
                setStatus(order.status)
                setProducts(order.products);
                console.log(order)
                if (order.status === 'Chờ xử lý') {
                    setRange(1)
                } else if (order.status === 'Đang giao hàng') {
                    setRange(2)
                } else if (order.status === 'Giao hàng thành công') {
                    setRange(3)
                } else{
                    setRange(4)
                }
            })
        }
        if (orderId) getOrder();
    }, [orderId])

    const handleSave = async () => {
        orderDetail.status = status;
        status === '' ? toastError('Vui lòng nhập trạng thái phù hợp') : await handleEdit("orders/update", orderId, orderDetail).then(
            (res) => setTimeout(() => navigate("/orders"), 1500)
        );
    };
    return (
        <Container>
            <Row>
                <Col>
                    <Form
                        className="p-4 mb-5 bg-white border rounded shadow-sm"
                    >
                        <h3 className="mb-3">
                            {!orderId ? 'Create order' : `Edit order - ${orderId}`}
                        </h3>

                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2" className={'fs-5'}>
                                Email
                            </Form.Label>
                            <Col sm="10" className={'fs-4'}>
                                {orderDetail.email}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2" className={'fs-5'}>
                                Full Name
                            </Form.Label>
                            <Col sm="10" className={'fs-4'}>
                                {orderDetail.fullName}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2" className={'fs-5'}>
                                Delivery Method
                            </Form.Label>
                            <Col sm="10" className={'fs-4'}>
                                {orderDetail.deliveryMethod}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2" className={'fs-5'}>
                                Shipping
                            </Form.Label>
                            <Col sm="10" className={'fs-4'}>
                                {orderDetail.shipping}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2" className={'fs-5'}>
                                Address
                            </Form.Label>
                            <Col sm="10" className={'fs-4'}>
                                {orderDetail.address}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2" className={'fs-5'}>
                                Total
                            </Form.Label>
                            <Col sm="10" className={'fs-4'}>
                                {vnd(+orderDetail.total)}
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exxx">
                            <Form.Label column sm="2"  className={'fs-5'}>
                                Items Ordered
                            </Form.Label>
                            <Table striped bordered hover className={'mb-4'}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>SKU</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Sizes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product,index) => (
                                    <tr key={product._id}>
                                        <td>{index+1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.sku}</td>
                                        <td>{vnd(product.price)}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.sizes.map((size,index) => {
                                            return (
                                               <div key={size._id}>
                                                   {index+1}. Size: <span>{size.size}</span> -
                                                  Qty: <span>{size.quantity}</span>
                                               </div>
                                            )
                                        })}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2"  className={'fs-5'}>Status</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="category"
                                className={'w-25 fs-4'}
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                            >
                                <option value="">-- Please select ---</option>
                                <option disabled={range > 1} value="Chờ xử lý">Chờ xử lý</option>
                                <option disabled={range > 2} value="Đang giao hàng">Đang giao hàng</option>
                                <option disabled={range > 3} value="Giao hàng thành công">Giao hàng thành công</option>
                                <option value="Đã hủy">Đã hủy</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 fs-5" controlId="exxx">
                            <Form.Label column sm="2">
                                Created At
                            </Form.Label>
                            <Col sm="10" className={'fs-4'}>
                                {orderDetail?.createdAt?.substring(0, 10)}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 fs-5" controlId="exxx">
                            <Form.Label column sm="2">
                                Updated At
                            </Form.Label>
                            <Col sm="10" className={'fs-4'}>
                                {orderDetail?.updatedAt?.substring(0, 10)}
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={handleSave}>
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderForm;
