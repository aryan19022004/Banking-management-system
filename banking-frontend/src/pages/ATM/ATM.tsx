import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldAlert, 
  Delete,
  CheckCircle
} from 'lucide-react';

const ATM = () => {
  const [activeService, setActiveService] = useState('balance');
  const [atmCardNumber, setAtmCardNumber] = useState('');
  const [atmPin, setAtmPin] = useState('');
  const [amount, setAmount] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  const [activeInput, setActiveInput] = useState<'card' | 'pin' | 'amount' | 'newPin' | 'confirmPin'>('card');
  const [screenMessage, setScreenMessage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const services = [
    { id: 'balance', name: 'Check Balance', icon: '💰', description: 'View current account balance' },
    { id: 'withdraw', name: 'Cash Withdrawal', icon: '💵', description: 'Withdraw cash from ATM card' },
    { id: 'mini-statement', name: 'Mini Statement', icon: '📄', description: 'Print last 5 statements' },
    { id: 'pin-change', name: 'Change PIN', icon: '🔐', description: 'Modify your secret 4-digit PIN' }
  ];

  const handleKeypadClick = (val: string) => {
    setScreenMessage(null);
    if (activeInput === 'card') {
      if (atmCardNumber.length < 16) setAtmCardNumber(prev => prev + val);
    } else if (activeInput === 'pin') {
      if (atmPin.length < 4) setAtmPin(prev => prev + val);
    } else if (activeInput === 'amount') {
      setAmount(prev => prev + val);
    } else if (activeInput === 'newPin') {
      if (newPin.length < 4) setNewPin(prev => prev + val);
    } else if (activeInput === 'confirmPin') {
      if (confirmNewPin.length < 4) setConfirmNewPin(prev => prev + val);
    }
  };

  const handleBackspace = () => {
    setScreenMessage(null);
    if (activeInput === 'card') {
      setAtmCardNumber(prev => prev.slice(0, -1));
    } else if (activeInput === 'pin') {
      setAtmPin(prev => prev.slice(0, -1));
    } else if (activeInput === 'amount') {
      setAmount(prev => prev.slice(0, -1));
    } else if (activeInput === 'newPin') {
      setNewPin(prev => prev.slice(0, -1));
    } else if (activeInput === 'confirmPin') {
      setConfirmNewPin(prev => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    setScreenMessage(null);
    if (activeInput === 'card') setAtmCardNumber('');
    else if (activeInput === 'pin') setAtmPin('');
    else if (activeInput === 'amount') setAmount('');
    else if (activeInput === 'newPin') setNewPin('');
    else if (activeInput === 'confirmPin') setConfirmNewPin('');
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (atmCardNumber.length !== 16) {
      setScreenMessage({ type: 'error', text: 'Invalid Card: Must be exactly 16 digits.' });
      return;
    }
    if (atmPin.length !== 4) {
      setScreenMessage({ type: 'error', text: 'Invalid PIN: Must be exactly 4 digits.' });
      return;
    }

    setLoading(true);
    setScreenMessage(null);

    try {
      // INTEGRATION POINT: Call respective ATM operations.
      // - balance: `getBalanceByAtm` from `../../APIs/account`
      // - withdraw: `withdrawMoneyATM` from `../../APIs/transactions`
      // - pin-change: `updateAccount` (to modify pin)
      
      console.log('ATM Request Submitted:', { activeService, atmCardNumber, atmPin, amount, newPin });

      setTimeout(() => {
        setLoading(false);
        if (activeService === 'balance') {
          setScreenMessage({
            type: 'success',
            text: `Card validation successful! Available Balance is: ₹43,920.75`
          });
        } else if (activeService === 'withdraw') {
          const wAmount = parseInt(amount);
          if (isNaN(wAmount) || wAmount < 100 || wAmount > 10000 || wAmount % 100 !== 0) {
            setScreenMessage({
              type: 'error',
              text: 'Transaction Failed: Amount must be in multiples of ₹100, min ₹100, max ₹10,000.'
            });
            return;
          }
          setScreenMessage({
            type: 'success',
            text: `Withdrawal Successful: Dispensed ₹${wAmount.toLocaleString('en-IN')}. Please collect your cash.`
          });
          setAmount('');
        } else if (activeService === 'mini-statement') {
          setScreenMessage({
            type: 'success',
            text: 'Mini Statement Sent: Last 5 transaction history records printed/sent to email.'
          });
        } else if (activeService === 'pin-change') {
          if (newPin !== confirmNewPin || newPin.length !== 4) {
            setScreenMessage({
              type: 'error',
              text: 'PIN Change Failed: New PINs do not match or are invalid.'
            });
            return;
          }
          setScreenMessage({
            type: 'success',
            text: 'Security Updated: ATM PIN changed successfully.'
          });
          setNewPin('');
          setConfirmNewPin('');
        }
      }, 1500);

    } catch (err: any) {
      setScreenMessage({ type: 'error', text: err.message || 'ATM service failed to execute.' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans relative pb-12">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-blue-500 rounded-full glow-circle opacity-10" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-indigo-500 rounded-full glow-circle opacity-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            SecureBank <span className="text-gradient-primary">ATM Portal</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Simulated online ATM terminal network. Access card accounts instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Service Selector (3 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">ATM Services</h3>
            <div className="space-y-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveService(service.id);
                    setScreenMessage(null);
                    if (service.id === 'withdraw') setActiveInput('amount');
                    else if (service.id === 'pin-change') setActiveInput('newPin');
                    else setActiveInput('card');
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition duration-300 shadow-md cursor-pointer ${
                    activeService === service.id
                      ? 'border-blue-500 bg-blue-600/10 text-blue-400'
                      : 'border-white/5 bg-slate-900/40 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">{service.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* ATM Rules */}
            <div className="p-4 bg-blue-900/10 border border-blue-500/15 rounded-2xl space-y-2.5 text-xs text-blue-300">
              <h4 className="font-bold uppercase tracking-wider text-blue-400">Terminal Rules</h4>
              <ul className="space-y-1">
                <li>• Daily limit: ₹10,000 max withdrawal</li>
                <li>• Max 5 daily transactions per card</li>
                <li>• Multiples of ₹100 only for cash draws</li>
                <li>• Secure SSL PIN encryption</li>
              </ul>
            </div>
          </div>

          {/* Interactive Screen & Keypad (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* The ATM Terminal screen block */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#020617] p-6 shadow-2xl relative overflow-hidden ring-4 ring-slate-950">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
              
              {/* Screen Top Status bar */}
              <div className="flex justify-between items-center text-[10px] font-mono text-emerald-500/60 pb-3 border-b border-emerald-950/40 mb-4">
                <span>ONLINE TERMINAL ID: SB_ATM_99</span>
                <span>SECURE MODE ACTIVE</span>
              </div>

              {/* Main Screen Content */}
              <div className="min-h-[220px] flex flex-col justify-between font-mono text-emerald-400">
                {loading ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                    <p className="text-xs tracking-widest text-emerald-500 uppercase">CONTACTING SECURE HOST...</p>
                  </div>
                ) : screenMessage ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                    {screenMessage.type === 'success' ? (
                      <CheckCircle className="w-10 h-10 text-emerald-500 mb-3" />
                    ) : (
                      <ShieldAlert className="w-10 h-10 text-red-500 mb-3" />
                    )}
                    <p className={`text-sm font-semibold leading-relaxed ${screenMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {screenMessage.text}
                    </p>
                    <button 
                      onClick={() => setScreenMessage(null)}
                      className="mt-5 px-4 py-1.5 rounded-lg border border-emerald-500/30 text-xs hover:bg-emerald-500/10 text-emerald-400 transition cursor-pointer"
                    >
                      Clear Screen
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleServiceSubmit} className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
                      SERVICE: {services.find(s => s.id === activeService)?.name.toUpperCase()}
                    </h3>

                    <div className="space-y-3 text-xs">
                      {/* Card Input field */}
                      <div 
                        onClick={() => setActiveInput('card')}
                        className={`p-3 rounded-lg border cursor-pointer transition ${
                          activeInput === 'card' 
                            ? 'border-emerald-400 bg-emerald-500/5' 
                            : 'border-emerald-950/40 bg-[#020617]'
                        }`}
                      >
                        <p className="text-[10px] text-emerald-500/60 uppercase">CARD NUMBER (16 DIGITS)</p>
                        <p className="text-sm font-bold tracking-widest mt-1">
                          {atmCardNumber ? atmCardNumber.replace(/(.{4})/g, '$1 ') : 'ENTER 16-DIGIT CARD NUMBER'}
                        </p>
                      </div>

                      {/* PIN Input field */}
                      <div 
                        onClick={() => setActiveInput('pin')}
                        className={`p-3 rounded-lg border cursor-pointer transition ${
                          activeInput === 'pin' 
                            ? 'border-emerald-400 bg-emerald-500/5' 
                            : 'border-emerald-950/40 bg-[#020617]'
                        }`}
                      >
                        <p className="text-[10px] text-emerald-500/60 uppercase">CARD PIN (4 DIGITS)</p>
                        <p className="text-sm font-bold tracking-widest mt-1">
                          {atmPin ? '• '.repeat(atmPin.length) : 'ENTER 4-DIGIT PIN'}
                        </p>
                      </div>

                      {/* Withdrawal amount - Only for withdrawal */}
                      {activeService === 'withdraw' && (
                        <div 
                          onClick={() => setActiveInput('amount')}
                          className={`p-3 rounded-lg border cursor-pointer transition ${
                            activeInput === 'amount' 
                              ? 'border-emerald-400 bg-emerald-500/5' 
                              : 'border-emerald-950/40 bg-[#020617]'
                          }`}
                        >
                          <p className="text-[10px] text-emerald-500/60 uppercase">WITHDRAW AMOUNT (₹ MULTIPLES OF 100)</p>
                          <p className="text-sm font-bold mt-1">
                            {amount ? `₹${parseInt(amount).toLocaleString('en-IN')}` : 'ENTER AMOUNT (MIN ₹100)'}
                          </p>
                        </div>
                      )}

                      {/* New PIN & Confirm - PIN change service */}
                      {activeService === 'pin-change' && (
                        <div className="grid grid-cols-2 gap-3">
                          <div 
                            onClick={() => setActiveInput('newPin')}
                            className={`p-3 rounded-lg border cursor-pointer transition ${
                              activeInput === 'newPin' 
                                ? 'border-emerald-400 bg-emerald-500/5' 
                                : 'border-emerald-950/40 bg-[#020617]'
                            }`}
                          >
                            <p className="text-[9px] text-emerald-500/60 uppercase">NEW PIN</p>
                            <p className="text-sm font-bold tracking-wider mt-1">
                              {newPin ? '• '.repeat(newPin.length) : 'ENTER PIN'}
                            </p>
                          </div>
                          <div 
                            onClick={() => setActiveInput('confirmPin')}
                            className={`p-3 rounded-lg border cursor-pointer transition ${
                              activeInput === 'confirmPin' 
                                ? 'border-emerald-400 bg-emerald-500/5' 
                                : 'border-emerald-950/40 bg-[#020617]'
                            }`}
                          >
                            <p className="text-[9px] text-emerald-500/60 uppercase">CONFIRM PIN</p>
                            <p className="text-sm font-bold tracking-wider mt-1">
                              {confirmNewPin ? '• '.repeat(confirmNewPin.length) : 'CONFIRM PIN'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Prompt */}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] text-emerald-500/60 uppercase tracking-widest">TAP ANY INPUT TO FOCUS</span>
                      <button 
                        type="submit"
                        className="px-6 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400 transition cursor-pointer"
                      >
                        EXECUTE
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Numerical Keypad panel */}
            <div className="max-w-sm mx-auto bg-slate-900/50 p-6 rounded-3xl border border-white/5 shadow-lg">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleKeypadClick(val.toString())}
                    className="aspect-square bg-slate-800 hover:bg-slate-700 active:bg-slate-650 rounded-2xl border border-white/5 flex items-center justify-center text-lg font-bold text-white shadow transition-all hover:scale-102 cursor-pointer"
                  >
                    {val}
                  </button>
                ))}
                
                {/* Backspace */}
                <button
                  type="button"
                  onClick={handleBackspace}
                  className="aspect-square bg-red-950/40 hover:bg-red-950/70 border border-red-500/25 rounded-2xl flex items-center justify-center text-red-400 font-semibold text-sm transition cursor-pointer"
                >
                  <Delete className="w-5 h-5" />
                </button>

                {/* Number 0 */}
                <button
                  type="button"
                  onClick={() => handleKeypadClick('0')}
                  className="aspect-square bg-slate-800 hover:bg-slate-700 active:bg-slate-650 rounded-2xl border border-white/5 flex items-center justify-center text-lg font-bold text-white shadow transition cursor-pointer"
                >
                  0
                </button>

                {/* Clear Input */}
                <button
                  type="button"
                  onClick={handleClear}
                  className="aspect-square bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/25 rounded-2xl flex items-center justify-center text-amber-400 font-semibold text-xs transition cursor-pointer"
                >
                  CLEAR
                </button>
              </div>
            </div>

            {/* ATM Locator Map list */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">ATM Network Locations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-white/3 border border-white/5 rounded-xl space-y-1">
                  <h4 className="font-semibold text-white flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-blue-400" /> City Center ATM</h4>
                  <p className="text-gray-400">123 Main Street, Ground Floor</p>
                  <span className="text-[10px] text-emerald-400 font-medium">● Operational 24/7</span>
                </div>
                <div className="p-3.5 bg-white/3 border border-white/5 rounded-xl space-y-1">
                  <h4 className="font-semibold text-white flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-blue-400" /> Galleria Mall ATM</h4>
                  <p className="text-gray-400">Level 2, Food Court Galleria</p>
                  <span className="text-[10px] text-emerald-400 font-medium">● Operational 24/7</span>
                </div>
                <div className="p-3.5 bg-white/3 border border-white/5 rounded-xl space-y-1">
                  <h4 className="font-semibold text-white flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-blue-400" /> Int'l Airport Terminal 2</h4>
                  <p className="text-gray-400">T2 Departures Wing, Post Security</p>
                  <span className="text-[10px] text-amber-400 font-medium">● Limited Access</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ATM;