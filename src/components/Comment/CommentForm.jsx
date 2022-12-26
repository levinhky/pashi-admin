import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {handleEdit, handleGetOne} from "../../configs/functions";
import {toastError} from "../../configs/toasts";

const CommentForm = () => {
    const [commentContent, setCommentContent] = useState("");
    const [display, setDisplay] = useState(true);
    const [commentDetail, setCommentDetail] = useState({});
    const [createdAt, setCreatedAt] = useState('');
    const navigate = useNavigate();
    const {commentId} = useParams();

    useEffect(() => {
        const getComment = async () => {
            handleGetOne("comments", commentId).then((comment) => {
                setCommentContent(comment?.commentContent);
                setDisplay(comment?.display);
                setCommentDetail(comment);
                setCreatedAt(comment.createdAt);
            })
        }
        if (commentId) getComment();
    }, [commentId]);

    const handleSave = async () => {
        if (!display) {
            toastError('Please select valid value');
        } else {
            handleEdit("comments/update", commentId, { display: display}).then((res) =>
                setTimeout(() => navigate("/comments"), 1500)
            );
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form
                        className="p-4 mb-5 bg-white border rounded shadow-sm mt-5"
                    >
                        <h3 className="mb-3">
                            {!commentId ? 'Create comment' : `Edit comment`}
                        </h3>

                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                User Name
                            </Form.Label>
                            <Col sm="10">
                                {commentDetail.displayName}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                Content
                            </Form.Label>
                            <Col sm="10">
                                {commentContent}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                Product Name
                            </Form.Label>
                            <Col sm="10">
                                {commentDetail.productName}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">Status</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="status"
                                className={'w-25'}
                                value={display}
                                onChange={(e) => setDisplay(e.target.value)}
                            >
                                <option value="">-- Please select ---</option>
                                <option value={true}>Hiện</option>
                                <option value={false}>Ẩn</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="exxx">
                            <Form.Label column sm="2">
                                Created At
                            </Form.Label>
                            <Col sm="10">
                                {createdAt.slice(0, 10)}
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={handleSave}>
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CommentForm;