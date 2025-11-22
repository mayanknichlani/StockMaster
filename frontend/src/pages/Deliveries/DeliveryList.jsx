import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Table } from '../../components/Common/Table';
import { Button } from '../../components/Common/Button';
import { Badge } from '../../components/Common/Badge';
import { deliveryApi } from '../../api/deliveryApi';
import { Plus } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';

export const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const data = await deliveryApi.getAll();
      setDeliveries(data.deliveries || []);
    } catch (err) {
      console.error('Failed to fetch deliveries:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Delivery ID', render: (row) => `#${row._id.slice(-6)}` },
    { header: 'Customer', field: 'customer' },
    { header: 'Items', render: (row) => row.items?.length || 0 },
    { header: 'Date', render: (row) => formatDate(row.createdAt) },
    { header: 'Status', render: (row) => <Badge status={row.status}>{row.status}</Badge> },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Deliveries</h1>
          <Button onClick={() => navigate(`${ROUTES.DELIVERIES}/create`)}>
            <Plus size={20} className="mr-2" />
            New Delivery
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table columns={columns} data={deliveries} />
        </div>
      </div>
    </Layout>
  );
};