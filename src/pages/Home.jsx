import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { allProducts, loading, errorMsg, searchQuery } = useSelector(
    (state) => state.product
  );

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // ✅ show 8 products per page

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Filter with search query
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

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
              {currentProducts?.length > 0 ? (
                currentProducts.map((product) => (
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

            {/* ✅ Simple Arrow Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 gap-6">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="text-2xl disabled:opacity-30"
                >
                  ⬅️
                </button>

                <span className="text-lg p-4">
                   {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="text-2xl disabled:opacity-30"
                >
                  ➡️
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
