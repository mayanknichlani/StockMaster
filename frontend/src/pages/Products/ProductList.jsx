import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Table } from '../../components/Common/Table';
import { Button } from '../../components/Common/Button';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { productApi } from '../../api/productApi';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll({ search: searchTerm });
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productApi.delete(id);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const columns = [
    { header: 'SKU', field: 'sku' },
    { header: 'Name', field: 'name' },
    { header: 'Category', field: 'category' },
    { header: 'UOM', field: 'uom' },
    {
      header: 'Stock',
      render: (row) => <span className="font-medium">{row.currentStock || 0}</span>,
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`${ROUTES.PRODUCTS}/${row._id}/edit`);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <Button onClick={() => navigate(`${ROUTES.PRODUCTS}/create`)}>
            <Plus size={20} className="mr-2" />
            Add Product
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search by name or SKU..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <Table
              columns={columns}
              data={products}
              onRowClick={(row) => navigate(`${ROUTES.PRODUCTS}/${row._id}`)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};