import axiosClient from "./axios";

// axiosClient.get("/api/v2/products")
export const tmdbEndpoint = "/api/v2";
export const tmdbAPI = {
  getCategories: async ({ type, children }) => {
    const data = await axiosClient.get(`${tmdbEndpoint}/${type}`);
    {
      children;
    }
    data;
  },
};
// const getCategories = async () => {
//   const data = await axiosClient.get("/api/v2/categories");
//   setCategoryList(data);
//   setLoading(false);
// };
// getCategories();
