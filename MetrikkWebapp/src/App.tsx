import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import { ContentContainer } from '@navikt/ds-react';
import './App.css';
import './index.css';
import Home from './pages/Home';
import Guide from './pages/Guide';
import { Footer, Nav, ScrollToTop } from './components/theme';
import Dashboard from "./pages/Dashboard.tsx";

const routes = [
  { path: '/', component: <Home /> },
  { path: '/guide', component: <Guide /> },
  { path: '/dashboard', component: <Dashboard /> },
];

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow bg-custom-cyan">
        <ContentContainer>
          <HashRouter>
            <Routes>
              {routes.map(({ path, component }) => (
                <Route key={path} path={path} element={component} />
              ))}
            </Routes>
          </HashRouter>
        </ContentContainer>
        <ScrollToTop />
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

export default App;
