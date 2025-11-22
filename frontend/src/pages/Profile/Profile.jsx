import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Common/Card';
import { useAuth } from '../../hooks/useAuth';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

        <Card title="Personal Information">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-lg text-gray-900">{user?.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <p className="text-lg text-gray-900 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};