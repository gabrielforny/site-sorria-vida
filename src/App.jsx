import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage6 from './pages/LandingPage6';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage6 />} />
        <Route path="/reserva" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
