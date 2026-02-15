import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AboutUs from './pages/AboutUS';
import PaymentPage from './pages/PaymentPage';
import PlanDetails from './pages/PlanDetails';
import AdminPanel from './pages/AdminPanel';
import OwnerProfile from './pages/owner/OwnerProfile';
import GymSettings from './pages/owner/GymSettings';
import Billing from './pages/owner/Billing';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />

      {/* Private/Member Routes */}
      {/* (In a real app, we would wrap this in a <ProtectedRoute> component) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/plan-details" element={<PlanDetails />} />
      <Route path="/admin" element={<AdminPanel />} /> 
      <Route path="/owner/profile" element={<OwnerProfile />} />
      <Route path="/owner/settings" element={<GymSettings />} />
      <Route path="/owner/billing" element={<Billing />} />

      {/* Catch-all: Redirect unknown URLs to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;