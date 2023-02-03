import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemsList from "./ItemsList";
import ErrorPage from "./ErrorPage";
import { Product } from "./definations";
const CategoryItems = () => {
  const { category } = useParams();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const getItems = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setItems(response.data);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      setError(err as Error);
    }
  };
  useEffect(() => {
    getItems();
  }, [category]);
  if (error) return <ErrorPage message={error.message} />;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ItemsList items={items} />
        </div>
      )}
    </>
  );
};
export default CategoryItems;
