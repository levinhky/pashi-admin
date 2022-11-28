import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {useEffect, useState} from "react";
import {handleEdit, handleGetOne, handlePost, vnd} from "../../configs/functions";
import {useNavigate, useParams} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
    name: yup.string().required("Please enter category name"),
});

const OrderForm = () => {
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

    const [prodName, setProdName] = useState("");
    const [orderDetail, setOrderDetail] = useState({});
    const navigate = useNavigate();
    const {orderId} = useParams();

    useEffect(() => {
        const getOrder = async () => {
            handleGetOne("orders",orderId).then((order) => {
                setProdName(order?.name);
                setOrderDetail(order);
                console.log(order)
            })
        }
        if (orderId) getOrder();
    },[orderId])

    const handleSave = async () => {
        !orderId ?
            await handlePost("categories", { name: prodName }).then(
                (res) => setTimeout(() => navigate("/categories"), 1500)
            ) :
            await handleEdit("categories/update", orderId, { name: prodName }).then(
                (res) => setTimeout(() => navigate("/categories"), 1500)
            );
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form
                        className="p-4 mb-5 bg-white border rounded shadow-sm"
                        onSubmit={handleSubmit(handleSave)}
                    >
                        <h3 className="mb-3">
                            {!orderId ? 'Create order' : `Edit order - ${orderId}`}
                        </h3>

                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                User
                            </Form.Label>
                            <Col sm="10">
                                {orderDetail.email}
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter category name"
                                defaultValue={prodName || ""}
                                onChange={(e) => setProdName(e.target.value)}
                            />
                            {errors.name && (
                                <p style={{ color: "red", margin: "10px 0" }}>
                                    {errors.name.message}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                SKU
                            </Form.Label>
                            <Col sm="10">
                                {orderDetail.sku}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="10">
                                {vnd(orderDetail.price)}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                Quantity
                            </Form.Label>
                            <Col sm="10">
                                {orderDetail.quantity}
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="category"
                            >
                                <option value="">-- Please select ---</option>
                                <option value="Đang giao hàng">Đang giao hàng</option>
                                <option value="Giao hàng thành công">Giao hàng thành công</option>
                                <option value="Đã hủy">Hủy đơn hàng</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                Delivery Method
                            </Form.Label>
                            <Col sm="10">
                                {orderDetail.deliveryMethod}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                Address
                            </Form.Label>
                            <Col sm="10">
                                {orderDetail.address}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                Created At
                            </Form.Label>
                            <Col sm="10">
                                {orderDetail?.createdAt?.substring(0,10)}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                Updated At
                            </Form.Label>
                            <Col sm="10">
                                {orderDetail?.updatedAt?.substring(0,10)}
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSave}>
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderForm;
