import React from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Calculate total price
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Thanks for shopping!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: "100px" }} className="px-5">
        <h1 className="text-5xl font-bold text-blue-600">Cart Summary 🛒</h1>

        {cart.length === 0 ? (
          <div className="text-center mt-10">
            <img
              className="mx-auto mb-4"
              src="https://www.grocarto.com/assets/images/User/gif/cartGif.gif"
              alt="Empty Cart"
            />
            <h2 className="text-2xl text-gray-600">Your cart is empty!</h2>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mt-5">
            {/* Cart Table */}
            <div className="col-span-2 border rounded p-5 shadow">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="font-semibold p-2 text-left">#</th>
                    <th className="font-semibold p-2 text-left">Name</th>
                    <th className="font-semibold p-2 text-left">Image</th>
                    <th className="font-semibold p-2 text-center">Quantity</th>
                    <th className="font-semibold p-2 text-right">Price</th>
                    <th className="font-semibold p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">
                        <img
                          width={"70px"}
                          height={"70px"}
                          src={item.thumbnail}
                          alt={item.title}
                          className="rounded"
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex items-center justify-center">
                          <button
                            className="font-bold px-2 text-red-600"
                            onClick={() => dispatch(decrementQuantity(item))}
                          >
                            -
                          </button>
                          <input
                            style={{ width: "40px" }}
                            type="text"
                            className="border p-1 rounded mx-2 text-center"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="font-bold px-2 text-green-600"
                            onClick={() => dispatch(incrementQuantity(item))}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-2 text-right">
                        ${item.price * item.quantity}
                      </td>
                      <td className="p-2 text-center">
                        <button
                          className="text-red-600"
                          onClick={() => dispatch(removeFromCart(item))}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ✅ Extra Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="bg-red-600 rounded p-2 text-white"
                >
                  Empty Cart
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-600 rounded p-2 text-white"
                >
                  Shop More
                </button>
              </div>
            </div>

            {/* Total Section */}
            <div className="col-span-1 border rounded shadow p-5">
              <h2 className="text-2xl font-bold">
                Total Amount:{" "}
                <span className="text-red-600">${totalAmount.toFixed(2)}</span>
              </h2>
              <hr className="my-2" />
              <button
                onClick={handleCheckout}
                className="bg-green-600 rounded p-2 text-white w-full mt-4"
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
