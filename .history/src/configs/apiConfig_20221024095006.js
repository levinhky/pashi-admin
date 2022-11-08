import { useState } from "react";
import axiosClient from "./axios";

// axiosClient.get("/api/v2/products")
export const tmdbEndpoint = "/api/v2";
export const tmdbAPI = {
    const [categoryList, setCategoryList] = useState([]);
  getCategories: async ({type, ...props}) => {
    const data = await axiosClient.get(`${tmdbEndpoint}/${type}`);
    
  },
};
// const getCategories = async () => {
    //   const data = await axiosClient.get("/api/v2/categories");
    //   setCategoryList(data);
    //   setLoading(false);
    // };
    // getCategories();