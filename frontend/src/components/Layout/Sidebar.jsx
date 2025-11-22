import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Truck, PackageOpen, 
  ArrowRightLeft, ClipboardEdit, BookOpen, Warehouse, 
  User, LogOut 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

export const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { path: ROUTES.PRODUCTS, icon: Package, label: 'Products' },
    { path: ROUTES.RECEIPTS, icon: Truck, label: 'Receipts' },
    { path: ROUTES.DELIVERIES, icon: PackageOpen, label: 'Deliveries' },
    { path: ROUTES.TRANSFERS, icon: ArrowRightLeft, label: 'Transfers' },
    { path: ROUTES.ADJUSTMENTS, icon: ClipboardEdit, label: 'Adjustments' },
    { path: ROUTES.LEDGER, icon: BookOpen, label: 'Stock Ledger' },
    { path: ROUTES.WAREHOUSES, icon: Warehouse, label: 'Warehouses' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">StockMaster</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          to={ROUTES.PROFILE}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
            isActive(ROUTES.PROFILE) 
              ? 'bg-primary-600 text-white' 
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <User size={20} />
          <span>Profile</span>
        </Link>
        
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};