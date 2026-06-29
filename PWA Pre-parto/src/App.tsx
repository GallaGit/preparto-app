import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Contractions } from '@/pages/Contractions';
import { WaterBreak } from '@/pages/WaterBreak';
import { Symptoms } from '@/pages/Symptoms';
import { Emergency } from '@/pages/Emergency';
import { Settings } from '@/pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contractions" element={<Contractions />} />
        <Route path="/water-break" element={<WaterBreak />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
