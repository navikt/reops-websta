import { HashRouter, Route, Routes } from 'react-router-dom';
import { ContentContainer } from '@navikt/ds-react';
import './App.css';
import './index.css';
import Home from './pages/Home';
import Guide from './pages/Guide';
import { Footer, Nav, ScrollToTop } from './components/theme/'

const routes = [
  { path: '/', component: <Home /> },
  { path: '/guide', component: <Guide /> },
];

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">
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
      <Footer />

    </div>
  );
}

export default App;
