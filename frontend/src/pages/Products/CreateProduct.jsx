import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Common/Card';
import { Input } from '../../components/Common/Input';
import { Select } from '../../components/Common/Select';
import { Button } from '../../components/Common/Button';
import { productApi } from '../../api/productApi';
import { ROUTES } from '../../utils/constants';

export const CreateProduct = () => {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: '',
    uom: 'units',
    minStock: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const uomOptions = [
    { value: 'units', label: 'Units' },
    { value: 'kg', label: 'Kilograms' },
    { value: 'liters', label: 'Liters' },
    { value: 'meters', label: 'Meters' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await productApi.create(form);
      navigate(ROUTES.PRODUCTS);
    } catch (err) {
      setError(err.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Product</h1>

        <Card>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">{error}</div>
          )}

          <div className="space-y-4">
            <Input
              label="Product Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              label="SKU"
              required
              placeholder="e.g., PROD-001"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value.toUpperCase() })}
            />

            <Input
              label="Category"
              required
              placeholder="e.g., Electronics, Raw Materials"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <Select
              label="Unit of Measure"
              options={uomOptions}
              value={form.uom}
              onChange={(e) => setForm({ ...form, uom: e.target.value })}
            />

            <Input
              label="Minimum Stock Level"
              type="number"
              min="0"
              value={form.minStock}
              onChange={(e) => setForm({ ...form, minStock: parseInt(e.target.value) })}
            />

            <div className="flex space-x-4 pt-4">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Creating...' : 'Create Product'}
              </Button>
              <Button variant="secondary" onClick={() => navigate(ROUTES.PRODUCTS)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};