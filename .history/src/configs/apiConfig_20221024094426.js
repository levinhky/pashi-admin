import axiosClient from "./axios";

// axiosClient.get("/api/v2/products")
export const tmdbEndpoint = "/api/v2";
export const tmdbAPI = {
  getCategories: async (type) => {
    const data = await axiosClient.get(`${tmdbEndpoint}/${type}`);
  },
};
