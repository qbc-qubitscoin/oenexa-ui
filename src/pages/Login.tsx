import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await api.post('/api/v1/auth/login', { email, password });
      login(response.data.token, response.data.email);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-4">
      
      {/* Brand Header */}
      <div className="mb-8 flex items-center space-x-2">
        <div className="w-10 h-10 bg-brand-yellow rounded-sm flex items-center justify-center font-bold text-bg-panel text-xl">
          O
        </div>
        <span className="text-3xl font-bold tracking-wider text-brand-yellow">OENEXA</span>
      </div>

      {/* Login Card */}
      <div className="bg-bg-panel border border-border rounded-xl w-full max-w-md p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-text-primary mb-6">OENEXA Login</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Email / Phone</label>
            <input 
              type="email" 
              className="w-full bg-bg-base border border-border rounded-md px-4 py-3 text-text-primary focus:outline-none focus:border-brand-yellow transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-bg-base border border-border rounded-md px-4 py-3 text-text-primary focus:outline-none focus:border-brand-yellow transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-brand-yellow hover:underline cursor-pointer text-sm">Forgot Password?</span>
          </div>

          <button 
            disabled={isLoading}
            className="w-full bg-brand-yellow text-bg-panel font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors mt-6 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Don't have an account? <Link to="/register" className="text-brand-yellow hover:underline ml-1">Register Now</Link>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
