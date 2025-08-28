import React from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  // ✅ wishlist is just an array
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (product) => {
    dispatch(removeFromWishlist(product));
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: "100px" }} className="px-5">
        <h1 className="text-4xl font-bold text-red-600 mb-5">My Wishlist ❤️</h1>

        {wishlist && wishlist.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="rounded border p-3 shadow border-blue-500 shadow-blue-800 flex flex-col justify-between"
              >
                <Link to={`/${item.id}/view`}>
                  <img
                    className="rounded mx-auto"
                    width="100%"
                    height="200px"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <h3 className="text-xl font-bold text-center mt-2">
                    {item.title}
                  </h3>
                </Link>

                <div className="flex justify-evenly mt-3">
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-xl"
                    title="Remove from Wishlist"
                  >
                    <i className="fa-solid fa-heart-circle-xmark text-red-600"></i>
                  </button>
                  <button
                    onClick={() => alert("Cart not implemented yet!")}
                    className="text-xl"
                    title="Add to Cart"
                  >
                    <i className="fa-solid fa-cart-plus text-green-600"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            {/* ✅ Use a real Lottie animation embed or fallback image */}
            <img
              className="mx-auto mb-4"
              src="https://www.grocarto.com/assets/images/User/gif/cartGif.gif"
              alt="Empty Wishlist"
            />
            <h2 className="text-2xl text-gray-600 p-5">Your wishlist is empty! </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
