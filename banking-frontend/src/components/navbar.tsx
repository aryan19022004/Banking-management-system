import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowRightLeft, 
  Cpu, 
  User, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  Shield 
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Salary deposited: ₹2,000", unread: true },
    { id: 2, text: "New ATM card request approved", unread: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/accounts", label: "Accounts", icon: CreditCard },
    { to: "/transactions", label: "Transactions", icon: ArrowRightLeft },
    { to: "/atm", label: "ATM Services", icon: Cpu },
    { to: "/profile", label: "Profile", icon: User }
  ];

  const handleLogout = () => {
    // Logout logic to be handled by user later
    console.log("Logout clicked");
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="glass-panel fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-xl backdrop-blur-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <NavLink to="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition duration-300">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Secure<span className="text-blue-400">Bank</span>
              </span>
            </NavLink>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition duration-300 ${
                    isActive
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-inner"
                      : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-gray-300 hover:text-white p-2 rounded-xl hover:bg-white/5 transition duration-300 focus:outline-none"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-[#0B0F19] animate-pulse"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-panel border border-white/10 shadow-2xl p-4 animate-scale-up z-50">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                    <h4 className="text-sm font-semibold text-white">Notifications</h4>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead} 
                        className="text-xs text-blue-400 hover:text-blue-300 transition"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          className={`p-2.5 rounded-xl text-xs transition duration-200 ${
                            n.unread ? "bg-white/5 border border-white/5" : "text-gray-400"
                          }`}
                        >
                          <p className="text-gray-200">{n.text}</p>
                          <span className="text-[10px] text-gray-500 mt-1 block">Just now</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-xs text-center py-4">No notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-2 border-l border-white/10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                JD
              </div>
              <div className="hidden xl:block text-left">
                <span className="text-sm font-semibold text-white block leading-tight">John Doe</span>
                <span className="text-xs text-gray-400 block leading-tight">Customer</span>
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1.5 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-400 hover:text-red-300 px-3.5 py-2 rounded-xl text-sm font-medium transition duration-300 shadow-md cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-300 hover:text-white p-2 rounded-xl hover:bg-white/5 transition focus:outline-none"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-[#0B0F19]" />
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-xl hover:bg-white/5 transition focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in border-t border-white/5 bg-[#0B0F19]/95 backdrop-blur-xl">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition duration-300 ${
                    isActive
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-inner"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
            <div className="pt-4 mt-4 border-t border-white/5 px-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  JD
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block">John Doe</span>
                  <span className="text-xs text-gray-400 block">Customer</span>
                </div>
              </div>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                className="flex items-center space-x-1.5 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-400 px-3 py-2 rounded-xl text-sm font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;