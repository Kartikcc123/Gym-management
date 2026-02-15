import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Lock, ShieldCheck, ArrowLeft, Check, 
  Smartphone, Building, QrCode 
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'netbanking'

  // Default to Gold if no plan was passed (failsafe)
  const selectedPlan = state?.plan || 'Gold';
  const price = state?.price || '$89';

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing delay (2 seconds)
    setTimeout(() => {
      // 1. Update user profile
      updateProfile({ 
        plan: selectedPlan, 
        subscription: { status: 'active', startDate: new Date() } 
      });

      setIsLoading(false);
      
      // 2. Redirect to Dashboard
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      
      {/* LEFT: Order Summary (Stays the same) */}
      <div className="w-full md:w-1/3 bg-zinc-900 p-8 md:p-12 flex flex-col justify-between border-r border-zinc-800">
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={18} /> Back
          </button>
          
          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Order Summary</h2>
          <h1 className="text-3xl font-black italic uppercase mb-6 text-white">
            {selectedPlan} <span className="text-red-600">Plan</span>
          </h1>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-zinc-300">
              <span>Subscription</span>
              <span className="font-bold text-white">{price}/mo</span>
            </div>
            <div className="flex justify-between items-center text-zinc-300">
              <span>Taxes & Fees</span>
              <span className="font-bold text-white">$0.00</span>
            </div>
            <div className="h-px bg-zinc-800 my-4" />
            <div className="flex justify-between items-center text-xl font-bold text-white">
              <span>Total Due</span>
              <span>{price}</span>
            </div>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <ShieldCheck className="text-green-500" size={18} /> Secure Checkout
            </h3>
            <p className="text-xs text-zinc-400">
              Your payment is encrypted and secured with 256-bit SSL encryption.
            </p>
          </div>
        </div>
        <div className="mt-8 text-xs text-zinc-500">
            By completing this purchase, you agree to IronForge's Terms.
        </div>
      </div>

      {/* RIGHT: Payment Method Selection */}
      <div className="w-full md:w-2/3 p-8 md:p-12 bg-black relative overflow-hidden flex flex-col items-center justify-center">
        {/* Background Noise */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

        <div className="relative z-10 w-full max-w-md">
            <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Select Payment Method</h2>
                <p className="text-zinc-400">Choose how you want to pay.</p>
            </div>

            {/* PAYMENT TABS */}
            <div className="grid grid-cols-3 gap-2 mb-8 bg-zinc-900 p-1 rounded-xl">
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${paymentMethod === 'card' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                >
                  <CreditCard size={20} /> Card
                </button>
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${paymentMethod === 'upi' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                >
                  <Smartphone size={20} /> UPI
                </button>
                <button 
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex flex-col items-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${paymentMethod === 'netbanking' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                >
                  <Building size={20} /> Bank
                </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
                
                {/* 1. CREDIT CARD FORM */}
                {paymentMethod === 'card' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Input label="Cardholder Name" placeholder="JOHN DOE" icon={CreditCard} required />
                    <Input label="Card Number" placeholder="0000 0000 0000 0000" icon={Lock} required />
                    <div className="grid grid-cols-2 gap-6">
                        <Input label="Expiry Date" placeholder="MM/YY" required />
                        <Input label="CVC" placeholder="123" type="password" required />
                    </div>
                  </div>
                )}

                {/* 2. UPI FORM */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 text-center">
                       <div className="bg-white p-2 w-32 h-32 mx-auto rounded-lg mb-4 flex items-center justify-center">
                          <QrCode size={100} className="text-black" />
                       </div>
                       <p className="text-sm text-zinc-400">Scan with any UPI App</p>
                    </div>
                    <div className="text-center text-zinc-500 text-sm">- OR -</div>
                    <Input label="UPI ID / VPA" placeholder="username@oksbi" icon={Smartphone} />
                  </div>
                )}

                {/* 3. NET BANKING FORM */}
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                       <label className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Select Bank</label>
                       <select className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-red-600 focus:outline-none appearance-none">
                          <option>HDFC Bank</option>
                          <option>SBI (State Bank of India)</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank</option>
                       </select>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 text-sm text-zinc-400">
                       <p>You will be redirected to your bank's secure login page to complete the transaction.</p>
                    </div>
                  </div>
                )}

                {/* PAY BUTTON */}
                <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full mt-4" 
                    size="lg" 
                    isLoading={isLoading}
                    icon={Check}
                >
                    Pay {price} via {paymentMethod === 'card' ? 'Card' : paymentMethod === 'upi' ? 'UPI' : 'Net Banking'}
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;