import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store";
import type { RootState, AppDispatch } from "../../store";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductCatalogPage.css";
export default function ProductCatalog() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((s: RootState) => s.products);
  const [showLiked, setShowLiked] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getProducts());
    }
  }, []);

  const products = list.filter((p) => {
    if (showLiked && !p.liked) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <p>Загрузка товаров...</p>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <button className="btn-link" onClick={() => setShowLiked(false)}>
          Все товары
        </button>
        <button className="btn-link" onClick={() => setShowLiked(true)}>
          Избранное
        </button>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по названию"
        />
      </div>

      <div className="product-grid">
        {currentProducts.map((p) => (
          <div>
            <ProductCard key={p.id} product={p} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
