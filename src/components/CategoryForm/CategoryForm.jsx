import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {useEffect, useState} from "react";
import {handleEdit, handleGetOne, handlePost} from "../../configs/functions";
import {useNavigate, useParams} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  name: yup.string().required("Please enter category name"),
});

const CategoryForm = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const [catName, setCatName] = useState("");
  const navigate = useNavigate();
  const {categoryId} = useParams();

  useEffect(() => {
    const getCategory = async () => {
      handleGetOne("/api/v2/categories",categoryId).then((category) => {
        setCatName(category?.categoryName)
      })
    }
    if (categoryId) getCategory();
  },[categoryId])

  const handleSave = async () => {
    !categoryId ?
        await handlePost("/api/v2/categories", { categoryName: catName }).then(
            (res) => setTimeout(() => navigate("/categories"), 1500)
        ) :
        await handleEdit("/api/v2/categories/update", categoryId, { categoryName: catName }).then(
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
              {!categoryId ? 'Add category' : 'Edit category'}
            </h3>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter category name"
                defaultValue={catName || ""}
                onChange={(e) => setCatName(e.target.value)}
              />
              {errors.name && (
                <p style={{ color: "red", margin: "10px 0" }}>
                  {errors.name.message}
                </p>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSave}>
              Save
            </Button>
            {/* <button
              className={`w-full p-4 bg-blue-400 text-white rounded-lg mt-5 font-semibold ${
                isSubmitting ? "opacity-50" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                "Submit"
              )}
            </button> */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryForm;
