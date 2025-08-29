import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  // ✅ Get products and searchQuery from Redux
  const { allProducts, loading, errorMsg, searchQuery } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Filter products based on searchQuery
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header insideHome={true} />
      <div style={{ paddingTop: "100px" }} className="container px-4 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center text-lg">
            <img
              width={"600px"}
              height={"600px"}
              src="https://cdn.dribbble.com/userupload/22076800/file/original-8e7ce77dec0edaf0105e8287038f6e60.gif"
              alt="Loading..."
            />
          </div>
        ) : (
          <>
            {errorMsg && <div className="text-red-500">{errorMsg}</div>}
            <div className="grid grid-cols-4 gap-4">
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="rounded border p-2 shadow border-blue-500 shadow-blue-800"
                  >
                    <img
                      width="100%"
                      height="200px"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <div className="text-center mt-2">
                      <h3 className="text-xl font-bold">{product.title}</h3>
                      <Link
                        to={`/${product.id}/view`}
                        className="bg-blue-400 rounded p-1 mt-3 text-white inline-block"
                      >
                        View More...
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div>No products available.</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
