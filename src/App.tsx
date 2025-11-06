import "./App.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductCatalogPage/ProductCatalogPage";
import ProductCreatePage from "./pages/ProductCreatePage/ProductCreatePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
function App() {
  return (
    <>
      <nav>
        <Link className="nav-element" to="/products">
          Главная
        </Link>
        <Link className="nav-element" to="/create-product">
          Создать продукт
        </Link>
      </nav>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/create-product" element={<ProductCreatePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
