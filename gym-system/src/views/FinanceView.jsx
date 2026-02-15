import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx'; 
import { jsPDF } from "jspdf"; // <--- IMPORT THIS
import { 
  DollarSign, Download, Search, TrendingUp, TrendingDown, 
  FileText, X, CheckCircle, AlertCircle, Calendar, Share2 
} from 'lucide-react';

const FinanceView = () => {
  // --- 1. STATE MANAGEMENT ---
  const [timeRange, setTimeRange] = useState('This Month');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null); 

  // --- 2. DATA ---
  const financialData = {
    'This Month': {
      income: '₹4,25,000',
      expense: '₹1,12,000',
      profit: '₹3,13,000',
      incomeTrend: '+18%',
      expenseTrend: '-5%',
      profitTrend: '+22%',
      chartData: [40, 65, 35, 85], 
    },
    'Last Month': {
      income: '₹3,80,000',
      expense: '₹1,20,000',
      profit: '₹2,60,000',
      incomeTrend: '+5%',
      expenseTrend: '+2%',
      profitTrend: '+8%',
      chartData: [50, 40, 60, 55],
    },
    'This Year': {
      income: '₹45,00,000',
      expense: '₹12,00,000',
      profit: '₹33,00,000',
      incomeTrend: '+120%',
      expenseTrend: '+10%',
      profitTrend: '+150%',
      chartData: [60, 75, 80, 95],
    }
  };

  const currentStats = financialData[timeRange];

  const [transactions] = useState([
    { id: 'INV-2024', name: 'Rahul Sharma', plan: 'Gold Plan', date: 'Feb 13, 2026', amount: 12000, status: 'Paid', method: 'UPI' },
    { id: 'INV-2023', name: 'Amit Verma', plan: 'PT Session', date: 'Feb 12, 2026', amount: 5000, status: 'Paid', method: 'Cash' },
    { id: 'INV-2022', name: 'Sneha Gupta', plan: 'Silver Plan', date: 'Feb 12, 2026', amount: 2000, status: 'Failed', method: 'Card' },
    { id: 'INV-2021', name: 'Vikram Singh', plan: 'Gold Plan', date: 'Feb 10, 2026', amount: 12000, status: 'Paid', method: 'NetBanking' },
    { id: 'INV-2020', name: 'Priya Das', plan: 'Yoga Class', date: 'Feb 09, 2026', amount: 800, status: 'Pending', method: 'UPI' },
  ]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transactions, searchQuery]);

  const handleExport = () => {
    const dataToExport = filteredTransactions.map(t => ({
      'Invoice ID': t.id,
      'Member': t.name,
      'Plan': t.plan,
      'Date': t.date,
      'Amount': t.amount,
      'Status': t.status,
      'Method': t.method
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Finance_Report");
    XLSX.writeFile(workbook, "Gym_Finance_Report.xlsx");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* SUMMARY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
           <div className="flex justify-between items-center mb-6">
             <div>
               <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
               <p className="text-xs text-zinc-500">Comparing performance over time.</p>
             </div>
             <div className="relative">
               <Calendar size={14} className="absolute left-3 top-2.5 text-zinc-400" />
               <select 
                 value={timeRange}
                 onChange={(e) => setTimeRange(e.target.value)}
                 className="bg-zinc-950 border border-zinc-800 text-xs font-bold text-white rounded-xl pl-9 pr-4 py-2 outline-none focus:border-red-600 appearance-none cursor-pointer"
               >
                 <option>This Month</option>
                 <option>Last Month</option>
                 <option>This Year</option>
               </select>
             </div>
           </div>
           
           <div className="flex items-end justify-between h-40 gap-4 mt-6 px-4">
              <ChartBar height={`${currentStats.chartData[0]}%`} label="Week 1" />
              <ChartBar height={`${currentStats.chartData[1]}%`} label="Week 2" />
              <ChartBar height={`${currentStats.chartData[2]}%`} label="Week 3" />
              <ChartBar height={`${currentStats.chartData[3]}%`} label="Week 4" active />
           </div>
        </div>

        <div className="space-y-4">
          <MetricCard title="Total Income" value={currentStats.income} sub={currentStats.incomeTrend} positive={currentStats.incomeTrend.includes('+')} />
          <MetricCard title="Total Expenses" value={currentStats.expense} sub={currentStats.expenseTrend} positive={currentStats.expenseTrend.includes('-')} />
          <MetricCard title="Net Profit" value={currentStats.profit} sub={currentStats.profitTrend} positive={currentStats.profitTrend.includes('+')} highlight />
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
           <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
           <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1">
               <Search size={16} className="absolute left-3 top-2.5 text-zinc-500" />
               <input 
                 type="text" 
                 placeholder="Search name, ID, status..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="bg-zinc-950 border border-zinc-800 text-sm text-white rounded-xl pl-10 pr-4 py-2 w-full md:w-64 focus:border-red-600 outline-none" 
               />
             </div>
             <button onClick={handleExport} className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
               <Download size={16} /> Export
             </button>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 text-zinc-500 text-[10px] uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredTransactions.map((trx, index) => (
                <TransactionRow key={index} data={trx} onViewReceipt={() => setSelectedReceipt(trx)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL (Now with Working Buttons) */}
      {selectedReceipt && (
        <ReceiptModal data={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
      )}

    </div>
  );
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

// Fixed ChartBar Component
const ChartBar = ({ height, label, active }) => (
  <div className="h-full flex flex-col items-center justify-end gap-2 w-full group cursor-pointer">
    <div 
      style={{ height: height }} 
      className={`w-full rounded-t-lg transition-all duration-500 ${
        active 
          ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
          : 'bg-zinc-800 group-hover:bg-zinc-700'
      }`}
    ></div>
    <span className="text-[10px] font-bold text-zinc-500">{label}</span>
  </div>
);

const MetricCard = ({ title, value, sub, positive, highlight }) => (
  <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${highlight ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800'}`}>
    <p className="text-xs font-bold text-zinc-500 uppercase">{title}</p>
    <div className="flex justify-between items-end mt-2">
      <h3 className="text-2xl font-black text-white">{value}</h3>
      <span className={`text-xs font-bold flex items-center ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {positive ? <TrendingUp size={14} className="mr-1"/> : <TrendingDown size={14} className="mr-1"/>}
        {sub}
      </span>
    </div>
  </div>
);

const TransactionRow = ({ data, onViewReceipt }) => {
  const isDanger = data.status === 'Failed';
  const isPending = data.status === 'Pending';
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="px-6 py-4 text-xs font-mono text-zinc-500">#{data.id}</td>
      <td className="px-6 py-4"><div className="text-sm font-bold text-white">{data.name}</div><div className="text-xs text-zinc-500">{data.plan}</div></td>
      <td className="px-6 py-4 text-xs text-zinc-400">{data.date}</td>
      <td className="px-6 py-4 text-sm font-bold text-white">₹{data.amount.toLocaleString()}</td>
      <td className="px-6 py-4">
        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${isDanger ? 'bg-red-500/10 text-red-500 border-red-500/20' : isPending ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>{data.status}</span>
      </td>
      <td className="px-6 py-4 text-right">
        <button onClick={onViewReceipt} className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg"><FileText size={16} /></button>
      </td>
    </tr>
  );
};

// --- UPDATED RECEIPT MODAL (Working Download & Share) ---
const ReceiptModal = ({ data, onClose }) => {
  
  // 1. GENERATE PDF FUNCTION
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(220, 38, 38); // Red Color
    doc.text("IRONCORE FITNESS", 105, 20, null, null, "center");
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Payment Receipt", 105, 30, null, null, "center");
    
    // Details Box
    doc.setDrawColor(200, 200, 200);
    doc.rect(20, 40, 170, 90);
    
    doc.setFontSize(12);
    doc.text(`Transaction ID: #${data.id}`, 30, 55);
    doc.text(`Date: ${data.date}`, 30, 65);
    doc.text(`Billed To: ${data.name}`, 30, 75);
    doc.text(`Plan/Service: ${data.plan}`, 30, 85);
    doc.text(`Payment Method: ${data.method}`, 30, 95);
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`Total Amount: INR ${data.amount}`, 30, 115);
    
    // Footer
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100);
    doc.text("Thank you for your business!", 105, 140, null, null, "center");
    
    doc.save(`Receipt_${data.id}.pdf`);
  };

  // 2. SHARE FUNCTION
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Receipt',
          text: `Receipt for ${data.name} - Amount: ₹${data.amount}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback for Desktop
      navigator.clipboard.writeText(
        `Receipt: #${data.id}\nName: ${data.name}\nAmount: ₹${data.amount}\nDate: ${data.date}`
      );
      alert("Receipt details copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white text-black rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="bg-zinc-100 p-4 border-b flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2"><CheckCircle className="text-green-600" size={18} /> Payment Receipt</h3>
          <button onClick={onClose}><X size={20} className="text-zinc-500 hover:text-black"/></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h2 className="text-3xl font-black">₹{data.amount.toLocaleString()}</h2>
            <p className="text-sm text-zinc-500 mt-1">Paid Successfully</p>
          </div>
          <div className="bg-zinc-50 rounded-xl p-4 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-zinc-500">Transaction ID</span><span className="font-mono font-bold">#{data.id}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500">Date</span><span className="font-bold">{data.date}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500">Payment Method</span><span className="font-bold">{data.method}</span></div>
            <div className="border-t border-zinc-200 my-2"></div>
            <div className="flex justify-between"><span className="text-zinc-500">Billed To</span><span className="font-bold">{data.name}</span></div>
          </div>
        </div>
        <div className="p-4 border-t bg-zinc-50 flex gap-3">
          
          {/* CONNECTED BUTTONS */}
          <button 
            onClick={generatePDF}
            className="flex-1 bg-black text-white font-bold py-3 rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={16} /> Download PDF
          </button>
          
          <button 
            onClick={handleShare}
            className="flex-1 border border-zinc-300 font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 size={16} /> Share
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default FinanceView;