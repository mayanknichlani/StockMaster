import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Table } from '../../components/Common/Table';
import { Button } from '../../components/Common/Button';
import { Badge } from '../../components/Common/Badge';
import { adjustmentApi } from '../../api/adjustmentApi';
import { Plus } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';

export const AdjustmentList = () => {
  const [adjustments, setAdjustments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdjustments();
  }, []);

  const fetchAdjustments = async () => {
    const data = await adjustmentApi.getAll();
    setAdjustments(data.adjustments || []);
  };

  const columns = [
    { header: 'Adjustment ID', render: (row) => `#${row._id.slice(-6)}` },
    { header: 'Type', field: 'type' },
    { header: 'Reason', field: 'reason' },
    { header: 'Date', render: (row) => formatDate(row.createdAt) },
    { header: 'Status', render: (row) => <Badge status={row.status}>{row.status}</Badge> },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Stock Adjustments</h1>
          <Button onClick={() => navigate(`${ROUTES.ADJUSTMENTS}/create`)}>
            <Plus size={20} className="mr-2" />
            New Adjustment
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table columns={columns} data={adjustments} />
        </div>
      </div>
    </Layout>
  );
};