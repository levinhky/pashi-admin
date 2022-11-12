import React from 'react';
import Home from "../components/Home/Home";
import Product from "../components/Product/Product";
import Category from "../components/Category/Category";
import CategoryForm from "../components/CategoryForm/CategoryForm";
import Comment from "../components/Comment/Comment";
const ProductForm = React.lazy(() => import('../components/ProductForm/ProductForm'));

const routes = [
    { path:'/', element: <Home />, layout:<Home /> },
    { path:'/products', element: <Product />, layout:<Product /> },
    { path:'/products/add', element: <ProductForm />, layout:<ProductForm /> },
    { path:'/products/edit/:productId', element: <ProductForm />, layout:<ProductForm /> },
    { path:'/categories', element: <Category />, layout:<Category /> },
    { path:'/categories/add', element: <CategoryForm />, layout:<CategoryForm /> },
    { path:'/categories/edit/:categoryId', element: <CategoryForm />, layout:<CategoryForm /> },
    { path:'/comments', element: <Comment />, layout:<Comment /> },
];

export default  routes;