import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Page } from '@navikt/ds-react';
import './App.css';
import './index.css';
import Home from './pages/Home';
import SiteimproveSite from './pages/SiteimproveSite';
import UU from './pages/uu';
import Personvern from './pages/Personvern';
import Dashboard from './pages/Dashboard'
// @ts-ignore
import { Footer, Header, ScrollToTop } from './components/theme';
import AmplitudeContextProvider from './context/AmplitudeContext';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
          <div style={{background: "rgba(19,17,54)"}}>
            <Header/>
          </div>
          <main className="flex-grow pt-12">
            <AmplitudeContextProvider>
              <Page>
                <Page.Block width="xl">
                  <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/uu" element={<UU/>}/>
                    <Route path="/personvern" element={<Personvern/>}/>
                    <Route path="/siteimprove" element={<SiteimproveSite/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                  </Routes>
                </Page.Block>
              </Page>
              <ScrollToTop/>
            </AmplitudeContextProvider>
          </main>
          <Footer className="mt-auto"/>
        </div>
    </BrowserRouter>
);
}

export default App;
