import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Shield,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

const AccountDetail = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [loading, setLoading] = useState(false);

  // Mock detailed data - will be populated via API calls later
  const [account, setAccount] = useState({
    accountNumber: accountId || '123456789012',
    type: 'Savings',
    balance: 15420.50,
    ifsc: 'SBIN0001234',
    branch: 'Main Branch, City Center',
    status: 'Active',
    atmCardNumber: '•••• •••• •••• 1234',
    interestRate: '4.25% p.a.',
    openedDate: '12 Jan 2024'
  });

  const [activities, setActivities] = useState([
    { id: '1', type: 'Deposit', amount: 5000, description: 'Salary Credit', date: '01 Mar 2026', status: 'Completed' },
    { id: '2', type: 'Transfer', amount: -1200, description: 'Online Fund Transfer', date: '27 Feb 2026', status: 'Completed' },
    { id: '3', type: 'Withdrawal', amount: -800, description: 'ATM Withdrawal', date: '20 Feb 2026', status: 'Completed' },
    { id: '4', type: 'Deposit', amount: 1500, description: 'UPI Deposit - Self', date: '15 Feb 2026', status: 'Completed' }
  ]);

  useEffect(() => {
    // INTEGRATION POINT: Fetch account details and transactions using accountId URL parameter.
    // Example:
    // const fetchDetails = async () => {
    //   setLoading(true);
    //   try {
    //     // fetch account details
    //     const res = await getAccountDetails(accountId);
    //     if (res) setAccount(res);
    //     // fetch transaction list
    //     const history = await getTransactionHistoryByAccount(accountId);
    //     if (history) setActivities(history);
    //   } catch (err) { console.error(err); }
    //   setLoading(false);
    // };
    // fetchDetails();
  }, [accountId]);

  // Calculate monthly stats
  const totalCredits = activities.filter(a => a.amount > 0).reduce((sum, a) => sum + a.amount, 0);
  const totalDebits = Math.abs(activities.filter(a => a.amount < 0).reduce((sum, a) => sum + a.amount, 0));

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans relative pb-12">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-blue-500 rounded-full glow-circle opacity-10" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-indigo-500 rounded-full glow-circle opacity-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to="/accounts" 
            className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Accounts</span>
          </Link>
          <span className="text-xs text-gray-500 font-mono">Secure Connection AES-256</span>
        </div>

        {/* Account Summary Card */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl mb-8 animate-scale-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-white/5">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {account.type} Account
                </span>
                <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                  {account.status}
                </span>
              </div>
              <h1 className="text-3xl font-display font-extrabold text-white mt-2">Account Details</h1>
              <p className="text-sm text-gray-400 mt-1">Review your statements and limits for: <span className="font-mono text-gray-200">{account.accountNumber}</span></p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Account Balance</p>
              <p className="text-4xl font-display font-extrabold text-white mt-1">
                ₹{account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-white/3 border border-white/5 rounded-2xl">
              <span className="text-xs text-gray-400 flex items-center mb-1"><CreditCard className="w-4 h-4 mr-1.5 text-gray-500" /> Account Number</span>
              <span className="text-sm font-mono font-semibold text-white">{account.accountNumber}</span>
            </div>
            <div className="p-4 bg-white/3 border border-white/5 rounded-2xl">
              <span className="text-xs text-gray-400 flex items-center mb-1"><Building className="w-4 h-4 mr-1.5 text-gray-500" /> Associated Branch</span>
              <span className="text-sm font-semibold text-white leading-tight block">{account.branch}</span>
            </div>
            <div className="p-4 bg-white/3 border border-white/5 rounded-2xl">
              <span className="text-xs text-gray-400 flex items-center mb-1"><Shield className="w-4 h-4 mr-1.5 text-gray-500" /> Branch IFSC</span>
              <span className="text-sm font-mono font-semibold text-white">{account.ifsc}</span>
            </div>
            <div className="p-4 bg-white/3 border border-white/5 rounded-2xl">
              <span className="text-xs text-gray-400 flex items-center mb-1"><Calendar className="w-4 h-4 mr-1.5 text-gray-500" /> Opened Date</span>
              <span className="text-sm font-semibold text-white">{account.openedDate}</span>
            </div>
          </div>
        </div>

        {/* Details & Logs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Spending overview - 4 Cols */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Monthly Stats</h3>
            
            <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-5">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Total Inflow</span>
                    <span className="text-sm font-bold text-white mt-0.5">₹{totalCredits.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-red-500/10 rounded-lg border border-red-500/20 text-red-400">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Total Outflow</span>
                    <span className="text-sm font-bold text-white mt-0.5">₹{totalDebits.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Progress bars representing flow ratio */}
              <div className="pt-2 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Inflow Ratio</span>
                  <span>{totalCredits > 0 ? Math.round((totalCredits / (totalCredits + totalDebits)) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-white/5">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${totalCredits > 0 ? (totalCredits / (totalCredits + totalDebits)) * 100 : 0}%` }}
                  />
                </div>
              </div>

            </div>

            <div className="p-5 bg-blue-900/10 border border-blue-500/15 rounded-3xl space-y-3">
              <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Interest rates info</h4>
              <p className="text-xs text-gray-300 leading-relaxed">Your Savings account earns <span className="font-semibold text-white">{account.interestRate}</span> interest compounded monthly. Check with branches for term deposit options.</p>
            </div>
          </div>

          {/* Right Side: Account Activity - 8 Cols */}
          <div className="lg:col-span-8 space-y-4 animate-scale-up">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Account Activity</h3>
            
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-lg">
              <div className="divide-y divide-white/5">
                {activities.length > 0 ? (
                  activities.map((act) => (
                    <div key={act.id} className="p-4.5 flex items-center justify-between hover:bg-white/2 transition duration-200">
                      <div className="flex items-center space-x-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                          act.amount > 0 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : act.type === 'Withdrawal' 
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                              : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                          {act.amount > 0 ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{act.description}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {act.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${act.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {act.amount > 0 ? '+' : ''}₹{Math.abs(act.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] rounded bg-white/5 border border-white/5 text-gray-400 font-medium">
                          {act.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm py-8 text-center">No transactions on this account.</p>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountDetail;
