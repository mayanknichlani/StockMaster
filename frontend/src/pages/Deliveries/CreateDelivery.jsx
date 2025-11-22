import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Common/Card';
import { Input } from '../../components/Common/Input';
import { Select } from '../../components/Common/Select';
import { Button } from '../../components/Common/Button';
import { productApi } from '../../api/productApi';
import { deliveryApi } from '../../api/deliveryApi';
import { Plus, Trash2 } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const CreateDelivery = () => {
  const [form, setForm] = useState({
    customer: '',
    items: [{ productId: '', quantity: 0 }],
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await productApi.getAll();
    setProducts(data.products || []);
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { productId: '', quantity: 0 }] });
  };

  const removeItem = (index) => {
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await deliveryApi.create(form);
      navigate(ROUTES.DELIVERIES);
    } catch (err) {
      alert('Failed to create delivery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Delivery</h1>

        <Card>
          <div className="space-y-6">
            <Input
              label="Customer Name"
              required
              value={form.customer}
              onChange={(e) => setForm({ ...form, customer: e.target.value })}
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Items</h3>
                <Button onClick={addItem}>
                  <Plus size={18} className="mr-2" />
                  Add Item
                </Button>
              </div>

              {form.items.map((item, index) => (
                <div key={index} className="flex space-x-4 mb-4">
                  <Select
                    label="Product"
                    options={[
                      { value: '', label: 'Select Product' },
                      ...products.map((p) => ({ value: p._id, label: `${p.name} (${p.sku})` })),
                    ]}
                    value={item.productId}
                    onChange={(e) => updateItem(index, 'productId', e.target.value)}
                  />

                  <Input
                    label="Quantity"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                  />

                  <div className="flex items-end">
                    <button
                      onClick={() => removeItem(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4 pt-4">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Creating...' : 'Create Delivery'}
              </Button>
              <Button variant="secondary" onClick={() => navigate(ROUTES.DELIVERIES)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};