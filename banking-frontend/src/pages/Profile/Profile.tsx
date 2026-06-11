import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Settings, 
  Smartphone, 
  Monitor, 
  CheckCircle
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<any>(null);

  const tabs = [
    { id: 'personal', name: 'Personal Details', icon: User },
    { id: 'security', name: 'Account Security', icon: Lock },
    { id: 'notifications', name: 'Alert Settings', icon: Bell },
    { id: 'preferences', name: 'System Options', icon: Settings }
  ];

  // Mock user data (separated for future API connectivity)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1990-01-15',
    address: '123 Main Street, City, State 123456',
    occupation: 'Software Engineer',
    customerId: 'CUST_88201'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    transactions: true,
    security: true,
    marketing: false,
    sms: true,
    push: true
  });

  const [systemPreferences, setSystemPreferences] = useState({
    language: 'en',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    theme: 'dark',
    biometrics: true
  });

  const handlePersonalInfoUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // INTEGRATION POINT: Call backend user profile update API.
    // Example:
    // const res = await updateProfileApi(userData);
    
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Personal details updated successfully.' });
    }, 1000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (securityData.newPassword !== securityData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setLoading(true);

    // INTEGRATION POINT: Call password update API endpoint.
    // Example:
    // const res = await changePasswordApi(securityData.currentPassword, securityData.newPassword);

    setTimeout(() => {
      setLoading(false);
      setSecurityData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      setMessage({ type: 'success', text: 'Password changed successfully.' });
    }, 1200);
  };

  const handleSavePreferences = () => {
    setLoading(true);
    setMessage(null);

    // INTEGRATION POINT: Update user settings in DB/Localstorage.
    
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: 'success', text: 'System preferences saved successfully.' });
    }, 800);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityInputChange = (field: string, value: string | boolean) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans relative pb-12">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-blue-500 rounded-full glow-circle opacity-10" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-indigo-500 rounded-full glow-circle opacity-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            My <span className="text-gradient-primary">Profile & Settings</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Configure security levels, user preferences, and notification channels.</p>
        </div>

        {/* Messaging Feedback */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border animate-scale-up text-sm flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: User Card and Navigation Tabs (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* User Profile display card */}
            <div className="glass-panel rounded-3xl border border-white/10 p-6 text-center relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
              
              <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl mx-auto mb-4 border border-white/10">
                JD
              </div>
              <h3 className="text-lg font-bold text-white font-display">{userData.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{userData.email}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-wider uppercase">
                Customer ID: {userData.customerId}
              </span>
            </div>

            {/* Navigation Tabs block */}
            <div className="glass-panel rounded-3xl border border-white/10 p-2 space-y-1 shadow-md">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const isTabActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setMessage(null); }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition duration-300 font-semibold text-sm cursor-pointer border border-transparent ${
                      isTabActive
                        ? 'bg-blue-600/25 text-blue-400 border-blue-500/20 shadow-inner'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Tab Forms (8 Cols) */}
          <div className="lg:col-span-8 animate-scale-up">
            <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl">
              
              {/* Personal Details Tab */}
              {activeTab === 'personal' && (
                <div>
                  <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/5">
                    <div>
                      <h2 className="text-lg font-bold font-display text-white">Personal Information</h2>
                      <p className="text-xs text-gray-400">View and update your personal details stored in the bank database.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition duration-200 cursor-pointer ${
                        isEditing 
                          ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                          : 'bg-blue-600/10 border-blue-500/20 text-blue-400 hover:bg-blue-600/25'
                      }`}
                    >
                      {isEditing ? 'Cancel' : 'Edit details'}
                    </button>
                  </div>

                  <form onSubmit={handlePersonalInfoUpdate} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={userData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white disabled:bg-slate-950/50 disabled:text-gray-400 disabled:border-white/5"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={userData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white disabled:bg-slate-950/50 disabled:text-gray-400 disabled:border-white/5"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={userData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white disabled:bg-slate-950/50 disabled:text-gray-400 disabled:border-white/5"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          required
                          value={userData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white disabled:bg-slate-950/50 disabled:text-gray-400 disabled:border-white/5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Occupation
                      </label>
                      <input
                        type="text"
                        required
                        value={userData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white disabled:bg-slate-950/50 disabled:text-gray-400 disabled:border-white/5"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Address
                      </label>
                      <textarea
                        required
                        value={userData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white disabled:bg-slate-950/50 disabled:text-gray-400 disabled:border-white/5"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2.5 border border-white/10 text-white rounded-xl text-sm font-semibold hover:bg-white/5 transition duration-200 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-5 py-2.5 glow-btn-primary rounded-xl text-sm font-semibold shadow-lg transition duration-200 disabled:opacity-50 cursor-pointer"
                        >
                          {loading ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-white/5">
                    <h2 className="text-lg font-bold font-display text-white">Security Settings</h2>
                    <p className="text-xs text-gray-400">Manage login credentials, adjust encryption settings, and view session logs.</p>
                  </div>

                  {/* Password Form */}
                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={securityData.currentPassword}
                        onChange={(e) => handleSecurityInputChange('currentPassword', e.target.value)}
                        className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={securityData.newPassword}
                          onChange={(e) => handleSecurityInputChange('newPassword', e.target.value)}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={securityData.confirmPassword}
                          onChange={(e) => handleSecurityInputChange('confirmPassword', e.target.value)}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl glass-input text-sm focus:border-blue-500 text-white"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition duration-200 cursor-pointer"
                    >
                      {loading ? 'Changing Password...' : 'Update Password'}
                    </button>
                  </form>

                  {/* 2FA Toggle */}
                  <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Two-Factor Authentication (2FA)</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Increases account safety by sending SMS verification tokens during sensitive actions.</p>
                    </div>
                    
                    {/* Modern slider toggle switch */}
                    <button
                      onClick={() => handleSecurityInputChange('twoFactorEnabled', !securityData.twoFactorEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
                        securityData.twoFactorEnabled ? 'bg-indigo-500' : 'bg-white/10'
                      }`}
                    >
                      <span
                        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform duration-300 ${
                          securityData.twoFactorEnabled ? 'translate-x-5.5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Active login history logs */}
                  <div className="border-t border-white/5 pt-6">
                    <h3 className="text-sm font-semibold text-white mb-4">Recent Session Activity</h3>
                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-center justify-between py-2 border-b border-white/2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <Monitor className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">Chrome on Windows 11</p>
                            <p className="text-gray-500 mt-0.5">IP Address: 192.168.1.18 • Mumbai, India</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Active Now</span>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 text-gray-400 flex items-center justify-center">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">Mobile Secure App (iPhone 14)</p>
                            <p className="text-gray-500 mt-0.5">IP Address: 172.16.88.24 • Pune, India</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Alert Settings Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-white/5">
                    <h2 className="text-lg font-bold font-display text-white">Alert Configurations</h2>
                    <p className="text-xs text-gray-400">Configure what channels (SMS, Email, Push) to notify you on during activities.</p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Transaction SMS Alerts</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Instant alerts when funds are deposited, withdrawn or transferred.</p>
                      </div>
                      <button
                        onClick={() => setNotificationPreferences(p => ({ ...p, transactions: !p.transactions }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-350 focus:outline-none cursor-pointer ${
                          notificationPreferences.transactions ? 'bg-indigo-500' : 'bg-white/10'
                        }`}
                      >
                        <span className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform duration-350 ${
                          notificationPreferences.transactions ? 'translate-x-5.5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Security Alerts</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Critical notifications when password changes or login locations shift.</p>
                      </div>
                      <button
                        onClick={() => setNotificationPreferences(p => ({ ...p, security: !p.security }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-350 focus:outline-none cursor-pointer ${
                          notificationPreferences.security ? 'bg-indigo-500' : 'bg-white/10'
                        }`}
                      >
                        <span className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform duration-350 ${
                          notificationPreferences.security ? 'translate-x-5.5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Mobile Push Notifications</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Direct device notifications for app messages and transaction updates.</p>
                      </div>
                      <button
                        onClick={() => setNotificationPreferences(p => ({ ...p, push: !p.push }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-350 focus:outline-none cursor-pointer ${
                          notificationPreferences.push ? 'bg-indigo-500' : 'bg-white/10'
                        }`}
                      >
                        <span className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform duration-350 ${
                          notificationPreferences.push ? 'translate-x-5.5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Marketing Emails</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Occasional emails about deposits interest increases or loans campaigns.</p>
                      </div>
                      <button
                        onClick={() => setNotificationPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-350 focus:outline-none cursor-pointer ${
                          notificationPreferences.marketing ? 'bg-indigo-500' : 'bg-white/10'
                        }`}
                      >
                        <span className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform duration-350 ${
                          notificationPreferences.marketing ? 'translate-x-5.5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <button 
                      onClick={handleSavePreferences}
                      className="glow-btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition cursor-pointer"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-white/5">
                    <h2 className="text-lg font-bold font-display text-white">System Options</h2>
                    <p className="text-xs text-gray-400">Configure visual themes, calendar representations, and display languages.</p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          Display Language
                        </label>
                        <select 
                          value={systemPreferences.language}
                          onChange={(e) => setSystemPreferences(p => ({ ...p, language: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 text-white"
                        >
                          <option value="en">English (US/UK)</option>
                          <option value="hi">Hindi (हिन्दी)</option>
                          <option value="mr">Marathi (मराठी)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          Primary Currency
                        </label>
                        <select 
                          value={systemPreferences.currency}
                          onChange={(e) => setSystemPreferences(p => ({ ...p, currency: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 text-white"
                        >
                          <option value="INR">Indian Rupee (₹)</option>
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          Date Representation
                        </label>
                        <select 
                          value={systemPreferences.dateFormat}
                          onChange={(e) => setSystemPreferences(p => ({ ...p, dateFormat: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 text-white"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 11/06/2026)</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 06/11/2026)</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-06-11)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                          Visual Interface Theme
                        </label>
                        <select 
                          value={systemPreferences.theme}
                          onChange={(e) => setSystemPreferences(p => ({ ...p, theme: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-950 text-sm focus:outline-none focus:border-blue-500 text-white"
                        >
                          <option value="dark">Dark Theme (Neon / Glassmorphism)</option>
                          <option value="light" disabled>Light Theme (Slight glow - Disabled)</option>
                          <option value="auto">Auto (Match device OS theme)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Biometric Quick Login</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Permits fingerprint/FaceID locks in browsers that support WebAuthn standards.</p>
                      </div>
                      <button
                        onClick={() => setSystemPreferences(p => ({ ...p, biometrics: !p.biometrics }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-350 focus:outline-none cursor-pointer ${
                          systemPreferences.biometrics ? 'bg-indigo-500' : 'bg-white/10'
                        }`}
                      >
                        <span className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform duration-350 ${
                          systemPreferences.biometrics ? 'translate-x-5.5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <button 
                      onClick={handleSavePreferences}
                      className="glow-btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition cursor-pointer"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;