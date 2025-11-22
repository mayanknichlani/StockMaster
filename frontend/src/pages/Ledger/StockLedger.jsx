import { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Table } from '../../components/Common/Table';
import { Badge } from '../../components/Common/Badge';
import { dashboardApi } from '../../api/dashboardApi';
import { formatDateTime } from '../../utils/formatters';

export const StockLedger = () => {
  const [ledger, setLedger] = useState([]);

  useEffect(() => {
    fetchLedger();
  }, []);

  const fetchLedger = async () => {
    const data = await dashboardApi.getStockLedger();
    setLedger(data.ledger || []);
  };

  const columns = [
    { header: 'Date', render: (row) => formatDateTime(row.createdAt) },
    { header: 'Product', field: 'productName' },
    { header: 'Movement Type', field: 'movementType' },
    { header: 'Quantity', render: (row) => `${row.quantity > 0 ? '+' : ''}${row.quantity}` },
    { header: 'From', field: 'sourceLocation' },
    { header: 'To', field: 'targetLocation' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Stock Ledger</h1>
        
        <div className="bg-white rounded-lg shadow">
          <Table columns={columns} data={ledger} />
        </div>
      </div>
    </Layout>
  );
};