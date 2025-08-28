import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";

const View = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // ✅ Safe check
  const isInWishlist = product
    ? wishlist.some((item) => item.id === product.id)
    : false;

  const handleWishlist = () => {
    if (!product) return;
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen text-xl">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col mx-5">
        <div className="grid grid-cols-2 items-center h-screen gap-8">
          {/* Product Image + Buttons */}
          <div className="flex flex-col items-center">
            <img
              width="350px"
              height="250px"
              src={product.thumbnail}
              alt={product.title}
              className="rounded shadow-lg"
            />

            {/* Buttons */}
            <div className="flex justify-between w-full mt-5 gap-4">
              <button
                onClick={handleWishlist}
                className={`flex-1 rounded text-white px-4 py-2 ${
                  isInWishlist ? "bg-red-600" : "bg-blue-700"
                }`}
              >
                {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
              </button>
              <button className="flex-1 bg-green-700 rounded text-white px-4 py-2">
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-5xl font-bold">{product.title}</h1>
            <h4 className="font-bold text-red-600 text-2xl">${product.price}</h4>
            <h4>Brand: {product.brand}</h4>
            <h4>Category: {product.category}</h4>
            <p className="mt-4">
              <span className="font-bold">Description:</span>{" "}
              {product.description}
            </p>

            {/* Reviews */}
            <h3 className="font-bold mt-6">Client Reviews</h3>
            {product.reviews?.length > 0 ? (
              product.reviews.map((item, idx) => (
                <div key={idx} className="shadow border rounded p-2 mb-2">
                  <h5>
                    <span className="font-bold">{item?.reviewerName}</span>:
                    <span> {item?.comment}</span>
                  </h5>
                  <p>
                    Rating: {item?.rating}
                    <i className="fa-solid fa-star text-yellow-400"></i>
                  </p>
                </div>
              ))
            ) : (
              <div className="font-bold text-red-600">No Reviews Yet!!!</div>
            )}

            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-gray-700 rounded text-white px-4 py-2"
            >
              ⬅ Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
