import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { handlePost } from "../../configs/functions";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object({});

const CategoryForm = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const [catName, setCatName] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    await handlePost("/api/v2/categories", { categoryName: catName }).then(
      (res) => setTimeout(() => navigate("/categories"), 1500)
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form
            className="p-3 p-4 mb-5 bg-white border rounded shadow-sm"
            onSubmit={handleSubmit(handleSave)}
          >
            <h3 className="mb-3">Add category</h3>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter category name"
                onChange={(e) => setCatName(e.target.value)}
              />
              {errors.name && (
                <p style={{ color: "red", margin: "10px 0" }}>
                  {errors.name.message}
                </p>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryForm;
