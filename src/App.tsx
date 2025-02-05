import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MobileContainer } from './components/MobileContainer';
import { MainLayout } from './layouts/MainLayout';
import { RoutePage } from './pages/RoutePage';
import { HistoryPage } from './pages/HistoryPage';
import { InfoPage } from './pages/InfoPage';
import { PostDetailPage } from './pages/PostDetailPage';

function App() {
  return (
    <BrowserRouter>
      <MobileContainer>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<RoutePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/info" element={<InfoPage />} />
          </Route>
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileContainer>
    </BrowserRouter>
  );
}

export default App;
