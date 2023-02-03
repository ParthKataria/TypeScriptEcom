import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";
interface ItemDetails {
  image: string;
  price: number;
  title: string;
  description: string;
}
const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState<ItemDetails | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const getItems = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setItem(response.data);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      setError(err as Error);
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  if (error) return <ErrorPage message={error.message} />;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2">
          <img
            className="block w-full my-5 mx-5 h-3/4 border border-green-200 col-span-1 "
            src={item!.image}
          />
          <ul className="col-span-1 m-5 text-center items-center">
            <li className="text-6xl">{item!.title}</li>
            <li className="text-xl">{item!.description}</li>
            <li className="text-3xl">Cost - ${item!.price}</li>
          </ul>
        </div>
      )}
    </>
  );
};
export default Item;
