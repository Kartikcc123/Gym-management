import React, { useState, useEffect } from 'react';
import { UserPlus, Phone, CheckCircle, X, Loader } from 'lucide-react';
import api from '../services/api';

const LeadsView = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedPlan: 'Silver',
    status: 'new'
  });

  // --- 1. Fetch Leads ---
  const fetchLeads = async () => {
    try {
      setLoading(true);
      // Ensure your backend has GET /api/leads
      // If not, use the mock data below for now
      const { data } = await api.get('/leads'); 
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads", error);
      // Fallback Mock Data if API fails (for testing UI)
      setLeads([
        { _id: '1', name: 'Rohit Sharma', phone: '9876543210', interestedPlan: 'Gold', status: 'new' },
        { _id: '2', name: 'Sneha Gupta', phone: '9988776655', interestedPlan: 'Silver', status: 'contacted' },
        { _id: '3', name: 'Vikram Singh', phone: '9123456789', interestedPlan: 'Platinum', status: 'trial' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // --- 2. Add Lead ---
  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      await api.post('/leads', formData);
      setShowModal(false);
      setFormData({ name: '', phone: '', email: '', interestedPlan: 'Silver', status: 'new' }); // Reset
      fetchLeads(); // Refresh list
    } catch (error) {
      alert("Failed to add lead");
    }
  };

  // --- 3. Convert Lead ---
  const handleConvert = async (id) => {
    if(!window.confirm("Convert this lead to a paying member?")) return;
    try {
      await api.put(`/leads/${id}/convert`);
      alert("Lead converted successfully!");
      fetchLeads(); // Refresh to remove from list
    } catch (err) {
      alert("Conversion failed");
    }
  };

  // --- Helper: Render Column ---
  const renderColumn = (title, status, colorClass) => (
    <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 h-full">
      <h3 className={`font-bold mb-4 uppercase text-xs tracking-wider px-2 py-1 rounded inline-block ${colorClass}`}>
        {title} ({leads.filter(l => l.status === status).length})
      </h3>
      
      <div className="space-y-3">
        {leads.filter(l => l.status === status).map(lead => (
          <div key={lead._id} className="bg-black p-4 rounded-lg border border-zinc-800 shadow-sm hover:border-zinc-700 transition">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white text-sm">{lead.name}</h4>
                <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                  <Phone size={12} /> {lead.phone}
                </div>
              </div>
              {status !== 'converted' && (
                <button 
                  onClick={() => handleConvert(lead._id)}
                  className="text-green-500 hover:bg-green-900/20 p-1.5 rounded transition" 
                  title="Convert to Member"
                >
                  <CheckCircle size={16} />
                </button>
              )}
            </div>
            <div className="mt-3 flex justify-between items-center">
               <span className="text-[10px] bg-zinc-900 px-2 py-1 rounded text-zinc-400 border border-zinc-800">
                 {lead.interestedPlan || 'General'}
               </span>
               <span className="text-[10px] text-zinc-600">
                 {new Date().toLocaleDateString()}
               </span>
            </div>
          </div>
        ))}
        {leads.filter(l => l.status === status).length === 0 && (
            <p className="text-zinc-600 text-xs text-center py-4 italic">No leads here</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-white">Lead Management</h1>
           <p className="text-zinc-400 text-sm">Track enquiries and convert them to members</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition"
        >
          <UserPlus size={18} /> Add New Lead
        </button>
      </div>
      
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-20 text-zinc-500"><Loader className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {renderColumn("New Enquiries", "new", "bg-blue-500/10 text-blue-400 border-blue-500/20")}
          {renderColumn("Contacted / In Progress", "contacted", "bg-yellow-500/10 text-yellow-400 border-yellow-500/20")}
          {renderColumn("Ready for Trial", "trial", "bg-purple-500/10 text-purple-400 border-purple-500/20")}
        </div>
      )}

      {/* --- ADD LEAD MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-zinc-500 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold text-white mb-6">Add New Lead</h2>
            
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black border border-zinc-800 text-white rounded-lg p-3 focus:border-blue-600 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-black border border-zinc-800 text-white rounded-lg p-3 focus:border-blue-600 outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Interested Plan</label>
                    <select 
                      className="w-full bg-black border border-zinc-800 text-white rounded-lg p-3 focus:border-blue-600 outline-none"
                      value={formData.interestedPlan}
                      onChange={(e) => setFormData({...formData, interestedPlan: e.target.value})}
                    >
                      <option value="Silver">Silver Plan</option>
                      <option value="Gold">Gold Plan</option>
                      <option value="Platinum">Platinum Plan</option>
                    </select>
                  </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Current Status</label>
                <select 
                  className="w-full bg-black border border-zinc-800 text-white rounded-lg p-3 focus:border-blue-600 outline-none"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="new">New Enquiry</option>
                  <option value="contacted">Contacted</option>
                  <option value="trial">Trial Scheduled</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4">
                Save Lead
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsView;