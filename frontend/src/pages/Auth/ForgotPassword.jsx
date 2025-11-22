import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/Common/Input';
import { Button } from '../../components/Common/Button';
import { authApi } from '../../api/authApi';
import { ROUTES } from '../../utils/constants';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await authApi.forgotPassword(email);
      setMessage('OTP sent to your email. Please check your inbox.');
    } catch (err) {
      setMessage(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h1>
        <p className="text-gray-600 mb-6">Enter your email to receive an OTP</p>

        {message && (
          <div className={`p-3 rounded-lg mb-4 text-sm ${
            message.includes('sent') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          <Link to={ROUTES.LOGIN} className="text-primary-600 hover:text-primary-700 font-medium">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};