import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
      <AppRouter />
  );
};

export default App;