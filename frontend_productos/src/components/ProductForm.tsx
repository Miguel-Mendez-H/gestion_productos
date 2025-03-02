import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/productsSlice";
import { AppDispatch } from "../store";
import "./ProductForm.css";

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
}

const ProductForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const toggleModal = () => {
    if (!isSubmitting) {
      setIsOpen(!isOpen);
      if (isOpen) {
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setErrors({});
    setIsFormSubmitted(false);
    setIsSubmitting(false);
  };

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "name":
        return !value.trim() ? "El nombre del producto es obligatorio" : undefined;
      case "description":
        return !value.trim() ? "La descripción es obligatoria" : undefined;
      case "price":
        if (!value.trim()) return "El precio es obligatorio";
        if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
          return "El precio debe ser un número positivo";
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField("name", name),
      description: validateField("description", description),
      price: validateField("price", price)
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      await dispatch(createProduct({
        name, 
        description, 
        price: parseFloat(price)
      })).unwrap();
      resetForm();
      toggleModal();
    } catch (error) {
      console.log("Error al agregar producto:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button className="product-form__open-btn" onClick={toggleModal}>
        + Agregar Producto
      </button>
      
      {isOpen && (
        <div className="product-form__modal">
          <div className="product-form__content">
            <span 
              className="product-form__close" 
              onClick={toggleModal}
            >
              &times;
            </span>
            
            <h2 className="product-form__title">Agregar Producto</h2>
            
            <form onSubmit={handleSubmit} className="product-form__form">
              <div className="product-form__field">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`product-form__input ${isFormSubmitted && errors.name ? "product-form__input--error" : ""}`}
                />
                {isFormSubmitted && errors.name && (
                  <span className="product-form__error">{errors.name}</span>
                )}
              </div>

              <div className="product-form__field">
                <textarea
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`product-form__input ${isFormSubmitted && errors.description ? "product-form__input--error" : ""}`}
                ></textarea>
                {isFormSubmitted && errors.description && (
                  <span className="product-form__error">{errors.description}</span>
                )}
              </div>

              <div className="product-form__field">
                <input
                  type="text"
                  placeholder="Precio"
                  value={price}
                  onChange={handlePriceChange}
                  className={`product-form__input ${isFormSubmitted && errors.price ? "product-form__input--error" : ""}`}
                />
                {isFormSubmitted && errors.price && (
                  <span className="product-form__error">{errors.price}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="product-form__submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Agregando..." : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;