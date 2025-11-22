import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { KPICard } from '../../components/Dashboard/KPICard';
import { Card } from '../../components/Common/Card';
import { Badge } from '../../components/Common/Badge';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { dashboardApi } from '../../api/dashboardApi';
import { Package, AlertTriangle, Truck, PackageOpen } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const Dashboard = () => {
  const [kpis, setKpis] = useState({});
  const [lowStock, setLowStock] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiData, lowStockData, activityData] = await Promise.all([
          dashboardApi.getKPIs(),
          dashboardApi.getLowStock(),
          dashboardApi.getRecentActivity(),
        ]);
        setKpis(kpiData);
        setLowStock(lowStockData.products || []);
        setRecentActivity(activityData.activities || []);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your inventory overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Products"
            value={kpis.totalProducts || 0}
            icon={Package}
            color="blue"
          />
          <KPICard
            title="Low Stock Items"
            value={kpis.lowStockItems || 0}
            icon={AlertTriangle}
            color="yellow"
          />
          <KPICard
            title="Pending Receipts"
            value={kpis.pendingReceipts || 0}
            icon={Truck}
            color="green"
          />
          <KPICard
            title="Pending Deliveries"
            value={kpis.pendingDeliveries || 0}
            icon={PackageOpen}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Low Stock Products">
            <div className="space-y-3">
              {lowStock.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No low stock items</p>
              ) : (
                lowStock.slice(0, 5).map((product) => (
                  <div key={product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">{product.currentStock} units</p>
                      <p className="text-xs text-gray-500">Min: {product.minStock}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card title="Recent Activity">
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              ) : (
                recentActivity.slice(0, 5).map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <Badge status={activity.status}>{activity.status}</Badge>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};