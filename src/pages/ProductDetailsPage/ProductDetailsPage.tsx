import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function ProductPage() {
  const { id } = useParams();
  const { list } = useSelector((s: RootState) => s.products);
  const product = list.find((p) => p.id === Number(id));

  if (!product) return <p>Товар не найден</p>;

  return (
    <div className="product-page">
      <img src={product.image} alt={product.title} />
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>
          <b>Цена:</b> ${product.price}
        </p>
        <Link to="/products" className="back-btn">
          ← Назад
        </Link>
      </div>
    </div>
  );
}
