import React, { useContext, useEffect, useState } from 'react'
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { Link } from 'react-router-dom';


function Cart() {

  const context = useContext(myContext)
  const { mode } = context;

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems)

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart")
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])

  const [totalAmout, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price)
    })
    setTotalAmount(temp);
    console.log(temp)
  }, [cartItems])

  const shipping = parseInt(100);

  const grandTotal = shipping + totalAmout;
  // console.log(grandTotal)


    //  Payment Intigration
 

  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const buyNow = async () => {
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }

    var options = {
      key: "rzp_test_2tGW4u4JWzyApF",
      key_secret: "HQxdlxFox0ryBZk4xVgiv1Hf",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "Crafted-Wonders",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }

        try {

          const orderRef = collection(fireDB, 'order');
          addDoc(orderRef, orderInfo);

        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)


  }
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '' }}>
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}>
                <FiShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: mode === 'dark' ? 'white' : '' }}>
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/allproducts">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '' }}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link to="/allproducts" className="mr-4">
                <button className="flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-300">
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  Shopping Cart
                </h1>
                <p className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => {
                const { title, price, description, imageUrl } = item;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="w-full sm:w-32 h-32 mb-4 sm:mb-0 sm:mr-6">
                        <img 
                          src={imageUrl} 
                          alt={title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                          {title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                          {description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl font-bold text-purple-600">
                              ₹{price}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => deleteCart(item)}
                            className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-300 p-2 hover:bg-red-50 rounded-lg"
                            style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmout}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>Shipping</span>
                    <span className="font-semibold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</span>
                  </div>
                  
                  <div className="border-t pt-4" style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</span>
                      <span className="text-2xl font-bold text-purple-600">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Modal
                    name={name}
                    address={address}
                    pincode={pincode}
                    phoneNumber={phoneNumber}
                    setName={setName}
                    setAddress={setAddress}
                    setPincode={setPincode}
                    setPhoneNumber={setPhoneNumber}
                    buyNow={buyNow}
                  />
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                      Free shipping on orders over ₹300
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart