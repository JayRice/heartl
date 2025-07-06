import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (email: string, password: string) => void;
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        
        <button
          type="submit"
          className="w-full bg-white text-pink-500 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-colors"
        >
          {mode === 'login' ? 'Log in' : 'Create account'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <button
          onClick={onToggleMode}
          className="text-white/80 hover:text-white transition-colors"
        >
          {mode === 'login' 
            ? "Don't have an account? Create one" 
            : "Already have an account? Log in"
          }
        </button>
      </div>
    </div>
  );
};

export default AuthForm;