import {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../configs/firebase";
import axiosClient from "../../configs/axios";
import {handleEdit, handleGetOne, handlePost} from "../../configs/functions";
import {useNavigate, useParams} from "react-router-dom";
import {toastSuccess, toastError, toastWarning} from "../../configs/toasts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Please enter product name"),
    price: yup.string().required("Please enter price product"),
    quantity: yup.string().required("Please enter quantity products"),
    category: yup.string().required("Please select category product"),
    image: yup.string().required("Please choose image product"),
});

const ProductForm = () => {
    const {
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({resolver: yupResolver(schema), mode: "onChange"});

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
    const [sizeSObject, setSizeSObject] = useState({});
    const [sizeMObject, setSizeMObject] = useState({});
    const [sizeLObject, setSizeLObject] = useState({});
    const [categories, setCategories] = useState([]);
    const [productInfo, setProductInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {productId} = useParams();

    useEffect(() => {
        const getCategories = async () => {
            const categories = await axiosClient.get("categories");
            setCategories(categories);
            console.log(categories)
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getProductInfo = async () => {
            setIsLoading(true);
            handleGetOne("products", productId).then((info) => {
                setProductInfo(info);
                setPName(info.name);
                setPPrice(info.price);
                setPQty(info.quantity);
                setPCategory(info.category_id);
                setPThumbnails(info.thumbnails);
                setPSizeS(info?.sizes[0]?.name);
                setPSizeM(info?.sizes[1]?.name);
                setPSizeL(info?.sizes[2]?.name);
                setPSizeSQty(info?.sizes[0]?.quantity);
                setPSizeMQty(info?.sizes[1]?.quantity);
                setPSizeLQty(info?.sizes[2]?.quantity);
                setSizeSObject(info?.sizes[0]);
                setSizeMObject(info?.sizes[1]);
                setSizeLObject(info?.sizes[2]);
                setIsLoading(false);
                console.log(info)
            });
        };
        if (productId) getProductInfo();
    }, [productId]);

    const handleUpdate = () => {
        toastSuccess("Update size successfully!");
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

    const handleSave = async () => {
        let category_slug = '';
        let category_id = +pCategory;
        if (category_id === 1) {
            category_slug = 'Đầm'
        } else if (category_id === 2) {
            category_slug = 'Áo'
        } else if (category_id === 3) {
            category_slug = 'Váy'
        } else {
            category_slug = 'Quần'
        }
        const saveData = {
            name: pName,
            price: pPrice,
            quantity: +pQty,
            category_id: category_id,
            category_slug,
            thumbnails: pThumbnails,
            sizes: [sizeSObject, sizeMObject, sizeLObject],
        };
        !productId
          ? handlePost("products", saveData).then((res) =>
              setTimeout(() => navigate("/products"), 1500)
            )
          : handleEdit("products", productId, saveData).then((res) =>
              setTimeout(() => navigate("/products"), 1500)
            );
        console.log(saveData);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form
                        className="p-4 mb-5 bg-white border rounded shadow-sm "
                        onSubmit={handleSubmit(handleSave)}
                    >
                        <h3 className="mb-3">
                            {!productId ? "New product" : "Edit product"}
                        </h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                defaultValue={productInfo.name || ""}
                                placeholder="Enter product name"
                                onChange={(e) => setPName(e.target.value)}
                            />
                            {errors.name && (
                                <p style={{color: "red", margin: "5px 0"}}>
                                    {errors.name.message}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                defaultValue={productInfo.price || ""}
                                placeholder="Enter product price"
                                onChange={(e) => setPPrice(e.target.value)}
                            />
                            {errors.price && (
                                <p style={{color: "red", margin: "5px 0"}}>
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
                                <p style={{color: "red", margin: "5px 0"}}>
                                    {errors.quantity.message}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                onChange={(e) => setPCategory(e.target.value)}
                                value={productInfo.category_id}
                                aria-label="Default select example"
                                name="category"
                            >
                                <option value="">-- Please select ---</option>
                                {categories.length > 0 &&
                                    categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                            </Form.Select>
                            {errors.category && (
                                <p style={{color: "red", margin: "5px 0"}}>
                                    {errors.category.message}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Thumbnail</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                placeholder="Enter product price"
                                multiple
                                onChange={(e) => handleChangeImage(e)}
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
                                        alt={p.name}
                                    />
                                ))}
                            {isLoading && <div className="img-loading-spinner"></div>}
                            {errors.image && (
                                <p style={{color: "red", margin: "5px 0"}}>
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
                                    defaultChecked={sizeSObject?.name}
                                    onChange={(e) => setPSizeS(e.target.value)}
                                />
                                <Form.Control
                                    className="ms-4 w-25"
                                    type="text"
                                    placeholder="Enter quantity"
                                    defaultValue={sizeSObject?.quantity || ""}
                                    onChange={(e) => setPSizeSQty(e.target.value)}
                                />
                                <Button
                                    variant="info"
                                    className="ms-3"
                                    onClick={() => {
                                        setSizeSObject({
                                            name: pSizeS,
                                            quantity: pSizeSQty,
                                        });
                                        handleUpdate();
                                    }}
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
                                    defaultChecked={sizeMObject?.name}
                                    onChange={(e) => setPSizeM(e.target.value)}
                                />
                                <Form.Control
                                    className="ms-3 w-25"
                                    type="text"
                                    placeholder="Enter quantity"
                                    defaultValue={sizeMObject?.quantity || ""}
                                    onChange={(e) => setPSizeMQty(e.target.value)}
                                />
                                <Button
                                    variant="info"
                                    className="ms-3"
                                    onClick={() => {
                                        setSizeMObject({
                                            name: pSizeM,
                                            quantity: pSizeMQty,
                                        });
                                        handleUpdate();
                                    }}
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
                                    defaultChecked={sizeLObject?.name}
                                    onChange={(e) => setPSizeL(e.target.value)}
                                />
                                <Form.Control
                                    className="ms-4 w-25"
                                    type="text"
                                    placeholder="Enter quantity"
                                    defaultValue={sizeLObject?.quantity || ""}
                                    onChange={(e) => setPSizeLQty(e.target.value)}
                                />
                                <Button
                                    variant="info"
                                    className="ms-3"
                                    onClick={() => {
                                        setSizeLObject({
                                            name: pSizeL,
                                            quantity: pSizeLQty,
                                        });
                                        handleUpdate();
                                    }}
                                >
                                    Update
                                </Button>
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSave}>
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductForm;
