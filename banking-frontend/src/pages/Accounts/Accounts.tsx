import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  CreditCard, 
  Building, 
  FileText, 
  Sliders, 
  Bell, 
  X, 
  Sparkles, 
  ChevronRight
} from 'lucide-react';

const Accounts = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states for opening new account
  const [accountType, setAccountType] = useState('savings');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('1');

  // Mock data - will be replaced with API calls (Separated clearly)
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      accountNumber: '123456789012',
      type: 'Savings',
      balance: 15420.50,
      status: 'Active',
      ifsc: 'SBIN0001234',
      branch: 'Main Branch',
      atmCardNumber: '•••• •••• •••• 1234'
    },
    {
      id: '2',
      accountNumber: '987654321098',
      type: 'Current',
      balance: 28500.75,
      status: 'Active',
      ifsc: 'SBIN0005678',
      branch: 'Downtown Branch',
      atmCardNumber: '•••• •••• •••• 5678'
    }
  ]);

  const branches = [
    { id: '1', name: 'Main Branch', ifsc: 'SBIN0001234' },
    { id: '2', name: 'Downtown Branch', ifsc: 'SBIN0005678' },
    { id: '3', name: 'North Branch', ifsc: 'SBIN0009012' }
  ];

  useEffect(() => {
    // INTEGRATION POINT: Fetch all user accounts on load.
    // Example:
    // const fetchAccounts = async () => {
    //   try {
    //     const res = await getMyAccount(); // if api returns array of accounts
    //     if (res) setAccounts(res);
    //   } catch (err) { console.error(err); }
    // };
    // fetchAccounts();
  }, []);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // INTEGRATION POINT: Call `createAccount` API function from `../../APIs/account`
      // Example:
      // const res = await createAccount(accountType, parseFloat(initialDeposit), selectedBranch);
      
      console.log('Creating account request:', { accountType, initialDeposit, selectedBranch });
      
      // Simulate success
      setTimeout(() => {
        const newAcc = {
          id: (accounts.length + 1).toString(),
          accountNumber: Math.floor(100000000000 + Math.random() * 900000000000).toString(),
          type: accountType.charAt(0).toUpperCase() + accountType.slice(1),
          balance: parseFloat(initialDeposit) || 0,
          status: 'Active',
          ifsc: branches.find(b => b.id === selectedBranch)?.ifsc || 'SBIN0001234',
          branch: branches.find(b => b.id === selectedBranch)?.name || 'Main Branch',
          atmCardNumber: 'Pending Activation'
        };
        setAccounts(prev => [...prev, newAcc]);
        setSubmitting(false);
        setShowCreateForm(false);
        // Reset form
        setInitialDeposit('');
      }, 1000);
      
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const handleRequestAtmCard = async (accountId: string) => {
    try {
      // INTEGRATION POINT: Call `requestAtmCard` API from `../../APIs/account`
      // Example:
      // const res = await requestAtmCard();
      
      console.log('Requesting ATM card for account id:', accountId);
      alert('ATM card request submitted successfully. You will receive it shortly.');
      
      setAccounts(prev => prev.map(acc => {
        if (acc.id === accountId) {
          return {
            ...acc,
            atmCardNumber: '•••• •••• •••• ' + Math.floor(1000 + Math.random() * 9000)
          };
        }
        return acc;
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans relative pb-12">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue-500 rounded-full glow-circle opacity-10" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-indigo-500 rounded-full glow-circle opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
              My <span className="text-gradient-primary">Accounts</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Configure your bank accounts, review branch information, and manage ATM cards.</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="glow-btn-primary flex items-center space-x-1.5 px-5 py-3 rounded-xl text-sm font-semibold shadow-lg transition cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Open New Account</span>
          </button>
        </div>

        {/* Accounts Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {accounts.map((account) => (
            <div 
              key={account.id} 
              className="glass-panel rounded-3xl border border-white/10 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between group"
            >
              {/* Decorative graphic glows for premium credit card style */}
              <div className={`absolute -right-16 -top-16 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition duration-500 ${
                account.type === 'Savings' ? 'bg-indigo-500' : 'bg-emerald-500'
              }`} />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border mb-2 ${
                    account.type === 'Savings' 
                      ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' 
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  }`}>
                    {account.type} Account
                  </span>
                  <p className="text-xs text-gray-400">Account No.</p>
                  <p className="text-lg font-mono font-bold text-white tracking-wider mt-0.5">{account.accountNumber}</p>
                </div>
                <span className={`flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${
                  account.status === 'Active' 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${account.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {account.status}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-xs text-gray-400">Available Balance</p>
                <p className="text-3xl font-display font-extrabold text-white mt-1">
                  ₹{account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-2 gap-4">
                  <span className="flex items-center"><Building className="w-3.5 h-3.5 mr-1" /> {account.branch}</span>
                  <span className="font-mono">IFSC: {account.ifsc}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 flex items-center">
                    <CreditCard className="w-4 h-4 mr-1.5 text-gray-500" />
                    ATM Card Number
                  </span>
                  <span className="text-sm font-mono text-white font-medium">{account.atmCardNumber}</span>
                </div>

                <div className="flex space-x-3">
                  {account.atmCardNumber === 'Pending Activation' ? (
                    <button
                      onClick={() => handleRequestAtmCard(account.id)}
                      className="flex-1 bg-blue-600/10 hover:bg-blue-600/25 border border-blue-500/20 text-blue-400 hover:text-blue-300 py-2.5 px-4 rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                      Request ATM Card
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-white/5 border border-white/5 text-gray-500 py-2.5 px-4 rounded-xl text-xs font-semibold"
                    >
                      ATM Card Active
                    </button>
                  )}
                  <button 
                    onClick={() => navigate(`/accounts/${account.accountNumber}`)}
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Account Services / Quick Utility Cards */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white font-display mb-5">Digital Banking Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/5 hover:border-white/10 transition duration-300 cursor-pointer group">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Account Statement</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">Download formal statement logs for financial verifications.</p>
            </div>

            <div className="p-4 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/5 hover:border-white/10 transition duration-300 cursor-pointer group">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Sliders className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Transfer Limits</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">Adjust transaction limits for security controls and anti-fraud.</p>
            </div>

            <div className="p-4 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/5 hover:border-white/10 transition duration-300 cursor-pointer group">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Account Alerts</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">Configure email & mobile alerts for incoming or outgoing funds.</p>
            </div>
          </div>
        </div>

        {/* Create Account Glassmorphic Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-[#0f172a] rounded-3xl border border-white/15 p-6 shadow-2xl max-w-md w-full animate-scale-up">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-bold font-display text-white">Open New Account</h2>
                </div>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-gray-400 hover:text-white transition focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAccount} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Account Type
                  </label>
                  <select 
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                  >
                    <option value="savings">Savings Account (Interest earning)</option>
                    <option value="current">Current Account (Business/No limits)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Initial Deposit (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                    className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 placeholder-gray-600 text-white"
                    placeholder="Enter deposit amount e.g. 5000"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Minimum deposit of ₹500 required for account setup.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Select Branch Location
                  </label>
                  <select 
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                  >
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name} (IFSC: {branch.ifsc})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-lg hover:shadow-blue-500/25 transition disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? 'Creating...' : 'Create Account'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-white/5 border border-white/10 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Accounts;