import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  addProduct,
  deleteProduct,
  Product,
} from "../api/productService";
import { ApiError } from "../api/types";
import { AxiosError } from "axios";
import { showNotification } from "./notificationsSlice";

//Definimos la interfaz de los productos de acuerdo a la API
interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

//Incializamos el estado como array vacio
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const handleApiError = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiError>;
  return axiosError.response?.data?.message || "Error inesperado";
};

// Creamos thunks de las operaciones de acuerdo al API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: Omit<Product, "id">, { rejectWithValue, dispatch }) => {
    try {
      const newProduct = await addProduct(product);
      dispatch(
        showNotification({
          message: "Producto creado exitosamente",
          type: "success",
        })
      );
      return newProduct;
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch(
        showNotification({
          message: errorMessage,
          type: "error",
        })
      );
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await deleteProduct(id);
      dispatch(
        showNotification({
          message: "Producto eliminado exitosamente",
          type: "success",
        })
      );
      return id;
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch(
        showNotification({
          message: errorMessage,
          type: "error",
        })
      );
      return rejectWithValue(errorMessage);
    }
  }
);

/*
    Adicionamos los reducers de acuerdo a las operaciones del Api.
    Adicionalmente, se adiciona el manejo de los estados de loading y error para cada uno.
  */

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener los productos
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Crear los productos
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })

      // Eliminar los productos
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
  },
});

export default productsSlice.reducer;
