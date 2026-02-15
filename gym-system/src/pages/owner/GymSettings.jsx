import React, { useState } from 'react';
import { 
  Settings, User, Lock, CreditCard, Bell, 
  Smartphone, Shield, CheckCircle, Save, 
  Upload, Eye, EyeOff, Server, AlertTriangle 
} from 'lucide-react';

const GymSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Function to simulate saving
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 flex flex-col md:flex-row">
      
      {/* --- LEFT SIDEBAR NAV --- */}
      <div className="w-full md:w-64 bg-zinc-950 border-r border-zinc-800 flex-shrink-0">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-black text-white tracking-tighter flex items-center gap-2">
            <Settings className="text-red-600" /> Configuration
          </h1>
          <p className="text-xs text-zinc-500 mt-1">System Version 2.4.0</p>
        </div>
        <nav className="p-4 space-y-1">
          <NavButton id="general" label="General & Branding" icon={<Settings size={18} />} active={activeTab} set={setActiveTab} />
          <NavButton id="team" label="Team & Roles" icon={<User size={18} />} active={activeTab} set={setActiveTab} />
          <NavButton id="billing" label="Billing & API" icon={<CreditCard size={18} />} active={activeTab} set={setActiveTab} />
          <NavButton id="automation" label="Automation" icon={<Bell size={18} />} active={activeTab} set={setActiveTab} />
          <NavButton id="hardware" label="Hardware & IoT" icon={<Server size={18} />} active={activeTab} set={setActiveTab} />
          <NavButton id="security" label="Security" icon={<Shield size={18} />} active={activeTab} set={setActiveTab} />
        </nav>
      </div>

      {/* --- RIGHT CONTENT AREA --- */}
      <div className="flex-1 p-8 overflow-y-auto h-screen pb-20">
        
        {/* Header for Mobile/Desktop */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')} Settings</h2>
            <p className="text-zinc-500 text-sm">Manage your gym's {activeTab} configuration.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-white text-black hover:bg-zinc-200 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all"
          >
            {isSaving ? <span className="animate-spin">⏳</span> : <Save size={18} />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* --- DYNAMIC CONTENT --- */}
        <div className="max-w-4xl space-y-6">
          
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'team' && <TeamSettings />}
          {activeTab === 'billing' && <BillingSettings />}
          {activeTab === 'automation' && <AutomationSettings />}
          {activeTab === 'hardware' && <HardwareSettings />}
          {activeTab === 'security' && <SecuritySettings />}

        </div>
      </div>
    </div>
  );
};

// --- 1. GENERAL SETTINGS COMPONENT ---
const GeneralSettings = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionCard title="Gym Identity" desc="Public facing information for your gym.">
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-zinc-800 rounded-xl border-2 border-dashed border-zinc-600 flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:border-red-500 hover:text-red-500 transition-colors">
          <Upload size={24} />
          <span className="text-[10px] uppercase font-bold mt-2">Upload Logo</span>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Gym Name" value="IronCore Fitness" />
          <Input label="Branch ID" value="IC-BLR-01" readOnly />
          <Input label="Support Email" value="help@ironcore.com" />
          <Input label="Contact Phone" value="+91 98765 43210" />
        </div>
      </div>
    </SectionCard>

    <SectionCard title="Location & Timezone">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Address Line 1" value="123, Muscle Avenue" />
        <Input label="City" value="Bangalore" />
        <Input label="State/Province" value="Karnataka" />
        <Input label="Timezone" value="(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi" />
      </div>
    </SectionCard>
  </div>
);

// --- 2. TEAM & ROLES COMPONENT ---
const TeamSettings = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionCard title="Staff Access Control" desc="Manage who can access the admin panel.">
      <div className="space-y-4">
        <StaffRow name="Kartik Agarwal" role="Owner" email="kartik@ironcore.com" status="Active" />
        <StaffRow name="Rahul Sharma" role="Manager" email="rahul@ironcore.com" status="Active" />
        <StaffRow name="Priya Singh" role="Trainer" email="priya@ironcore.com" status="Invited" />
      </div>
      <button className="mt-4 text-sm font-bold text-red-500 hover:text-red-400">+ Invite New Staff Member</button>
    </SectionCard>
  </div>
);

// --- 3. BILLING & API COMPONENT ---
const BillingSettings = () => {
  const [showKey, setShowKey] = useState(false);
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionCard title="Payment Gateway (Stripe/Razorpay)">
        <div className="space-y-4">
          <div className="relative">
            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">API Secret Key</label>
            <div className="relative">
              <input 
                type={showKey ? "text" : "password"} 
                defaultValue="sk_live_51Mz.........Xy9z" 
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:border-red-600 focus:outline-none"
              />
              <button 
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-3 text-zinc-500 hover:text-white"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Input label="Currency" value="INR (₹)" />
          <Input label="Tax Rate (GST)" value="18%" />
        </div>
      </SectionCard>
    </div>
  );
};

