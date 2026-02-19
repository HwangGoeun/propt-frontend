import './index.css';

import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '@/components/auth/protected-route';
import LandingPage from '@/pages/landing';
import LoginPage from '@/pages/login';
import McpCodePage from '@/pages/mcp-code';
import TemplatesPage from '@/pages/templates';
import { useAuthStore } from '@/stores/auth-store';

export default function App() {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mcp/code" element={<McpCodePage />} />
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplatesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
