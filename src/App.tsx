import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import About from "./pages/About";
import DataSource from "./pages/DataSource";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
const queryClient = new QueryClient();
import MainLayout from "./layout/MainLayout";
const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/om-oss" element={<About />} />
          <Route path="/datakalla" element={<DataSource />} />
          <Route path="/integritetspolicy" element={<PrivacyPolicy />} />
          <Route path="/anvandarvillkor" element={<Terms />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
