import api from "./api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const response = await api.post("/products", product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
