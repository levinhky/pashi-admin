import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { handleDelete, handleDrop } from "../../configs/functions";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../configs/axios";
import Loading from "../Loading/Loading";
import { tmdbAPI } from "../../configs/apiConfig";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const data = await axiosClient.get("/api/v2/categories");
      setCategoryList(data);
      setLoading(false);
    };
    getCategories();
    // tmdbAPI.getCategories("categories", setCategoryList())
    // tmdbAPI.getCategories();
  }, []);

  return (
    <Container>
      {loading && <Loading />}
      <Row>
        <Col>
          <div className="d-flex justify-content-between">
            <h3 className="text-primary">Category Management</h3>
            <span
              className="cu-pointer text-warning text-decoration-underline"
              onClick={() => {
                handleDrop("/api/v2/categories/drop");
                setCategoryList([]);
              }}
            >
              Delete All Categories
            </span>
          </div>
          <Button className="my-2 float-end" variant="success">
            <Link
              to="/categories/add"
              className="text-decoration-none text-light"
            >
              Add new category
            </Link>
          </Button>{" "}
          {categoryList.length > 0 ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.length > 0 &&
                  categoryList.map((c, i) => (
                    <tr key={c._id}>
                      <td>{i + 1}</td>
                      <td>{c.categoryName}</td>
                      <td>{c.products.length} products in this category</td>
                      <td>
                        <Button variant="info">
                          <Link
                            className="text-white text-decoration-none"
                            to={`/categories/edit/${c._id}`}
                          >
                            Edit
                          </Link>
                        </Button>{" "}
                        <Button
                          onClick={() => {
                            handleDelete(
                              "/api/v2/categories/delete",
                              c._id,
                              setCategoryList
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
            <h4 className="mt-5 text-center"> Categories are empty now!</h4>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
