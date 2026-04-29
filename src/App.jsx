import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import LandingPage2 from './pages/LandingPage2';
import LandingPage3 from './pages/LandingPage3';
import LandingPage4 from './pages/LandingPage4';
import LandingPage5 from './pages/LandingPage5';
import LandingPage6 from './pages/LandingPage6';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/landing-2" element={<LandingPage2 />} />
        <Route path="/landing-3" element={<LandingPage3 />} />
        <Route path="/landing-4" element={<LandingPage4 />} />
        <Route path="/landing-5" element={<LandingPage5 />} />
        <Route path="/landing-6" element={<LandingPage6 />} />
      </Routes>
    </BrowserRouter>
  );
}
