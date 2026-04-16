// Example usage of the banking APIs in React components

const AccountOverview = () => {
  return (
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
  );
};

export default AccountOverview;