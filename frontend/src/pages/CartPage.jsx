import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import  CartProduct  from "../components/Product/CartProducts.jsx"
import Modal from "../components/OrderConfirmation/Modal.jsx";
import axios from "axios";
import { clearCart } from "../store/slices/cartSlice.js";
import { Link, useNavigate } from "react-router-dom";
import refreshCart from "../utils/refreshCart.jsx";
import refreshUser from "../utils/refreshUser.jsx";



function CheckOut() {
  const { refreshUserData } = refreshUser();
  const { refreshCartData } = refreshCart();
  
  const getAccessTokenFromCookies = () => {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const accessTokenCookie = cookies.find(cookie => cookie.startsWith("accessToken="));
    if (accessTokenCookie) {
      return accessTokenCookie.split("=")[1];
    }
    return null;
  };

  const [accessToken, setAccessToken] = useState(getAccessTokenFromCookies());
  useEffect(() => {
    refreshUserData();
    refreshCartData();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      refreshCartData();
    }
  }, [accessToken]);

  

  // console.log("eabsd",useSelector((state) => state.cart.items))
  // const cart = async ()=>{
  //   return await axios.get("/v1/cart-items/get-cart", {
  //     withCredentials: true,
  //   });

  // }
  const cart = useSelector((state) => state.cart.items);
  console.log("Cart Items:", cart);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  const navigate = useNavigate();
  

  const emptyCartBackend = async () => {
    try {
      const response = await axios.delete(
        'http://localhost:8000/api/v1/cart/clear-cart',
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        console.log("Cart Emptied", response.data);
      }
    } catch (error) {
      console.error("Failed to empty the cart:", error);
    }
  };

  const calculateSubtotal = () => {
    return cart?.reduce((acc, product) => {
      return acc + product.details.price * product.quantity;
    }, 0);
  };

  const emptyCart = async () => {
    dispatch(clearCart());
    await emptyCartBackend();
  };

  const handleEmptyCartClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmEmptyCart = async () => {
    await emptyCart();
    setShowModal(false);
  };

  useEffect(() => {
    setSubtotal(calculateSubtotal());
  }, [cart, handleEmptyCartClick]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-screen m-4">
      {/* Left Portion - Products */}
      <div className="lg:col-span-3 bg-gray-200 p-6 rounded-lg">
        {(cart?.length === 0  || cart===undefined)? (
          <div className="text-center">
            <div className="text-4xl text-blue-600 font-bold m-5 ">
              Cart is Empty
            </div>
            <Link to="/products">
              <img
                src="https://res.cloudinary.com/deepcloud1/image/upload/v1716643749/sxi6w7wtzf8wlggzt2am.png"
                alt="Empty Cart"
                className="mx-auto mb-4 hover:scale-105 transform transition duration-500 ease-in-out cursor-pointer"
              />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart?.map((product,index) => (
              <CartProduct
                key={index}
                productId={product.productId}
                name={product.details.name}
                price={product.details.price}
                productImages={product.details.productImages[0]}
                quantity={product.quantity}
              />
            ))}
            
          </div>
        )}
      </div>

      {/* Right Portion - Checkout */}
      <div className="lg:col-span-1 p-4 bg-indigo-200 rounded-xl flex flex-col items-center">
        <div className="text-xl font-semibold mb-4">Total : ₹ {subtotal}</div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg mb-4 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
          disabled={cart?.length === 0}
          onClick={() => navigate("/order-confirmation")}
        >
          Place Order
        </button>

        {(cart?.length > 0)&& (
          <>
            <div
              className="bg-gray-100 rounded-md p-3 flex items-center justify-center w-auto hover:bg-slate-400 active:bg-slate-500 active:scale-90 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer mb-4"
              onClick={handleEmptyCartClick}
            >
              <img
                src="https://res.cloudinary.com/deepcloud1/image/upload/v1716645390/qukkwf5h4ymdb6owdcla.png"
                alt="Empty Cart"
                className="mr-2 w-16"
              />
              <span className="text-lg font-bold text-purple-900">
                Empty Cart
              </span>
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-lg"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </>
        )}
      </div>

      <Modal
        showModal={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmEmptyCart}
        message="Are you sure you want to empty the cart?"
      />
    </div>
  );
}

export default CheckOut;