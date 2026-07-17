import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { ContractionsProvider } from '@/providers/ContractionsProvider';
import { TimerProvider } from '@/providers/TimerProvider';
import { Home } from '@/pages/Home';
import { Contractions } from '@/pages/Contractions';
import { WaterBreak } from '@/pages/WaterBreak';
import { Symptoms } from '@/pages/Symptoms';
import { Emergency } from '@/pages/Emergency';
import { Settings } from '@/pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <TimerProvider>
        <ContractionsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contractions" element={<Contractions />} />
            <Route path="/water-break" element={<WaterBreak />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ContractionsProvider>
      </TimerProvider>
    </BrowserRouter>
  );
}
