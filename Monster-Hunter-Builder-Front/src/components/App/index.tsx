import { Route, Routes, useLocation } from 'react-router-dom';
import './styles.scss';
import { useEffect } from 'react';
import AppHeader from '../AppHeader';
import BuilderPage from '../../Pages/BuilderPage';
import HomePage from '../../Pages/HomePage';
import LoginPage from '../../Pages/LoginPage';
import ProfilePage from '../../Pages/ProfilePage';
import AppFooter from '../AppFooter';
import Loadouts from '../../Pages/LoadoutsPage';
import Err404 from '../../Pages/Err404';
import Copyrights from '../../Pages/Copyrights';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location]);
  return (
    <div className="app">
      <AppHeader />
      {/* React router prevent the app from refreshing when navigating */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/loadouts" element={<Loadouts />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/copyrights" element={<Copyrights />} />
        <Route path="*" element={<Err404 />} />
      </Routes>
      <AppFooter />
    </div>
  );
}

export default App;
