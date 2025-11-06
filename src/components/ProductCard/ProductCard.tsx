import { useDispatch } from "react-redux";
import { toggleLike } from "../../store";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import type { AppDispatch } from "../../store";

interface IProduct {
  product: {
    id: number;
    title: string;
    description: string;
    image: string;
    liked?: boolean;
  };
}

export default function ProductCard({ product }: IProduct) {
  const dispatch = useDispatch<AppDispatch>();
  const truncateTitle = (title: string): string => {
    const words = title.trim().split(/\s+/);
    return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
  };
  return (
    <div className="card">
      <button
        className={`like-btn ${product.liked ? "liked" : ""}`}
        onClick={() => dispatch(toggleLike(product.id))}
      >
        ♥
      </button>
      <Link to={`/products/${product.id}`} className="card-link">
        <img src={product.image} alt={product.title} />
        <h4>{truncateTitle(product.title)}</h4>
        <p>{product.description.slice(0, 60)}...</p>
      </Link>
    </div>
  );
}
