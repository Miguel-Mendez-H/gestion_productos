import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchProducts, removeProduct } from "../features/productsSlice";
import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ProductList.css";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const ITEMS_PER_PAGE = 5;

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div className="product-list">
      <h2 className="product-list__title">Lista de Productos</h2>
      <table className="product-list__table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th className="price">Precio</th>
            <th className="actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr key={product.id} className="product-list__item">
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td className="price">{formatPrice(product.price)}</td>
                <td className="actions">
                  <Tippy content={<span>Eliminar producto</span>} animation="scale">
                    <button
                      className="product-list__delete-btn"
                      onClick={() => dispatch(removeProduct(product.id))}
                    >
                      <FaTrash />
                    </button>
                  </Tippy>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="product-list__no-data">
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {products && (
        <div className="product-list__pagination">
          <button
            className="product-list__page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaChevronLeft />
          </button>
          <span className="product-list__page-text">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="product-list__page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
