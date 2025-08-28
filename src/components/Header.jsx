import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ insideHome }) => {
  // ✅ Get wishlist state
  const wishlistCount = useSelector((state) => state.wishlist.length);

  return (
    <nav className="flex bg-blue-400 fixed w-full p-5 text-white z-50">
      <Link className="text-2xl font-bold" to='/'>
        <i className="fa-solid fa-truck-fast me-1"></i> Daily Cart
      </Link>
      <ul className="flex-1 text-right">
        {insideHome && (
          <li className="list-none inline-block px-5">
            <input
              style={{ width: '300px' }}
              className="rounded border p-2"
              placeholder="Search products Name"
              type="text"
            />
          </li>
        )}
        <li className="list-none inline-block px-5">
          <Link to='/wishlist'>
            <i className="fa-solid fa-heart text-red-600"></i> Wishlist 
            <span className="bg-black text-white rounded p-1 ml-1">
              {wishlistCount}
            </span>
          </Link>
        </li>
        <li className="list-none inline-block px-5">
          <Link to='/cart'>
            <i className="fa-solid fa-cart-plus text-green-600"></i> Cart 
            <span className="bg-black text-white rounded p-1 ml-1">
              0
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
