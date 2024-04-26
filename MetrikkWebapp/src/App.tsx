// import { HashRouter, Route, Routes, Link } from 'react-router-dom';
// import { ContentContainer } from '@navikt/ds-react';
// import './App.css';
// import './index.css';
// import Home from './pages/Home';
// import Guide from './pages/Guide';
// import { Footer, ScrollToTop } from './components/theme/'
// import SiteimproveSite from './pages/SiteimproveSite';

// const routes = [
//   { path: '/', component: <Home /> },
//   { path: '/guide', component: <Guide /> },
//   { path: '/siteimprove', component: <SiteimproveSite /> }
// ];

// const Nav = () => {
//   return (
//     <nav>
//       <Link to="/siteimprove">
//         <img src="./images/SiteimproLogo.png" alt="Siteimprove Logo" />
//       </Link>
//     </nav>
//   );
// };

// function App() {
//   return (
//     <HashRouter> {/* Moved HashRouter to wrap around everything */}
//       <div className="flex flex-col min-h-screen">
//         <Nav />
//         <main className="flex-grow">
//           <ContentContainer>
//               <Routes>
//                 {routes.map(({ path, component }) => (
//                   <Route key={path} path={path} element={component} />
//                 ))}
//               </Routes>
//           </ContentContainer>
//           <ScrollToTop />
//         </main>
//        <Footer/>
//       </div>
//     </HashRouter>
//   );
// }

// export default App;

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
        <Footer className="mt-auto" />
      </div>
    </HashRouter>
  );
}

export default App;
