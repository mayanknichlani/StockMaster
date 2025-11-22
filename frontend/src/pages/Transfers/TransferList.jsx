import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Table } from '../../components/Common/Table';
import { Button } from '../../components/Common/Button';
import { Badge } from '../../components/Common/Badge';
import { transferApi } from '../../api/transferApi';
import { Plus } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';

export const TransferList = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const data = await transferApi.getAll();
      setTransfers(data.transfers || []);
    } catch (err) {
      console.error('Failed to fetch transfers:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Transfer ID', render: (row) => `#${row._id.slice(-6)}` },
    { header: 'From', render: (row) => row.fromLocation?.code || 'N/A' },
    { header: 'To', render: (row) => row.toLocation?.code || 'N/A' },
    { header: 'Items', render: (row) => row.items?.length || 0 },
    { header: 'Date', render: (row) => formatDate(row.createdAt) },
    { header: 'Status', render: (row) => <Badge status={row.status}>{row.status}</Badge> },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Internal Transfers</h1>
          <Button onClick={() => navigate(`${ROUTES.TRANSFERS}/create`)}>
            <Plus size={20} className="mr-2" />
            New Transfer
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table columns={columns} data={transfers} />
        </div>
      </div>
    </Layout>
  );
};