import {Button, Col, Container, Form, InputGroup, Row, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../configs/axios";
import {handleDelete, handleDrop, vnd} from "../../configs/functions";
import Loading from "../Loading/Loading";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getProductList = async () => {
      const productList = await axiosClient.get("/products");
      setProductList(productList.products);
      setLoading(false);
    };

    getProductList();
  }, []);

  return (
    <Container>
      {loading && <Loading />}
      <Row>
        <Col>
          <div className="d-flex justify-content-between mt-5">
            <h3 className="text-primary">Product Management</h3>
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
               to="/products/add"
               className="text-decoration-none text-light"
           >
             Add new product
           </Link>
         </Button>
       </div>
          {productList.length > 0 ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Thumbnail</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.length > 0 &&
                  productList.map((p, i) => (
                    <tr key={p._id} id={'hihi'}>
                      <td>{i + 1}</td>
                      <td className="w-[120px] text-center">
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={p.thumbnails[0].thumbnail}
                          alt={p.name}
                        />
                      </td>
                      <td>{p.name}</td>
                      <td>{vnd(p.price)}</td>
                      <td>{p.quantity}</td>
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
                              "products/delete",
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
