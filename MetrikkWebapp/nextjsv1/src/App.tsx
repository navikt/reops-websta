import { HashRouter, Route, Routes } from 'react-router-dom';
import { ContentContainer } from '@navikt/ds-react';
import './App.css';
import './index.css';
import Home from './pages/Home';
import SiteimproveSite from './pages/SiteimproveSite';
import { Footer, Nav, ScrollToTop } from './components/theme';

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-grow bg-custom-cyan">
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/amplitude" element={<Home />} />
              <Route path="/siteimprove" element={<SiteimproveSite />} />
            </Routes>
          </ContentContainer>
          <ScrollToTop />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
