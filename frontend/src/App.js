import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/home';
import LoginPage from './pages/LoginPage/login';
import ProfilePage from './pages/ProfilePage/profile';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { useSelector } from "react-redux";

function App() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Utilisez `state.user` ici
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile"   element={isAuthenticated ? <ProfilePage /> : <Navigate to="/"/>} />
        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
