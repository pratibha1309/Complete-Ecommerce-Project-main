import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import myContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
    const context = useContext(myContext)
    const {loading, setLoading, mode} = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const login = async () => {
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }
        
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            toast.success("Welcome back!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            toast.error('Invalid email or password');
            setLoading(false)
        }
    }
   
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center p-4" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '' }}>
            {loading && <Loader/>}
            
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">CW</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-purple-100">Sign in to your Crafted-Wonders account</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                    <form onSubmit={(e) => { e.preventDefault(); login(); }} className="space-y-6">
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
                                    placeholder="Enter your password"
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

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-purple-100 text-sm">
                        © 2024 Crafted-Wonders. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login