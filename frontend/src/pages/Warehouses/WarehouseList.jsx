import { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Common/Card';
import { Button } from '../../components/Common/Button';
import { warehouseApi } from '../../api/warehouseApi';
import { Warehouse } from 'lucide-react';

export const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    const data = await warehouseApi.getAll();
    setWarehouses(data.warehouses || []);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Warehouses</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <Card key={warehouse._id}>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Warehouse size={24} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{warehouse.address}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {warehouse.locations?.length || 0} locations
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};