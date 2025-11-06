import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store";
import type { RootState, AppDispatch } from "../../store";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductCatalog.css";

export default function ProductCatalog() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((s: RootState) => s.products);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (list.length === 0) dispatch(getProducts());
  }, [dispatch]);

  const totalPages = Math.ceil(list.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const currentItems = list.slice(start, start + itemsPerPage);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="catalog">
      <h3>Список товаров</h3>
      <div className="grid">
        {currentItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
