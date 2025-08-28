import React from 'react';
import Header from '../components/Header';

const Cart = () => {
    return (
        <>
            <Header />
            <div style={{ paddingTop: "100px" }} className="0x-5">
                <h1 className="text-5xl font-bold text-blue-600">Cart Summary..</h1>
                <div className="grid grid-cols-3 gap-4 mt-5">
                    <div className="col-span-2 border rounded p-5 shadow">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <td className="font-sembold">#</td>
                                    <td className="font-sembold">Name</td>
                                    <td className="font-sembold">Image</td>
                                    <td className="font-sembold">Quantity</td>
                                    <td className="font-sembold">Price</td>
                                    <td className="font-sembold">...</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Product Name</td>
                                    <td>
                                        <img 
                                            width={'70px'} 
                                            height={'70px'} 
                                            src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp" 
                                            alt="" 
                                        />
                                    </td>
                                    <td>
                                        <div className='flex'>
                                            <button className='font-bold'>-</button>
                                            <input 
                                                style={{ width: "40px" }} 
                                                type="text" 
                                                className='border p-1 rounded mx-2' 
                                                value={12} 
                                                readOnly 
                                            />
                                            <button className='font-bold'>+</button>
                                        </div>
                                    </td>
                                    <td>$ 250</td>
                                    <td>
                                        <button className='text-red-600'>
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                                {/* Add more rows as necessary */}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 border rounded shadow p-5">
                        <h2 className="text-2xl font-bold">Total Amount: <span className="text-red-600">$250</span></h2>
                        <hr />
                        <button className="bg-green-600 rounded p-2 text-white w-full mt-4">Check Out</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;