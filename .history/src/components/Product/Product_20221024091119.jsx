import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../configs/axios";
import { handleDelete, handleDrop } from "../../configs/functions";
import Loading from "../Loading/Loading";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductList = async () => {
      const productList = await axiosClient.get("/api/v2/products");
      setProductList(productList);
      setLoading(false);
    };

    getProductList();
  }, []);

  return (
    <Container>
      {loading && <Loading />}
      <Row>
        <Col>
          <div className="d-flex justify-content-between">
            <h3 className="text-primary">Product Management</h3>
            <span
              className="cu-pointer text-warning text-decoration-underline"
              onClick={() => {
                handleDrop("/api/v2/products/drop");
                setProductList([]);
              }}
            >
              Delete All Products
            </span>
          </div>
          <Button className="my-2 float-end" variant="success">
            <Link
              to="/products/add"
              className="text-decoration-none text-light"
            >
              Add new product
            </Link>
          </Button>{" "}
          {productList.length > 0 ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Thumbnail</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.length > 0 &&
                  productList.map((p, i) => (
                    <tr key={p._id}>
                      <td>{i + 1}</td>
                      <td className="w-[120px] text-center">
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={p.thumbnails[0].thumbnail}
                          alt={p.name}
                        />
                      </td>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td>{p.quantity}</td>
                      <td>{p.sizes}</td>
                      <td>
                        <Button variant="info">
                          <Link
                            className="text-white text-decoration-none"
                            to={`/products/edit/${p._id}`}
                          >
                            Edit
                          </Link>
                        </Button>{" "}
                        <Button
                          onClick={() => {
                            handleDelete(
                              "/api/v2/products/delete",
                              p._id,
                              setProductList
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
            <h4 className="mt-5 text-center"> Products are empty now!</h4>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
