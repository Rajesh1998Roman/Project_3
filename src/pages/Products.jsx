import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const getProducts = async () => {
    const { data } = await axios.get(
      `https://api.escuelajs.co/api/v1/products`
    );
    setProducts(data);
  };

  const getCategory = async () => {
    const { data } = await axios.get(
      `https://api.escuelajs.co/api/v1/categories`
    );
    setCategories(data);
  };

  useEffect(() => {
    getProducts();
    getCategory();
  }, []);

  const filterProducts = async () => {
    const { data } = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?title=${search}&price_min=${min}&price_max=${max}&categoryId=${categoryId}`
    );
    setProducts(data);
  };

  useEffect(() => {
    filterProducts();
  }, [search, min, max, categoryId]);

  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <div>
        <div className="flex items-center justify-center gap-10">
          <h1 className="text-xl">Search:</h1>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="grow border rounded-md px-3 py-3 text-lg"
            type="text"
            placeholder="search by title"
          />
          <h1 className="text-xl">Category:</h1>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((e, i) => (
              <option key={i} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <h1 className="text-xl">Price Range:</h1>
          <input
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="border w-24 rounded-md px-3 py-3 text-lg"
            type="number"
          />
          <input
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="border w-24 rounded-md px-3 py-3 text-lg"
            type="number"
          />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {products.map((e, i) => (
            <Link
              to={`/product/${e.id}`}
              key={i}
              href="#"
              className="group relative block"
            >
              <div className="relative h-[350px] sm:h-[450px]">
                <img
                  src={e.images[0]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                />

                <img
                  src={e.images[1] ? e.images[1] : e.images[0]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                />
              </div>

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">{e.title}</h3>
                <span className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  {e.category.name}
                </span>

                <span className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  {e.price}
                </span>

                <p className="mt-1.5 max-w-[40ch] text-xs text-white">
                  {e.description}
                </p>

                <span className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  Add to Cart
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
