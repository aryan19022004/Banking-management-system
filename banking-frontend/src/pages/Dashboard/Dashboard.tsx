const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, User!</h1>
          <p className="text-gray-600 mt-1">Here's an overview of your accounts and recent activity.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">↗️</span>
            <span className="text-sm font-medium">Transfer Money</span>
          </button>
          <button className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">⬇️</span>
            <span className="text-sm font-medium">Deposit</span>
          </button>
          <button className="bg-red-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">⬆️</span>
            <span className="text-sm font-medium">Withdraw</span>
          </button>
          <button className="bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">💡</span>
            <span className="text-sm font-medium">Pay Bills</span>
          </button>
        </div>

        {/* Accounts Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Account Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Accounts</h2>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Savings Account</h3>
                  <p className="text-sm text-gray-600">****1234</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ₹0.00
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Transaction History
                </button>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
                        <span className="text-sm">↗️</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Transfer to John Doe</p>
                        <p className="text-xs text-gray-500">2024-01-15</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">
                        -₹500.00
                      </p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                        <span className="text-sm">⬇️</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Salary Deposit</p>
                        <p className="text-xs text-gray-500">2024-01-14</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        +₹2,000.00
                      </p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
                        <span className="text-sm">⬆️</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">ATM Withdrawal</p>
                        <p className="text-xs text-gray-500">2024-01-13</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">
                        -₹150.00
                      </p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All Transactions →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">₹0.00</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Account Type</p>
                <p className="text-2xl font-bold text-green-600">Savings</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-xl">🏦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Account Status</p>
                <p className="text-2xl font-bold text-gray-900">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{accountData?.balance?.toLocaleString('en-IN') || '0.00'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Account Type</p>
                <p className="text-2xl font-bold text-green-600">
                  {accountData?.accountType?.charAt(0).toUpperCase() + accountData?.accountType?.slice(1) || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-xl">🏦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Account Status</p>
                <p className="text-2xl font-bold text-gray-900">
                  {accountData?.accountStatus?.charAt(0).toUpperCase() + accountData?.accountStatus?.slice(1) || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;