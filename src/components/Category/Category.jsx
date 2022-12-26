import {Button, Col, Container, Form, InputGroup, Row, Table} from "react-bootstrap";
import { handleDelete, handleDrop } from "../../configs/functions";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../configs/axios";
import Loading from "../Loading/Loading";
import { tmdbAPI } from "../../configs/apiConfig";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      const data = await axiosClient.get("categories");
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
          <div className="d-flex justify-content-between mt-5">
            <h3 className="text-primary">Category Management</h3>
          </div>
          <div className={'d-flex justify-content-between'}>
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
            <Button className="my-2 float-end" variant="success">
              <Link
                  to="/categories/add"
                  className="text-decoration-none text-light"
              >
                Add new category
              </Link>
            </Button>{" "}
          </div>
          {categoryList.length > 0 ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.length > 0 &&
                  categoryList.map((c, i) => (
                    <tr key={c._id} id={'hihi'}>
                      <td>{i + 1}</td>
                      <td>{c.name}</td>
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
                              "categories/delete",
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
