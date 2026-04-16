import { Link, useParams } from 'react-router-dom';

const AccountDetail = () => {
  const { accountId } = useParams<{ accountId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Details</h1>
              <p className="text-gray-600 mt-1">Review the information for account ID: <span className="font-medium text-gray-900">{accountId}</span></p>
            </div>
            <Link to="/accounts" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition duration-200">
              Back to Accounts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-600">Account Number</p>
              <p className="text-xl font-semibold text-blue-900">{accountId}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="text-xl font-semibold text-gray-900">Savings</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-3xl font-bold text-gray-900">₹12,540.75</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Branch IFSC</p>
              <p className="text-xl font-semibold text-gray-900">SBIN0001234</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Salary Deposit</p>
                    <p className="text-sm text-gray-500">01 Mar 2026</p>
                  </div>
                  <p className="text-green-600 font-semibold">+₹5,000</p>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Online Transfer</p>
                    <p className="text-sm text-gray-500">27 Feb 2026</p>
                  </div>
                  <p className="text-red-600 font-semibold">-₹1,200</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
