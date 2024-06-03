import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';
import { ContentContainer } from '@navikt/ds-react';
import './App.css';
import './index.css';
import Home from './pages/Home';
import SiteimproveSite from './pages/SiteimproveSite';
import UU from './pages/uu';
import Personvern from './pages/Personvern';
import Dashboard from './pages/Dashboard'
import { Footer, Nav, ScrollToTop } from './components/theme';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-grow bg-custom-cyan pt-20">
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/uu" element={<UU />} />
              <Route path="/personvern" element={<Personvern />} />
              <Route path="/siteimprove" element={<SiteimproveSite />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </ContentContainer>
          <ScrollToTop />
        </main>
        <Footer className="mt-auto" />
      </div>
    </BrowserRouter>
  );
}

export default App;
