import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { authenticateUser } from '../lib/auth';

interface LoginFormProps {
  onFirstLogin: () => void;
  onLogin: () => void;
}

export const LoginForm = ({ onFirstLogin, onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authenticateUser(email, password)) {
      onLogin();
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="w-full max-w-md p-4 sm:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="seu@email.com"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          Entrar
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 space-y-4 text-center">
        <button
          onClick={onFirstLogin}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Primeiro Login
        </button>

        <div className="border-t pt-4">
          <button
            onClick={onLogin}
            className="text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center gap-2 mx-auto"
          >
            Pular Login
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};