import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../configs/firebase";
import axiosClient from "../../configs/axios";
import { handleEdit, handleGetOne, handlePost } from "../../configs/functions";
import { useNavigate, useParams } from "react-router-dom";
import { toastSuccess, toastError, toastWarning } from "../../configs/toasts";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Please enter product name"),
  price: yup.number().required("Please enter product price"),
  quantity: yup.number().required("Please enter quantity products"),
  category: yup
    .string()
    .required("Please choose category product")
    .oneOf(["top", "dress"], "You can only select top or dress"),
  image: yup.string().required("Please choose file image product"),
});

const ProductForm = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    reset,
    control,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  console.log(errors);

  const [pName, setPName] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pQty, setPQty] = useState("");
  const [pSizeS, setPSizeS] = useState("");
  const [pSizeM, setPSizeM] = useState("");
  const [pSizeL, setPSizeL] = useState("");
  const [pSizeSQty, setPSizeSQty] = useState("");
  const [pSizeMQty, setPSizeMQty] = useState("");
  const [pSizeLQty, setPSizeLQty] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pThumbnails, setPThumbnails] = useState([]);
  const [pVariants, setPVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    const getCategories = async () => {
      const data = await axiosClient.get("/api/v2/categories");
      setCategories(data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProductInfo = async () => {
      setIsLoading(true);
      handleGetOne("/api/v2/products", productId).then((info) => {
        setProductInfo(info);
        setPName(info.name);
        setPPrice(info.price);
        setPQty(info.quantity);
        setPCategory(info.categoryId?._id);
        setPThumbnails(info.thumbnails);
        setPVariants(info?.sizes);
        setPSizeS(info?.sizes[0]?.size);
        setPSizeM(info?.sizes[1]?.size);
        setPSizeL(info?.sizes[2]?.size);
        setPSizeSQty(info?.sizes[0]?.quantity);
        setPSizeMQty(info?.sizes[1]?.quantity);
        setPSizeLQty(info?.sizes[2]?.quantity);
        setIsLoading(false);
      });
    };
    if (productId) getProductInfo();
  }, [productId]);

  const handleUpdate = (size, qty) => {
    let values = {
      size: size,
      quantity: +qty,
    };

    const isValues = pVariants.find((v) => v.quantity === values.quantity);
    if (isValues) {
      toastError("Duplicated!");
    } else {
      setPVariants((curr) => [...curr, values]);
      toastSuccess("Updated");
    }
  };

  const handleChangeImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      setPThumbnails([]);
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setIsLoading(true);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Error");
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              toastWarning("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              toastWarning("User canceled the upload");
              break;
            case "storage/unknown":
              toastWarning(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
            default:
              console.log("Error");
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let data = {
              thumbnail: downloadURL,
            };
            setIsLoading(false);
            setPThumbnails((curr) => [...curr, data]);
          });
        }
      );
    }
  };
  // console.log(pVariants.sizes);
  const onSubmitHandler = async () => {
    if (!isValid) return;
    const saveData = {
      name: pName,
      price: pPrice,
      quantity: pQty,
      categoryId: pCategory,
      thumbnails: pThumbnails,
      sizes: pVariants,
    };
    !productId
      ? handlePost("/api/v2/products", saveData).then((res) =>
          setTimeout(() => navigate("/products"), 1500)
        )
      : handleEdit("/api/v2/products/update", productId, saveData).then((res) =>
          setTimeout(() => navigate("/products"), 1500)
        );
    console.log(saveData);
  };

  // console.log(onSubmitHandler);

  return (
    <Container>
      <Row>
        <Col>
          <Form
            className="p-4 mb-5 bg-white border rounded shadow-sm "
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <h3 className="mb-3">
              {!productId ? "New product" : "Edit product"}
            </h3>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                control={control}
                defaultValue={productInfo.name || ""}
                placeholder="Enter product name"
                onChange={(e) => setPName(e.target.value)}
              />
              {errors.name && (
                <p style={{ color: "red", margin: "10px 0" }}>
                  {errors.name.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="string"
                name="price"
                defaultValue={productInfo.price || ""}
                placeholder="Enter product price"
                onChange={(e) => setPPrice(e.target.value)}
              />
              {errors.price && (
                <p style={{ color: "red", margin: "10px 0" }}>
                  {errors.price.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                defaultValue={productInfo.quantity || ""}
                placeholder="Enter product quantity"
                onChange={(e) => setPQty(e.target.value)}
              />
              {errors.quantity && (
                <p style={{ color: "red", margin: "10px 0" }}>
                  {errors.quantity.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                onChange={(e) => setPCategory(e.target.value)}
                value={productInfo.categoryId?._id}
                aria-label="Default select example"
                name="category"
              >
                <option value="">-- Please select ---</option>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
              </Form.Select>
              {errors.category && (
                <p style={{ color: "red", margin: "10px 0" }}>
                  {errors.category.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter product price"
                multiple
                onChange={(e) => handleChangeImage(e)}
                name="image"
              />
              {pThumbnails.length > 0 &&
                pThumbnails.map((p, index) => (
                  <img
                    key={index}
                    src={p.thumbnail}
                    style={{
                      width: "200px",
                      height: "200px",
                      marginTop: "20px",
                    }}
                    alt=""
                  />
                ))}
              {isSubmitting && <div className="img-loading-spinner"></div>}
              {errors.image && (
                <p style={{ color: "red", margin: "10px 0" }}>
                  {errors.image.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sizes</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Check
                  type={"checkbox"}
                  id={"S"}
                  label={"S"}
                  value="S"
                  defaultChecked={pVariants[0]?.size}
                  onChange={(e) => setPSizeS(e.target.value)}
                />
                <Form.Control
                  className="ms-4 w-25"
                  type="text"
                  placeholder="Enter quantity"
                  defaultValue={pVariants[0]?.quantity || ""}
                  onChange={(e) => setPSizeSQty(e.target.value)}
                />
                <Button
                  variant="info"
                  className="ms-3"
                  onClick={() => handleUpdate(pSizeS, +pSizeSQty)}
                >
                  Update
                </Button>
              </div>
              <div className="mt-3 d-flex align-items-center">
                <Form.Check
                  type={"checkbox"}
                  id={"M"}
                  label={"M"}
                  value="M"
                  defaultChecked={pVariants[1]?.size}
                  onChange={(e) => setPSizeM(e.target.value)}
                />
                <Form.Control
                  className="ms-3 w-25"
                  type="text"
                  placeholder="Enter quantity"
                  defaultValue={pVariants[1]?.quantity || ""}
                  onChange={(e) => setPSizeMQty(e.target.value)}
                />
                <Button
                  variant="info"
                  className="ms-3"
                  onClick={() => handleUpdate(pSizeM, +pSizeMQty)}
                >
                  Update
                </Button>
              </div>
              <div className="mt-3 d-flex align-items-center">
                <Form.Check
                  type={"checkbox"}
                  id={"L"}
                  label={"L"}
                  value="L"
                  defaultChecked={pVariants[2]?.size}
                  onChange={(e) => setPSizeL(e.target.value)}
                />
                <Form.Control
                  className="ms-4 w-25"
                  type="text"
                  placeholder="Enter quantity"
                  defaultValue={pVariants[2]?.quantity || ""}
                  onChange={(e) => setPSizeLQty(e.target.value)}
                />
                <Button
                  variant="info"
                  className="ms-3"
                  onClick={() => handleUpdate(pSizeL, +pSizeLQty)}
                >
                  Update
                </Button>
              </div>
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

export default ProductForm;
