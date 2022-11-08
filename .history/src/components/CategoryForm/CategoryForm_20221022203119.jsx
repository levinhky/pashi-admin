import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {useState} from "react";
import {handlePost} from "../../configs/functions";
import {useNavigate} from "react-router-dom";

const CategoryForm = () => {
    const [catName,setCatName] = useState('');
    const navigate = useNavigate();

    const handleSave = async () => {
        await handlePost('/api/v2/categories',{categoryName:catName}).then(res => setTimeout(() =>navigate('/categories'),1500));
    }


    return (
        <Container>
            <Row>
                <Col>
                <Form className="border p-4 shadow-sm p-3 mb-5 bg-white rounded">
                <h3 className="mb-3">Add category</h3>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"  placeholder="Enter category name" onChange={(e) => setCatName(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
    </Form>
        </Col>
            </Row>
        </Container>
    )
}

export default CategoryForm