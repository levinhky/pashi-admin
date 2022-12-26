import {Button, Col, Container, Form, InputGroup, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {handleDelete} from "../../configs/functions";
import Loading from "../Loading/Loading";
import axiosClient from "../../configs/axios";
const Comment = () => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const data = await axiosClient.get("comments");
            setComments(data);
            console.log(data)
            setLoading(false);
        };
        getCategories();

    }, [])

    return (
        <Container>
            {loading && <Loading />}
            <Row>
                <Col>
                    <div className="d-flex justify-content-between mt-5">
                        <h3 className="text-primary">Comment Management</h3>
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
                    {comments.length > 0 ? (
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Product</th>
                                <th>Content</th>
                                <th>Display</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {comments.length > 0 &&
                                comments.map((c, i) => (
                                    <tr key={c._id} id={'hihi'}>
                                        <td>{i + 1}</td>
                                        <td>{c.displayName}</td>
                                        <td>{c.productName}</td>
                                        <td>{c.commentContent}</td>
                                        <td>{c.display ? 'Hiện' : 'Ẩn'}</td>
                                        <td>{c.createdAt.slice(0,10)}</td>
                                        <td>{c.updatedAt.slice(0,10)}</td>
                                        <td>
                                            <Button variant="info">
                                                <Link
                                                    className="text-white text-decoration-none"
                                                    to={`/comments/edit/${c._id}`}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>{" "}
                                            <Button
                                                onClick={() => {
                                                    handleDelete(
                                                        "comments/delete",
                                                        c._id,
                                                        setComments
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
                        <h4 className="mt-5 text-center"> There are no comments!</h4>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export  default  Comment;