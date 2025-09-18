import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FiPlus, FiPackage, FiDatabase } from 'react-icons/fi';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';

function Dashboard() {
    const context = useContext(myContext)
    const { mode } = context
    
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '' }}>
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                            Manage your ecommerce store
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Link to='/addproduct' className="group">
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-blue-500" 
                                 style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(59 130 246)' : '' }}>
                                        <FiPlus className="w-6 h-6 text-blue-600" style={{ color: mode === 'dark' ? 'white' : '' }} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            Add Product
                                        </h3>
                                        <p className="text-gray-600 text-sm" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                                            Add new products to your store
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to='/addsampleproducts' className="group">
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-green-500" 
                                 style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(34 197 94)' : '' }}>
                                        <FiDatabase className="w-6 h-6 text-green-600" style={{ color: mode === 'dark' ? 'white' : '' }} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            Sample Products
                                        </h3>
                                        <p className="text-gray-600 text-sm" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                                            Add 44 sample products
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500" 
                             style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                            <div className="flex items-center">
                                <div className="bg-purple-100 p-3 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(147 51 234)' : '' }}>
                                    <FiPackage className="w-6 h-6 text-purple-600" style={{ color: mode === 'dark' ? 'white' : '' }} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                        Manage Store
                                    </h3>
                                    <p className="text-gray-600 text-sm" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                                        View and manage products
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <DashboardTab />
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard