import './App.css';
import HomePage from './pages/HomePage/HomePage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AppRoutes } from './constants/appRoutes.ts';
import AssetPage from './pages/AssetPage/AssetPage.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.HOME} element={<HomePage />} />
          <Route
            path={`${AppRoutes.ASSETS}/:assetId`}
            element={<AssetPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