// --- 4. AUTOMATION COMPONENT ---
const AutomationSettings = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionCard title="Member Notifications" desc="Automatically send emails/SMS based on triggers.">
      <ToggleRow title="Welcome Email" desc="Send immediately after registration." active={true} />
      <ToggleRow title="Payment Receipt" desc="Send PDF invoice after successful payment." active={true} />
      <ToggleRow title="Subscription Expiry Warning" desc="Send reminder 3 days before expiry." active={true} />
      <ToggleRow title="Birthday Wishes" desc="Send a discount coupon on birthdays." active={false} />
    </SectionCard>
  </div>
);

// --- 5. HARDWARE (IoT) COMPONENT ---
const HardwareSettings = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <HardwareStatusCard name="Main Entrance Turnstile" status="Online" ip="192.168.1.10" ping="24ms" />
      <HardwareStatusCard name="Biometric Scanner (Front)" status="Online" ip="192.168.1.12" ping="42ms" />
      <HardwareStatusCard name="Vending Machine Controller" status="Offline" ip="192.168.1.15" ping="--" />
    </div>
    <SectionCard title="Access Rules">
      <ToggleRow title="Deny Access on Overdue Payment" desc="Turnstile will not open if fees are pending." active={true} />
      <ToggleRow title="Allow QR Code Entry" desc="Members can scan app QR code to enter." active={true} />
    </SectionCard>
  </div>
);

// --- 6. SECURITY COMPONENT (Danger Zone) ---
const SecuritySettings = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionCard title="Session Management">
      <ToggleRow title="Force Logout All Devices" desc="Sign out everyone except you." active={false} isButton />
    </SectionCard>

    <div className="border border-red-900/50 bg-red-900/10 rounded-2xl p-6">
      <h3 className="text-red-500 font-bold flex items-center gap-2 mb-2">
        <AlertTriangle size={20} /> Danger Zone
      </h3>
      <p className="text-zinc-400 text-sm mb-6">Irreversible actions. Proceed with caution.</p>
      
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-red-900/30 pb-4">
          <div>
            <h4 className="text-white font-bold text-sm">Reset Gym Data</h4>
            <p className="text-zinc-500 text-xs">Clears all check-in logs and non-essential data.</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Reset Data</button>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div>
            <h4 className="text-white font-bold text-sm">Delete Organization</h4>
            <p className="text-zinc-500 text-xs">Permanently delete account and all backups.</p>
          </div>
          <button className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all">Delete Account</button>
        </div>
      </div>
    </div>
  </div>
);

// --- REUSABLE SUB-COMPONENTS ---

const NavButton = ({ id, label, icon, active, set }) => (
  <button 
    onClick={() => set(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
      active === id 
        ? 'bg-zinc-100 text-black' 
        : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
    }`}
  >
    {icon}
    {label}
  </button>
);

const SectionCard = ({ title, desc, children }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
    <div className="mb-6">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      {desc && <p className="text-sm text-zinc-500">{desc}</p>}
    </div>
    {children}
  </div>
);

const Input = ({ label, value, readOnly }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-500 uppercase">{label}</label>
    <input 
      type="text" 
      defaultValue={value}
      readOnly={readOnly}
      className={`w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
  </div>
);

const StaffRow = ({ name, role, email, status }) => (
  <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">{name.charAt(0)}</div>
      <div>
        <h4 className="text-sm font-bold text-white">{name}</h4>
        <p className="text-xs text-zinc-500">{email}</p>
      </div>
    </div>
    <div className="text-right">
      <span className="text-xs font-bold text-zinc-400 block">{role}</span>
      <span className={`text-[10px] uppercase font-bold ${status === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>{status}</span>
    </div>
  </div>
);

const ToggleRow = ({ title, desc, active, isButton }) => (
  <div className="flex items-center justify-between py-4 border-b border-zinc-800 last:border-0">
    <div>
      <h4 className="text-sm font-bold text-zinc-200">{title}</h4>
      <p className="text-xs text-zinc-500">{desc}</p>
    </div>
    {isButton ? (
       <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Execute</button>
    ) : (
       <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-green-600' : 'bg-zinc-700'}`}>
         <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
       </div>
    )}
  </div>
);

const HardwareStatusCard = ({ name, status, ip, ping }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
    <div>
      <h4 className="text-sm font-bold text-white">{name}</h4>
      <p className="text-xs text-zinc-500 font-mono mt-1">IP: {ip}</p>
    </div>
    <div className="text-right">
      <div className={`text-xs font-bold flex items-center gap-1 justify-end ${status === 'Online' ? 'text-green-500' : 'text-red-500'}`}>
        <div className={`w-2 h-2 rounded-full ${status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
        {status}
      </div>
      <p className="text-[10px] text-zinc-600 mt-1">Ping: {ping}</p>
    </div>
  </div>
);

export default GymSettings;