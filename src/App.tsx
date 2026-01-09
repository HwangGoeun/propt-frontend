import './index.css';

import { BrowserRouter, Navigate,Route, Routes } from 'react-router-dom';

import LoginPage from './pages/login';
import TemplatesPage from './pages/templates';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
