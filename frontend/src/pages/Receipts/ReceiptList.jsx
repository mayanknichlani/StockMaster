import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Table } from '../../components/Common/Table';
import { Button } from '../../components/Common/Button';
import { Badge } from '../../components/Common/Badge';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { receiptApi } from '../../api/receiptApi';
import { Plus } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';

export const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const data = await receiptApi.getAll();
      setReceipts(data.receipts || []);
    } catch (err) {
      console.error('Failed to fetch receipts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id) => {
    if (!confirm('Validate this receipt? Stock will be updated.')) return;
    
    try {
      await receiptApi.validate(id);
      fetchReceipts();
      alert('Receipt validated successfully');
    } catch (err) {
      alert('Failed to validate receipt');
    }
  };

  const columns = [
    { header: 'Receipt ID', render: (row) => `#${row._id.slice(-6)}` },
    { header: 'Supplier', field: 'supplier' },
    { header: 'Items', render: (row) => row.items?.length || 0 },
    { header: 'Date', render: (row) => formatDate(row.createdAt) },
    { header: 'Status', render: (row) => <Badge status={row.status}>{row.status}</Badge> },
    {
      header: 'Actions',
      render: (row) =>
        row.status === 'draft' ? (
          <Button
            variant="success"
            onClick={(e) => {
              e.stopPropagation();
              handleValidate(row._id);
            }}
          >
            Validate
          </Button>
        ) : null,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Receipts</h1>
          <Button onClick={() => navigate(`${ROUTES.RECEIPTS}/create`)}>
            <Plus size={20} className="mr-2" />
            New Receipt
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <Table
              columns={columns}
              data={receipts}
              onRowClick={(row) => navigate(`${ROUTES.RECEIPTS}/${row._id}`)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};