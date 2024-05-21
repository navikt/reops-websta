import { HashRouter, Route, Routes } from 'react-router-dom';
import { ContentContainer } from '@navikt/ds-react';
import './App.css';
import './index.css';
import Home from './pages/Home';
import SiteimproveSite from './pages/SiteimproveSite';
import { Footer, Nav, ScrollToTop } from './components/theme';
import Dashboard from "./pages/Dashboard.tsx";

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-grow bg-custom-cyan pt-20">
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/amplitude" element={<Home />} />
              <Route path="/siteimprove" element={<SiteimproveSite />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </ContentContainer>
          <ScrollToTop />
        </main>
        <Footer className="mt-auto" />
      </div>
    </HashRouter>
  );
}

export default App;
