import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const cartItem = product ? cart.find((i) => i.id === product.id) : null;
  const inWishlist = product ? wishlist.some((i) => i.id === product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    const nextQty = cartItem ? cartItem.quantity + 1 : 1;
    dispatch(addToCart(product));
    if (inWishlist) dispatch(removeFromWishlist(product));
    alert(`${product.title} added to cart. Quantity: ${nextQty}`);
  };

  const handleRemoveOneFromCart = () => {
    if (!product || !cartItem) return;
    const nextQty = cartItem.quantity - 1;
    dispatch(decrementQuantity(product));
    if (nextQty > 0) {
      alert(`${product.title} quantity decreased. Quantity: ${nextQty}`);
    } else {
      alert(`${product.title} removed from cart`);
    }
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    if (!inWishlist) {
      if (cartItem) {
        alert(`${product.title} is already in cart. Cannot add to wishlist.`);
        return;
      }
      dispatch(addToWishlist(product));
      alert(`${product.title} added to wishlist`);
    } else {
      dispatch(removeFromWishlist(product));
      alert(`${product.title} removed from wishlist`);
    }
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen text-xl">
          Loading product...
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col mx-5">
        <div className="grid grid-cols-2 items-start gap-8 pt-28">
          {/* Left: Image + Cart/Wishlist Controls */}
          <div className="flex flex-col items-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="rounded shadow-lg max-h-[400px] object-contain"
            />

            <div className="flex w-full gap-3 mt-5">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-700 rounded text-white px-4 py-2"
              >
                <i className="fa-solid fa-cart-plus mr-2"></i>
                ADD TO CART
              </button>

              {/* ✅ Only show Remove button if product is in cart */}
              {cartItem && (
                <button
                  onClick={handleRemoveOneFromCart}
                  className="flex-1 bg-red-700 rounded text-white px-4 py-2"
                >
                  <i className="fa-solid fa-minus mr-2"></i>
                  REMOVE ONE
                </button>
              )}
            </div>

            <button
              onClick={handleToggleWishlist}
              className={`w-full mt-3 rounded text-white px-4 py-2 ${
                inWishlist ? "bg-gray-600" : "bg-pink-600"
              }`}
            >
              <i className="fa-solid fa-heart mr-2"></i>
              {inWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            </button>

            {cartItem && (
              <div className="mt-3 font-bold">
                In Cart: {cartItem.quantity}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div>
            <h1 className="text-5xl font-bold">{product.title}</h1>
            <h4 className="font-bold text-red-600 text-2xl mt-2">
              ${product.price}
            </h4>
            <h4 className="mt-1">Brand: {product.brand}</h4>
            <h4 className="mt-1">Category: {product.category}</h4>
            <p className="mt-4">
              <span className="font-bold">Description:</span>{" "}
              {product.description}
            </p>

            <h3 className="font-bold mt-6">Client Reviews</h3>
            {product.reviews?.length > 0 ? (
              product.reviews.map((r, idx) => (
                <div key={idx} className="shadow border rounded p-2 mb-2">
                  <h5>
                    <span className="font-bold">{r?.reviewerName}</span>:
                    <span> {r?.comment}</span>
                  </h5>
                  <p>
                    Rating: {r?.rating}
                    <i className="fa-solid fa-star text-yellow-400"></i>
                  </p>
                </div>
              ))
            ) : (
              <div className="font-bold text-red-600">No Reviews Yet!!!</div>
            )}

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
