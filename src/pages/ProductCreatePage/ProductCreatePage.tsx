import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store";

export default function CreateProduct() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    if (!data.title || !data.description) {
      alert("Please fill title and description");
      return;
    }
    dispatch(addProduct(data));
    navigate("/products");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Создать новый продукт</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: 400,
        }}
      >
        <input {...register("title")} placeholder="Название" />
        <textarea {...register("description")} placeholder="Описание" />
        <input {...register("price")} type="number" placeholder="Цена" />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
