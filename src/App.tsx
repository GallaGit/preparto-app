import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { I18nProvider } from '@/i18n/I18nProvider';
import { ContractionsProvider } from '@/providers/ContractionsProvider';
import { NotificationsProvider } from '@/providers/NotificationsProvider';
import { TimerProvider } from '@/providers/TimerProvider';
import { Home } from '@/pages/Home';
import { Contractions } from '@/pages/Contractions';
import { WaterBreak } from '@/pages/WaterBreak';
import { Symptoms } from '@/pages/Symptoms';
import { SymptomTypePage } from '@/pages/SymptomTypePage';
import { Emergency } from '@/pages/Emergency';
import { Settings } from '@/pages/Settings';
import { History } from '@/pages/History';
import { HistoryDetail } from '@/pages/HistoryDetail';
import { HospitalBag } from '@/pages/HospitalBag';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <TimerProvider>
        <ContractionsProvider>
          <NotificationsProvider>
            <I18nProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contractions" element={<Contractions />} />
                <Route path="/water-break" element={<WaterBreak />} />
                <Route path="/symptoms" element={<Symptoms />} />
                <Route
                  path="/symptoms/:symptomType"
                  element={<SymptomTypePage />}
                />
                <Route path="/history" element={<History />} />
                <Route path="/history/:kind/:id" element={<HistoryDetail />} />
                <Route path="/hospital-bag" element={<HospitalBag />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </I18nProvider>
          </NotificationsProvider>
        </ContractionsProvider>
      </TimerProvider>
    </BrowserRouter>
  );
}
