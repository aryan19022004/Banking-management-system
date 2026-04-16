import { useState } from 'react';

const Accounts = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock data - will be replaced with API calls
  const accounts = [
    {
      id: '1',
      accountNumber: '123456789012',
      type: 'Savings',
      balance: 15420.50,
      status: 'Active',
      ifsc: 'SBIN0001234',
      branch: 'Main Branch',
      atmCardNumber: '****1234'
    },
    {
      id: '2',
      accountNumber: '987654321098',
      type: 'Current',
      balance: 28500.75,
      status: 'Active',
      ifsc: 'SBIN0005678',
      branch: 'Downtown Branch',
      atmCardNumber: '****5678'
    }
  ];

  const branches = [
    { id: '1', name: 'Main Branch', ifsc: 'SBIN0001234' },
    { id: '2', name: 'Downtown Branch', ifsc: 'SBIN0005678' },
    { id: '3', name: 'North Branch', ifsc: 'SBIN0009012' }
  ];

  const handleCreateAccount = () => {
    // Create account logic will be implemented here
    console.log('Creating new account');
    setShowCreateForm(false);
  };

  const handleRequestAtmCard = (accountId: string) => {
    // Request ATM card logic will be implemented here
    console.log('Requesting ATM card for account:', accountId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Accounts</h1>
            <p className="text-gray-600 mt-1">Manage your bank accounts and ATM cards</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition duration-200"
          >
            + Open New Account
          </button>
        </div>

        {/* Create Account Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Open New Account</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleCreateAccount(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="savings">Savings Account</option>
                      <option value="current">Current Account</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Initial Deposit (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter initial deposit amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Branch
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name} - {branch.ifsc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition duration-200"
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md font-medium transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => (
            <div key={account.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{account.type} Account</h3>
                  <p className="text-sm text-gray-600">Account: {account.accountNumber}</p>
                  <p className="text-sm text-gray-600">IFSC: {account.ifsc}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {account.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  ₹{account.balance.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-600">Available Balance</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">ATM Card</span>
                  <span className="text-sm font-medium text-gray-900">{account.atmCardNumber}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRequestAtmCard(account.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md text-sm font-medium transition duration-200"
                  >
                    Request New Card
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Account Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">📄</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Account Statement</h4>
                  <p className="text-sm text-gray-600">Download statements</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">🔄</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Transfer Limits</h4>
                  <p className="text-sm text-gray-600">Manage transfer limits</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600">🔔</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Account Alerts</h4>
                  <p className="text-sm text-gray-600">Set up notifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;