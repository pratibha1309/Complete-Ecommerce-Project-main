import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const context = useContext(myContext);
    const { loading, setLoading, mode } = context;
    const navigate = useNavigate();

    const signup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            return toast.error("All fields are required")
        }
        
        if (password !== confirmPassword) {
            return toast.error("Passwords don't match")
        }
        
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters")
        }

        setLoading(true)
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            }
            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);
            
            toast.success("Account created successfully! Please login.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setLoading(false)
            
            // Redirect to login after successful signup
            setTimeout(() => {
                navigate('/login');
            }, 1000);
            
        } catch (error) {
            console.log(error)
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email already registered. Please login instead.');
            } else if (error.code === 'auth/weak-password') {
                toast.error('Password is too weak. Please choose a stronger password.');
            } else {
                toast.error('Failed to create account. Please try again.');
            }
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '' }}>
            {loading && <Loader/>}
            
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CW</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Join Crafted-Wonders</h1>
                    <p className="text-blue-100">Create your account and start shopping</p>
                </div>

                {/* Signup Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                    <form onSubmit={(e) => { e.preventDefault(); signup(); }} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                Full Name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                                    style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                Email Address
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                                    style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                                    style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
                                    placeholder="Create a password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                Confirm Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                                    style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-blue-100 text-sm">
                        © 2024 Crafted-Wonders. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup