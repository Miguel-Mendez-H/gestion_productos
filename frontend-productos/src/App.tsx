import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCartArrowDown } from "react-icons/fa";

function App() {
  return (
    <div className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="app-container">
        <div className="app-header">
          <div className="app-header__icon">
            <FaCartArrowDown />
          </div>
          <h1>Gestión de Productos</h1>
        </div>
        <div className="app-content__form">
          <ProductForm />
        </div>
        <div className="app-content__list">
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default App;
