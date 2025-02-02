import './App.css';
import HomePage from './pages/HomePage/HomePage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AppRoutes } from './constants/appRoutes.ts';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.HOME} element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <HomePage />
    </>
  );
}

export default App;
