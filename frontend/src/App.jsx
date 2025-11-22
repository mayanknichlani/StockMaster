import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

// Auth Pages
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { ForgotPassword } from './pages/Auth/ForgotPassword';

// Main Pages
import { Dashboard } from './pages/Dashboard/Dashboard';
import { ProductList } from './pages/Products/ProductList';
import { CreateProduct } from './pages/Products/CreateProduct';
import { ReceiptList } from './pages/Receipts/ReceiptList';
import { CreateReceipt } from './pages/Receipts/CreateReceipt';
import { DeliveryList } from './pages/Deliveries/DeliveryList';
import { CreateDelivery } from './pages/Deliveries/CreateDelivery';
import { TransferList } from './pages/Transfers/TransferList';
import { AdjustmentList } from './pages/Adjustments/AdjustmentList';
import { StockLedger } from './pages/Ledger/StockLedger';
import { WarehouseList } from './pages/Warehouses/WarehouseList';
import { Profile } from './pages/Profile/Profile';

import { ROUTES } from './utils/constants';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route path={ROUTES.DASHBOARD} element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          
          {/* Products */}
          <Route path={ROUTES.PRODUCTS} element={<PrivateRoute><ProductList /></PrivateRoute>} />
          <Route path={`${ROUTES.PRODUCTS}/create`} element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
          
          {/* Receipts */}
          <Route path={ROUTES.RECEIPTS} element={<PrivateRoute><ReceiptList /></PrivateRoute>} />
          <Route path={`${ROUTES.RECEIPTS}/create`} element={<PrivateRoute><CreateReceipt /></PrivateRoute>} />
          
          {/* Deliveries */}
          <Route path={ROUTES.DELIVERIES} element={<PrivateRoute><DeliveryList /></PrivateRoute>} />
          <Route path={`${ROUTES.DELIVERIES}/create`} element={<PrivateRoute><CreateDelivery /></PrivateRoute>} />
          
          {/* Transfers */}
          <Route path={ROUTES.TRANSFERS} element={<PrivateRoute><TransferList /></PrivateRoute>} />
          
          {/* Adjustments */}
          <Route path={ROUTES.ADJUSTMENTS} element={<PrivateRoute><AdjustmentList /></PrivateRoute>} />
          
          {/* Others */}
          <Route path={ROUTES.LEDGER} element={<PrivateRoute><StockLedger /></PrivateRoute>} />
          <Route path={ROUTES.WAREHOUSES} element={<PrivateRoute><WarehouseList /></PrivateRoute>} />
          <Route path={ROUTES.PROFILE} element={<PrivateRoute><Profile /></PrivateRoute>} />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;