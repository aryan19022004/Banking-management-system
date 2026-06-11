import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  CreditCard, 
  Activity, 
  ArrowRight, 
  PlusCircle, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  ShieldAlert,
  Building,
  RefreshCw
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Mock data for UI rendering (Separated clearly for future API integration)
  const [accountData, setAccountData] = useState({
    id: '1',
    balance: 43920.75,
    accountType: 'Savings',
    accountStatus: 'Active',
    accountNumber: '123456789012',
    ifsc: 'SBIN0001234',
    branchName: 'Main Branch, City Center',
    atmCardNumber: '•••• •••• •••• 1234'
  });

  const [transactions, setTransactions] = useState([
    {
      id: 'tx_1',
      type: 'Transfer',
      amount: -2500.00,
      description: 'Transfer to John Doe',
      date: '2026-06-11 14:30',
      status: 'Completed'
    },
    {
      id: 'tx_2',
      type: 'Deposit',
      amount: 12000.00,
      description: 'Salary Deposit',
      date: '2026-06-10 09:00',
      status: 'Completed'
    },
    {
      id: 'tx_3',
      type: 'Withdrawal',
      amount: -1500.00,
      description: 'ATM Cash Withdrawal',
      date: '2026-06-08 16:45',
      status: 'Completed'
    },
    {
      id: 'tx_4',
      type: 'Transfer',
      amount: -850.25,
      description: 'Utility Bill Payment',
      date: '2026-06-07 11:20',
      status: 'Completed'
    }
  ]);

  useEffect(() => {
    // INTEGRATION POINT: Fetch user account and transaction histories here.
    // Example:
    // const fetchDashboardData = async () => {
    //   setLoading(true);
    //   try {
    //     const acc = await getMyAccount();
    //     const txs = await transactionHistory();
    //     if (acc) setAccountData(acc);
    //     if (txs) setTransactions(txs);
    //   } catch(e) { console.error(e); }
    //   setLoading(false);
    // };
    // fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans relative pb-12">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500 rounded-full glow-circle opacity-10" />
      <div className="absolute top-[30%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full glow-circle opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
              Welcome back, <span className="text-gradient-primary">John Doe</span>!
            </h1>
            <p className="text-gray-400 text-sm mt-1">Here is a real-time overview of your digital banking dashboard.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleRefresh}
              className="p-2.5 rounded-xl glass-panel hover:bg-white/5 border border-white/10 transition duration-300 text-gray-300 hover:text-white"
              title="Refresh Dashboard"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link 
              to="/accounts" 
              className="glow-btn-primary flex items-center space-x-1.5 px-4.5 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Open Account</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-scale-up">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center shadow-lg relative overflow-hidden card-sheen">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Net Liquid Value</p>
              <p className="text-2xl font-bold text-white mt-1">
                ₹{accountData.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="absolute right-0 bottom-0 translate-y-4 translate-x-4 opacity-5 text-white">
              <Wallet className="w-24 h-24" />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center shadow-lg relative overflow-hidden card-sheen">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Active Account Type</p>
              <p className="text-2xl font-bold text-indigo-300 mt-1">{accountData.accountType}</p>
            </div>
            <div className="absolute right-0 bottom-0 translate-y-4 translate-x-4 opacity-5 text-white">
              <CreditCard className="w-24 h-24" />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center shadow-lg relative overflow-hidden card-sheen">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
              <Activity className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Account Status</p>
              <div className="flex items-center mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                <span className="text-2xl font-bold text-white">{accountData.accountStatus}</span>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 translate-y-4 translate-x-4 opacity-5 text-white">
              <Activity className="w-24 h-24" />
            </div>
          </div>
        </div>

        {/* Quick Services Navigation */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Quick Financial Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/transactions?tab=transfer')}
              className="glass-panel hover:bg-white/5 border border-white/5 p-5 rounded-2xl shadow-md flex flex-col items-center justify-center text-center transition duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition duration-300">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-white">Transfer Money</span>
              <span className="text-[10px] text-gray-500 mt-0.5">Send instantly to accounts</span>
            </button>

            <button 
              onClick={() => navigate('/transactions?tab=deposit')}
              className="glass-panel hover:bg-white/5 border border-white/5 p-5 rounded-2xl shadow-md flex flex-col items-center justify-center text-center transition duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition duration-300">
                <ArrowDownLeft className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-white">Deposit Cash</span>
              <span className="text-[10px] text-gray-500 mt-0.5">Fund active balance</span>
            </button>

            <button 
              onClick={() => navigate('/transactions?tab=withdraw')}
              className="glass-panel hover:bg-white/5 border border-white/5 p-5 rounded-2xl shadow-md flex flex-col items-center justify-center text-center transition duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-3 group-hover:scale-110 transition duration-300">
                <ArrowUpCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-white">Withdraw Funds</span>
              <span className="text-[10px] text-gray-500 mt-0.5">Draw out to card</span>
            </button>

            <button 
              onClick={() => navigate('/atm')}
              className="glass-panel hover:bg-white/5 border border-white/5 p-5 rounded-2xl shadow-md flex flex-col items-center justify-center text-center transition duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition duration-300">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-white">ATM Services</span>
              <span className="text-[10px] text-gray-500 mt-0.5">Manage PIN & ATM cards</span>
            </button>
          </div>
        </div>

        {/* Mid Section: Digital Card and Transaction Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Card Overview - 5 Cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Your Digital Card</h2>
              <Link to="/accounts" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center">
                <span>View all accounts</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            {/* Neon Credit Card representation */}
            <div className="w-full aspect-[1.586] rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-950 p-6 shadow-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between group">
              {/* Backside glows */}
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/35 transition duration-500" />
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">SecureBank</h3>
                  <p className="text-[10px] text-gray-400 tracking-wider">PREMIUM PLATINUM</p>
                </div>
                {/* Chip Graphic */}
                <div className="w-10 h-8 bg-amber-400/80 rounded-lg shadow-inner border border-amber-300/40 relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-30">
                    {[...Array(6)].map((_, i) => <div key={i} className="border border-black/30" />)}
                  </div>
                </div>
              </div>

              <div className="relative z-10 my-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Available Balance</p>
                <p className="text-3xl font-bold tracking-tight text-white mt-1">
                  ₹{accountData.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div>
                  <p className="text-[8px] text-gray-400 uppercase">Card Number</p>
                  <p className="text-sm font-mono tracking-widest text-white mt-0.5">{accountData.atmCardNumber}</p>
                </div>
                {/* Card Brand */}
                <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 p-1 px-2.5 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 -ml-1.5 rounded-full" />
                  <span className="text-[10px] font-bold text-white">visa</span>
                </div>
              </div>
            </div>

            {/* Quick Account Details Details */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center"><Building className="w-4 h-4 mr-2 text-gray-500" /> Branch</span>
                <span className="font-medium text-white text-right">{accountData.branchName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center"><CreditCard className="w-4 h-4 mr-2 text-gray-500" /> Account No.</span>
                <span className="font-mono text-white">{accountData.accountNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center"><ShieldAlert className="w-4 h-4 mr-2 text-gray-500" /> IFSC Code</span>
                <span className="font-mono text-white">{accountData.ifsc}</span>
              </div>
            </div>
          </div>

          {/* Activity Log - 7 Cols */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Recent Transactions</h2>
              <Link to="/transactions?tab=history" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center">
                <span>View transaction log</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <div className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-4.5 flex items-center justify-between hover:bg-white/2 transition duration-200">
                    <div className="flex items-center space-x-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                        tx.amount > 0 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                          : tx.type === 'Withdrawal' 
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}>
                        {tx.amount > 0 ? (
                          <ArrowDownCircle className="w-5 h-5" />
                        ) : tx.type === 'Withdrawal' ? (
                          <CreditCard className="w-5 h-5" />
                        ) : (
                          <ArrowUpCircle className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{tx.description}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/5 text-gray-400">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;