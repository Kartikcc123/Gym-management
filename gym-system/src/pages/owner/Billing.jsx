import React, { useState } from 'react';
import * as XLSX from 'xlsx'; 
import { 
  CreditCard, DollarSign, Users, AlertCircle, 
  Download, Search, CheckCircle, XCircle, Clock 
} from 'lucide-react';
import FilterDropdown from '../../components/common/FilterDropdown'; 

const Billing = () => {
  // 1. NEW STATE: Track if we are viewing all or just recent
  const [viewAll, setViewAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  // 2. UPDATED DATA: Added more rows so the button has something to reveal
  const [transactions] = useState([
    { id: '#TRX-9821', member: 'Rahul Sharma', plan: 'Gold Plan (Yearly)', amount: 12000, date: 'Feb 12, 2026', status: 'Paid', method: 'UPI' },
    { id: '#TRX-9822', member: 'Priya Singh', plan: 'Silver Plan (Monthly)', amount: 1500, date: 'Feb 12, 2026', status: 'Pending', method: 'Cash' },
    { id: '#TRX-9823', member: 'Amit Verma', plan: 'Personal Training', amount: 5000, date: 'Feb 11, 2026', status: 'Paid', method: 'Card' },
    { id: '#TRX-9824', member: 'Sneha Gupta', plan: 'Gold Plan (Monthly)', amount: 2000, date: 'Feb 10, 2026', status: 'Failed', method: 'Online' },
    { id: '#TRX-9825', member: 'Vikram Malhotra', plan: 'Silver Plan (Quarterly)', amount: 4000, date: 'Feb 09, 2026', status: 'Paid', method: 'UPI' },
    // --- Hidden by default until "View All" is clicked ---
    { id: '#TRX-9826', member: 'Arjun Das', plan: 'Gold Plan (Monthly)', amount: 2000, date: 'Feb 08, 2026', status: 'Paid', method: 'Card' },
    { id: '#TRX-9827', member: 'Kavita Roy', plan: 'Yoga Session', amount: 800, date: 'Feb 08, 2026', status: 'Paid', method: 'UPI' },
    { id: '#TRX-9828', member: 'Rohan Mehta', plan: 'Silver Plan (Yearly)', amount: 10000, date: 'Feb 07, 2026', status: 'Pending', method: 'NetBanking' },
    { id: '#TRX-9829', member: 'Ishaan K', plan: 'Day Pass', amount: 500, date: 'Feb 06, 2026', status: 'Paid', method: 'Cash' },
    { id: '#TRX-9830', member: 'Zara Khan', plan: 'Personal Training', amount: 5000, date: 'Feb 05, 2026', status: 'Failed', method: 'Card' },
  ]);

  // Filter Logic
  const filteredTransactions = transactions.filter(trx => {
    if (statusFilter === 'All') return true;
    return trx.status === statusFilter;
  });

  // 3. SLICE LOGIC: Determine which rows to actually display
  // If 'viewAll' is true, show everything. If false, show only first 5.
  const displayedTransactions = viewAll 
    ? filteredTransactions 
    : filteredTransactions.slice(0, 5);

  const handleExport = () => {
    const dataToExport = filteredTransactions.map(row => ({
      'Transaction ID': row.id,
      'Member Name': row.member,
      'Plan Type': row.plan,
      'Date': row.date,
      'Amount (INR)': row.amount,
      'Payment Method': row.method,
      'Status': row.status
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Report");
    XLSX.writeFile(workbook, "Gym_Financial_Report.xlsx");
  };

  return (
    <div className="min-h-screen bg-black p-8 text-zinc-300 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Financial Overview</h1>
          <p className="text-zinc-500 text-sm">Track gym revenue, member payments, and outstanding dues.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-bold border border-zinc-800 transition-all cursor-pointer">
            <Download size={16} /> Export Report
          </button>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <DollarSign size={16} /> Record Payment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue (Feb)" value="₹4.2L" sub="+12.5% from last month" icon={<DollarSign size={24} className="text-green-500" />} trend="up" />
        <StatCard title="Pending Dues" value="₹45,000" sub="12 Members overdue" icon={<AlertCircle size={24} className="text-red-500" />} trend="down" />
        <StatCard title="Active Subscriptions" value="184" sub="+8 New members this week" icon={<Users size={24} className="text-blue-500" />} trend="up" />
        <StatCard title="Avg. Revenue/Member" value="₹2,250" sub="Based on active plans" icon={<CreditCard size={24} className="text-purple-500" />} trend="neutral" />
      </div>

      {/* Table Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {viewAll ? 'All Transactions' : 'Recent Transactions'} 
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
              {viewAll ? filteredTransactions.length : 5} visible
            </span>
          </h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-zinc-500" />
              <input type="text" placeholder="Search member..." className="bg-zinc-950 border border-zinc-800 text-white text-sm rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-red-600 w-64" />
            </div>
            <FilterDropdown label="Status" options={['Paid', 'Pending', 'Failed']} selected={statusFilter} onSelect={setStatusFilter} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Plan / Service</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {/* 4. USE 'displayedTransactions' HERE */}
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map((trx, index) => (
                  <tr key={index} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-6 py-4 text-xs font-mono text-zinc-500">{trx.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300 border border-zinc-700">{trx.member.charAt(0)}</div>
                        <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{trx.member}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">{trx.plan}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{trx.date}</td>
                    <td className="px-6 py-4 text-sm font-bold text-white">₹{trx.amount}</td>
                    <td className="px-6 py-4"><StatusBadge status={trx.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={handleExport} className="text-zinc-500 hover:text-red-500 transition-colors p-2 hover:bg-zinc-800 rounded-lg"><Download size={16} /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-zinc-500">No transactions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. CONNECTED BUTTON LOGIC */}
        <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 text-center">
          <button 
            onClick={() => setViewAll(!viewAll)} 
            className="text-xs font-bold text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto"
          >
            {viewAll ? (
               <>Show Less &uarr;</> 
            ) : (
               <>View All Transactions &rarr;</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ... StatusBadge and StatCard components remain the same ...
const StatCard = ({ title, value, sub, icon, trend }) => (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-zinc-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 group-hover:border-zinc-700 transition-colors">
          {icon}
        </div>
        {trend === 'up' && <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">↑ 2.4%</span>}
        {trend === 'down' && <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-full">↓ 1.1%</span>}
        {trend === 'neutral' && <span className="text-xs font-bold text-zinc-500 bg-zinc-500/10 px-2 py-1 rounded-full">-</span>}
      </div>
      <h3 className="text-2xl font-black text-white mb-1">{value}</h3>
      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">{title}</p>
      <p className="text-[10px] text-zinc-600 mt-2 font-medium">{sub}</p>
    </div>
  );
  
  const StatusBadge = ({ status }) => {
    const styles = {
      Paid: "bg-green-500/10 text-green-500 border-green-500/20",
      Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Failed: "bg-red-500/10 text-red-500 border-red-500/20",
    };
  
    const icons = {
      Paid: <CheckCircle size={12} />,
      Pending: <Clock size={12} />,
      Failed: <XCircle size={12} />,
    };
  
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[status] || styles.Pending}`}>
        {icons[status]} {status}
      </span>
    );
  };

export default Billing;