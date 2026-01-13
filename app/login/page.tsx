'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const res = await signIn('credentials', {
      username: username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setIsLoading(false);
      setError('Credenciales incorrectas');
    } else {
      setIsLoading(false);
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-sans" style={{ backgroundColor: '#ffccb6' }}>
      <main className="w-full max-w-md p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#fff5f0' }}>
        <h1 className="text-4xl font-bold text-center mb-2" style={{ color: '#616d48' }}>
          ZigZag Admin
        </h1>
        <p className="text-center mb-8" style={{ color: '#fa9b71' }}>
          Sistema de Registro de Ventas
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-2 transition"
              style={{
                borderColor: '#fa9b71',
                color: '#616d48',
                backgroundColor: 'white'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#616d48';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(97, 109, 72, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#fa9b71';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition"
              style={{
                borderColor: '#fa9b71',
                color: '#616d48',
                backgroundColor: 'white'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#616d48';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(97, 109, 72, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#fa9b71';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            />
          </div>
          
          {error && (
            <p className="text-center p-3 rounded-lg" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-bold text-white text-lg transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#fa9b71',
              cursor: (isLoading) ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f08a4f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fa9b71';
            }}
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              
              {isLoading ? 'Entrando...' : 'Entrar'}
            </div>
          </button>
        </form>
      </main>
    </div>
  );
}