import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowUpCircle, 
  History, 
  Calendar, 
  AlertTriangle, 
  Send, 
  PlusCircle, 
  MinusCircle, 
  Search, 
  CheckCircle, 
  Clock
} from 'lucide-react';

const Transactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get('tab') || 'transfer';
  const [activeTab, setActiveTab] = useState(tabQuery);
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  // Form states
  const [fromAccount, setFromAccount] = useState('1');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [depositType, setDepositType] = useState('cash');
  const [withdrawalMethod, setWithdrawalMethod] = useState('atm');

  const tabs = [
    { id: 'transfer', name: 'Transfer Money', icon: ArrowUpRight, color: 'text-blue-400' },
    { id: 'deposit', name: 'Deposit Funds', icon: ArrowDownLeft, color: 'text-emerald-400' },
    { id: 'withdraw', name: 'Withdraw Funds', icon: ArrowUpCircle, color: 'text-red-400' },
    { id: 'history', name: 'Transaction History', icon: History, color: 'text-purple-400' }
  ];

  // Mock accounts database (Separated clearly)
  const accounts = [
    { id: '1', number: '123456789012', type: 'Savings', balance: 15420.50, ifsc: 'SBIN0001234' },
    { id: '2', number: '987654321098', type: 'Current', balance: 28500.75, ifsc: 'SBIN0005678' }
  ];

  // Mock transaction list
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 'tx_1', type: 'Transfer', amount: -2500.00, recipient: 'John Doe', account: '****9012', date: '2026-06-11 14:30', status: 'Completed', ifsc: 'SBIN0009012' },
    { id: 'tx_2', type: 'Deposit', amount: 12000.00, description: 'Salary Deposit', account: '****1234', date: '2026-06-10 09:00', status: 'Completed', ifsc: 'SBIN0001234' },
    { id: 'tx_3', type: 'Withdrawal', amount: -1500.00, description: 'ATM Cash Withdrawal', account: '****5678', date: '2026-06-08 16:45', status: 'Completed', ifsc: 'SBIN0005678' },
    { id: 'tx_4', type: 'Transfer', amount: -850.25, recipient: 'Electric Utility Co.', account: '****1234', date: '2026-06-07 11:20', status: 'Completed', ifsc: 'SBIN0001111' },
    { id: 'tx_5', type: 'Deposit', amount: 500.00, description: 'Cheque Refund', account: '****1234', date: '2026-06-05 10:15', status: 'Pending', ifsc: 'SBIN0001234' }
  ]);

  useEffect(() => {
    // Keep tab state synchronized with the URL query parameter
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab')!);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // INTEGRATION POINT: Call `transferMoney` API from `../../APIs/transactions`
      // Example:
      // const activeAcc = accounts.find(a => a.id === fromAccount);
      // const res = await transferMoney(activeAcc.number, recipientAccount, amount, activeAcc.ifsc, ifscCode);

      console.log('Processing transfer:', { fromAccount, recipientAccount, amount, ifscCode, description });
      
      setTimeout(() => {
        const activeAcc = accounts.find(a => a.id === fromAccount);
        const newTx = {
          id: 'tx_' + (recentTransactions.length + 1),
          type: 'Transfer',
          amount: -parseFloat(amount),
          recipient: 'Ac. No: ' + recipientAccount.slice(-4),
          account: '****' + activeAcc?.number.slice(-4),
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'Completed',
          ifsc: ifscCode
        };
        setRecentTransactions(prev => [newTx, ...prev]);
        setLoading(false);
        // Reset Form
        setAmount('');
        setRecipientAccount('');
        setIfscCode('');
        setDescription('');
        handleTabChange('history');
      }, 1200);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // INTEGRATION POINT: Call `depositeMoney` API from `../../APIs/transactions`
      // Example:
      // const activeAcc = accounts.find(a => a.id === fromAccount);
      // const res = await depositeMoney(activeAcc.number, amount, activeAcc.ifsc);

      console.log('Processing deposit:', { fromAccount, amount, depositType, description });

      setTimeout(() => {
        const activeAcc = accounts.find(a => a.id === fromAccount);
        const newTx = {
          id: 'tx_' + (recentTransactions.length + 1),
          type: 'Deposit',
          amount: parseFloat(amount),
          description: depositType.toUpperCase() + ' Deposit',
          account: '****' + activeAcc?.number.slice(-4),
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'Completed',
          ifsc: activeAcc?.ifsc || 'SBIN0001234'
        };
        setRecentTransactions(prev => [newTx, ...prev]);
        setLoading(false);
        // Reset Form
        setAmount('');
        setDescription('');
        handleTabChange('history');
      }, 1200);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // INTEGRATION POINT: Call `withdrawMoneyByAccountNumber` API from `../../APIs/transactions`
      // Example:
      // const activeAcc = accounts.find(a => a.id === fromAccount);
      // const res = await withdrawMoneyByAccountNumber(activeAcc.number, amount, activeAcc.ifsc);

      console.log('Processing withdrawal:', { fromAccount, amount, withdrawalMethod });

      setTimeout(() => {
        const activeAcc = accounts.find(a => a.id === fromAccount);
        const newTx = {
          id: 'tx_' + (recentTransactions.length + 1),
          type: 'Withdrawal',
          amount: -parseFloat(amount),
          description: withdrawalMethod.toUpperCase() + ' Cash Draw',
          account: '****' + activeAcc?.number.slice(-4),
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'Completed',
          ifsc: activeAcc?.ifsc || 'SBIN0001234'
        };
        setRecentTransactions(prev => [newTx, ...prev]);
        setLoading(false);
        // Reset Form
        setAmount('');
        handleTabChange('history');
      }, 1200);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // History filtering
  const filteredTransactions = recentTransactions.filter(tx => {
    const query = filterQuery.toLowerCase();
    return (
      (tx.recipient || tx.description || '').toLowerCase().includes(query) ||
      tx.type.toLowerCase().includes(query) ||
      tx.account.includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans relative pb-12">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-blue-500 rounded-full glow-circle opacity-10" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-indigo-500 rounded-full glow-circle opacity-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            Digital <span className="text-gradient-primary">Transactions</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Initiate safe money transfers, load balances, and review statement records.</p>
        </div>

        {/* Tab Selection */}
        <div className="glass-panel rounded-2xl border border-white/10 mb-8 p-1.5 flex flex-wrap gap-1 md:flex-nowrap shadow-lg">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold transition duration-300 border border-transparent cursor-pointer ${
                  isTabActive 
                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/20 shadow-inner' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${tab.color}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Central Operations Panel */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl">
          
          {/* Transfer Money Tab */}
          {activeTab === 'transfer' && (
            <div className="max-w-xl mx-auto">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Transfer Funds</h2>
                  <p className="text-xs text-gray-400">Transfer funds immediately to any bank account via IMPS/NEFT.</p>
                </div>
              </div>

              <form onSubmit={handleTransferSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Debit Account (Source)
                  </label>
                  <select 
                    value={fromAccount}
                    onChange={(e) => setFromAccount(e.target.value)}
                    className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 text-white"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.type} - ••••{acc.number.slice(-4)} (Available: ₹{acc.balance.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Beneficiary Account Number
                    </label>
                    <input
                      type="text"
                      required
                      value={recipientAccount}
                      onChange={(e) => setRecipientAccount(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white"
                      placeholder="Enter account number"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Beneficiary IFSC Code
                    </label>
                    <input
                      type="text"
                      required
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white font-mono uppercase"
                      placeholder="e.g. UTIB0000234"
                      maxLength={11}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Remarks / Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white"
                      placeholder="Family support, Rent, etc. (Optional)"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white glow-btn-primary disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Processing Transfer...' : 'Initiate Transfer'}</span>
                </button>
              </form>
            </div>
          )}

          {/* Deposit Funds Tab */}
          {activeTab === 'deposit' && (
            <div className="max-w-xl mx-auto">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Deposit Cash / Cheque</h2>
                  <p className="text-xs text-gray-400">Add funds to your active bank accounts instantly.</p>
                </div>
              </div>

              <form onSubmit={handleDepositSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Credit Account (Destination)
                  </label>
                  <select 
                    value={fromAccount}
                    onChange={(e) => setFromAccount(e.target.value)}
                    className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 text-white"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.type} - ••••{acc.number.slice(-4)} (Current: ₹{acc.balance.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Deposit Amount (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Method
                    </label>
                    <select 
                      value={depositType}
                      onChange={(e) => setDepositType(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 text-white"
                    >
                      <option value="cash">Counter Cash Deposit</option>
                      <option value="cheque">Cheque Deposit (24hr clearance)</option>
                      <option value="transfer">External Bank NetBanking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white"
                    placeholder="Enter deposit description (Optional)"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white glow-btn-success disabled:opacity-50 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{loading ? 'Processing Deposit...' : 'Complete Deposit'}</span>
                </button>
              </form>
            </div>
          )}

          {/* Withdraw Funds Tab */}
          {activeTab === 'withdraw' && (
            <div className="max-w-xl mx-auto">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                  <ArrowUpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Withdraw Funds</h2>
                  <p className="text-xs text-gray-400">Withdraw liquidity safely via direct counter or ATM actions.</p>
                </div>
              </div>

              <form onSubmit={handleWithdrawSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Debit Account (Source)
                  </label>
                  <select 
                    value={fromAccount}
                    onChange={(e) => setFromAccount(e.target.value)}
                    className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 text-white"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.type} - ••••{acc.number.slice(-4)} (Available: ₹{acc.balance.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Withdrawal Amount (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Method
                    </label>
                    <select 
                      value={withdrawalMethod}
                      onChange={(e) => setWithdrawalMethod(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 text-white"
                    >
                      <option value="atm">Virtual ATM withdrawal</option>
                      <option value="counter">Physical Branch Counter</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-start space-x-2.5">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-semibold">Security Limit Warnings:</p>
                    <p>Daily ATM withdrawal ceiling is capped at ₹10,000. counter withdrawals support up to ₹50,000. Contact branch for limit increases.</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white glow-btn-danger disabled:opacity-50 cursor-pointer"
                >
                  <MinusCircle className="w-4 h-4" />
                  <span>{loading ? 'Processing Withdrawal...' : 'Withdraw Funds'}</span>
                </button>
              </form>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6 animate-scale-up">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Statement Logs</h2>
                  <p className="text-xs text-gray-400 mt-1">Review complete incoming and outgoing transactional logs.</p>
                </div>
                
                {/* Search / Filter */}
                <div className="relative w-full sm:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 rounded-xl border border-white/10 glass-input text-xs focus:border-blue-500 text-white"
                    placeholder="Search logs..."
                  />
                </div>
              </div>

              {/* Transactions Table Layout */}
              <div className="overflow-x-auto rounded-2xl border border-white/5">
                <table className="min-w-full divide-y divide-white/5">
                  <thead className="bg-[#0B0F19]/60">
                    <tr>
                      <th className="px-6 py-4.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Date & Time
                      </th>
                      <th className="px-6 py-4.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Method/Type
                      </th>
                      <th className="px-6 py-4.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Description/Beneficiary
                      </th>
                      <th className="px-6 py-4.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        IFSC Code
                      </th>
                      <th className="px-6 py-4.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Account No.
                      </th>
                      <th className="px-6 py-4.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Amount
                      </th>
                      <th className="px-6 py-4.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900/10 divide-y divide-white/5">
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-white/2 transition">
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-300 flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                            <span>{tx.date}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                              tx.type === 'Transfer' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                              tx.type === 'Deposit' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                              'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}>
                              {tx.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-white">
                            {tx.recipient || tx.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-400">
                            {tx.ifsc}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-400">
                            {tx.account}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-bold">
                            <span className={tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              tx.status === 'Completed' 
                                ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' 
                                : 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                            }`}>
                              {tx.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              <span>{tx.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-xs text-gray-500">
                          No matching transaction records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Transactions;