import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function DashboardTab() {
    const context = useContext(myContext)
    const { mode, product, edithandle, deleteProduct, order, user } = context

    // console.log(product)
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const add = () => {
        window.location.href = '/addproduct'
    }
    return (
        <>
            <div className="container mx-auto">
                <div className="tab container mx-auto ">
                    <Tabs defaultIndex={0} className=" " >
                        <TabList className="flex justify-center mb-8">
                            <div className="bg-white rounded-xl shadow-lg p-2 flex space-x-2" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                                <Tab>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 text-blue-600 bg-blue-50 hover:bg-blue-100" style={{ backgroundColor: mode === 'dark' ? 'rgb(59 130 246)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                        <MdOutlineProductionQuantityLimits className="w-5 h-5" />
                                        Products
                                    </button>
                                </Tab>
                                <Tab>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 text-green-600 bg-green-50 hover:bg-green-100" style={{ backgroundColor: mode === 'dark' ? 'rgb(34 197 94)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                        <AiFillShopping className="w-5 h-5" />
                                        Orders
                                    </button>
                                </Tab>
                                <Tab>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 text-purple-600 bg-purple-50 hover:bg-purple-100" style={{ backgroundColor: mode === 'dark' ? 'rgb(147 51 234)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                        <FaUser className="w-5 h-5" />
                                        Users
                                    </button>
                                </Tab>
                            </div>
                        </TabList>
                        {/* product  */}
                        <TabPanel>
                            <div className='  px-4 md:px-0 mb-16'>
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>Product Management</h2>
                                    <p className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>Manage your store products</p>
                                </div>
                                <div className="flex justify-end mb-6">
                                    <button
                                        onClick={add}
                                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        <AiFillPlusCircle className="w-5 h-5" />
                                        Add New Product
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        {product.map((item, index) => {
                                            const { title, price, imageUrl, category, description, date } = item;
                                            return (
                                                <tbody className=''>
                                                    <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {index + 1}.
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                            <img className='w-16' src={imageUrl} alt="img" />
                                                        </th>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {title}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            ₹{price}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {category}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {date}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className=" flex gap-2">
                                                                <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    <div onClick={() => deleteProduct(item)}  >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                        </svg>
                                                                    </div>

                                                                    <Link to={'/updateproduct'}>
                                                                        <div onClick={() => edithandle(item)}  >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                        </div>
                                                                    </Link>

                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            )
                                        })}
                                    </table>

                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* <Order order={order} setOrder={setOrder} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-16">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>Order Management</h2>
                                    <p className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>Track and manage customer orders</p>
                                </div>

                                {order.map((allorder,index)=>{
                                    return(<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                                    <thead className="text-xs text-black uppercase bg-gray-200 " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Payment Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Pincode
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    {allorder.cartItems.map((item,index)=>{
                                        // console.log(allorder)
                                        const {title,description,category,imageUrl,price} = item;
                                        return(
                                            <tbody>
                                        <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {allorder.paymentId}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                <img className='w-16' src={imageUrl} alt="img" />
                                            </th>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {title}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                ₹{price}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                               {category}
                                            </td>

                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {allorder.addressInfo.name}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {allorder.addressInfo.address}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            {allorder.addressInfo.pincode}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            {allorder.addressInfo.phoneNumber}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {allorder.email}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                               {allorder.date}
                                            </td>

                                        </tr>

                                    </tbody>
                                        )
                                    })}
                                </table>)
                                })}
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>User Management</h2>
                                    <p className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>View registered users</p>
                                </div>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-black uppercase bg-gray-200 " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Uid
                                            </th>
                                           
                                        </tr>
                                    </thead>
                                   {user.map((item,index)=>{
                                    const {name,uid,email,date} = item;
                                    return(
                                        <tbody>
                                        <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                               {index + 1}.
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {name}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {email}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {uid}
                                            </td>

                                        </tr>
                                    </tbody>
                                    )
                                   })}
                                </table>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>
        </>
    )
}


export default DashboardTab