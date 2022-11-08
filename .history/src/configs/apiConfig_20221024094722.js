import axiosClient from "./axios";

// axiosClient.get("/api/v2/products")
export const tmdbEndpoint = "/api/v2";
export const tmdbAPI = {
  getCategories: async ({type, ...props}) => {
    const data = await axiosClient.get(`${tmdbEndpoint}/${type}`);
    ${children}
  },
};
// const getCategories = async () => {
    //   const data = await axiosClient.get("/api/v2/categories");
    //   setCategoryList(data);
    //   setLoading(false);
    // };
    // getCategories();