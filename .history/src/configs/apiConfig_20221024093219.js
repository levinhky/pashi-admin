import axiosClient from "./axios";

// axiosClient.get("/api/v2/products")
export const tmdbEndpoint = "/api/v2";
export const tmdbApi = {
  getCategories: async function handleGet(type) {
    await axiosClient.get(`${tmdbEndpoint}/api/v2/${type}`);
  },
};
