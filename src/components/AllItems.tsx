import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage";
interface Result {
  images: { url: string }[];
}
const AllItems = () => {
  const [items, setItems] = useState<Result[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const observer = useRef<IntersectionObserver | null>();
  const lastElement = useCallback(
    (node: HTMLImageElement) => {
      //   console.log(node);
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // console.log(entries);
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  const getItems = async (page: number) => {
    setError(null);
    setisLoading(true);
    try {
      const response = await axios.get(
        `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list`,
        {
          params: {
            country: "us",
            lang: "en",
            currentpage: page,
            pagesize: "10",
          },
          headers: {
            "X-RapidAPI-Key":
              "613cf127f5msh97949d8491e5c62p1a7131jsn765e4eeb8335",
            "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
          },
        }
      );
      setItems([...items, ...response.data.results]);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      setError(err as Error);
    }
  };
  useEffect(() => {
    getItems(currentPage);
  }, [currentPage]);
  //   console.log(items);
  if (error) return <ErrorPage message={error.message} />;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
        {items.map((product, id) => {
          if (items.length === id + 1)
            return (
              <div key={id} className="mx-2 my-5 bg-white shadow p-2">
                <img
                  className="block w-full"
                  ref={lastElement}
                  src={product.images[0].url}
                />
              </div>
            );
          return (
            <div key={id} className="mx-2 my-5 bg-white shadow p-2">
              <img className="block w-full" src={product.images[0].url} />
            </div>
          );
        })}
      </div>
      {isLoading && <div>Loading...</div>}
    </>
  );
};
export default AllItems;
