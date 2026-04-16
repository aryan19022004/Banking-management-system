import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-blue-900 font-bold text-lg">B</span>
                                </div>
                                <span className="text-white font-bold text-xl">SecureBank</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                                        isActive ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/accounts"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                                        isActive ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                                    }`
                                }
                            >
                                Accounts
                            </NavLink>
                            <NavLink
                                to="/transactions"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                                        isActive ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                                    }`
                                }
                            >
                                Transactions
                            </NavLink>
                            <NavLink
                                to="/atm"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                                        isActive ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                                    }`
                                }
                            >
                                ATM Services
                            </NavLink>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                                        isActive ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                                    }`
                                }
                            >
                                Profile
                            </NavLink>
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Bell */}
                        <button className="text-blue-200 hover:text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7v5h5l-5-5zM5 17h5l-5 5v-5zM5 7v5H0l5-5z" />
                            </svg>
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">JD</span>
                            </div>
                            <span className="text-white text-sm hidden sm:block">John Doe</span>
                        </div>

                        {/* Login/Logout Button */}
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 shadow-md">
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className="text-blue-200 hover:text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-800 border-t border-blue-700">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                                isActive ? 'bg-blue-700 text-white' : 'text-white hover:bg-blue-700 hover:text-white'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/accounts"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                                isActive ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                            }`
                        }
                    >
                        Accounts
                    </NavLink>
                    <NavLink
                        to="/transactions"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                                isActive ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                            }`
                        }
                    >
                        Transactions
                    </NavLink>
                    <NavLink
                        to="/atm"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                                isActive ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                            }`
                        }
                    >
                        ATM Services
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                                isActive ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                            }`
                        }
                    >
                        Profile
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;