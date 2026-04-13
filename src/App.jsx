import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import LandingPage2 from './pages/LandingPage2';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/landing-2" element={<LandingPage2 />} />
      </Routes>
    </BrowserRouter>
  );
}
