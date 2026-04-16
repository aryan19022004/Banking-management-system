import React, { useState } from 'react';

const ATM = () => {
  const [activeService, setActiveService] = useState('balance');
  const [atmCardNumber, setAtmCardNumber] = useState('');
  const [atmPin, setAtmPin] = useState('');
  const [amount, setAmount] = useState('');

  const services = [
    { id: 'balance', name: 'Check Balance', icon: '💰', description: 'View your account balance' },
    { id: 'withdraw', name: 'Cash Withdrawal', icon: '💵', description: 'Withdraw cash from ATM' },
    { id: 'mini-statement', name: 'Mini Statement', icon: '📄', description: 'View recent transactions' },
    { id: 'pin-change', name: 'Change PIN', icon: '🔐', description: 'Change your ATM PIN' }
  ];

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ATM service logic will be implemented here
    console.log('Processing ATM service:', activeService, { atmCardNumber, atmPin, amount });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ATM Services</h1>
          <p className="text-gray-600 mt-1">Access your accounts through our ATM network</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Service</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`w-full p-4 rounded-lg border text-left transition duration-200 ${
                      activeService === service.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ATM Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-blue-900 mb-2">ATM Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Daily withdrawal limit: ₹10,000</li>
                <li>• Maximum 5 transactions per day</li>
                <li>• Service charge: ₹20 per transaction</li>
                <li>• 24/7 ATM locator available</li>
              </ul>
            </div>
          </div>

          {/* Service Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {services.find(s => s.id === activeService)?.name}
              </h3>

              <form onSubmit={handleServiceSubmit} className="space-y-6">
                {/* ATM Card Number - Common for all services */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ATM Card Number
                  </label>
                  <input
                    type="text"
                    value={atmCardNumber}
                    onChange={(e) => setAtmCardNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter 16-digit ATM card number"
                    maxLength={16}
                    required
                  />
                </div>

                {/* ATM PIN - Common for all services */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ATM PIN
                  </label>
                  <input
                    type="password"
                    value={atmPin}
                    onChange={(e) => setAtmPin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter 4-digit PIN"
                    maxLength={4}
                    required
                  />
                </div>

                {/* Amount field for withdrawal */}
                {activeService === 'withdraw' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Withdrawal Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="100"
                      max="10000"
                      step="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter amount (min ₹100, max ₹10,000)"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Amount must be in multiples of ₹100
                    </p>
                  </div>
                )}

                {/* New PIN fields for PIN change */}
                {activeService === 'pin-change' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New PIN
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter new 4-digit PIN"
                        maxLength={4}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New PIN
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm new 4-digit PIN"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Service specific information */}
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  {activeService === 'balance' && (
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-2">Balance Inquiry</p>
                      <p>Check your account balance instantly. No charges apply for balance inquiry.</p>
                    </div>
                  )}

                  {activeService === 'withdraw' && (
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-2">Cash Withdrawal</p>
                      <p>Withdraw cash from any of our ATMs. ₹20 service charge applies per transaction.</p>
                    </div>
                  )}

                  {activeService === 'mini-statement' && (
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-2">Mini Statement</p>
                      <p>View your last 10 transactions. ₹10 service charge applies.</p>
                    </div>
                  )}

                  {activeService === 'pin-change' && (
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-2">PIN Change</p>
                      <p>Change your ATM PIN securely. Free service, available 24/7.</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition duration-200 shadow-md"
                >
                  {activeService === 'balance' && 'Check Balance'}
                  {activeService === 'withdraw' && 'Withdraw Cash'}
                  {activeService === 'mini-statement' && 'Get Mini Statement'}
                  {activeService === 'pin-change' && 'Change PIN'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ATM Locations */}
        <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Find ATM Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900">Main Branch ATM</h4>
              <p className="text-sm text-gray-600">123 Main Street, City Center</p>
              <p className="text-sm text-green-600">Open 24/7</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900">Mall ATM</h4>
              <p className="text-sm text-gray-600">456 Shopping Mall, Downtown</p>
              <p className="text-sm text-green-600">Open 24/7</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900">Airport ATM</h4>
              <p className="text-sm text-gray-600">Terminal 2, International Airport</p>
              <p className="text-sm text-yellow-600">Open 6 AM - 11 PM</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All ATM Locations →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATM;