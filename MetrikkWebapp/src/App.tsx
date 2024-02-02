import {HashRouter, Route, Routes} from 'react-router-dom';
import {ContentContainer} from "@navikt/ds-react";
import './App.css'
import './index.css'
import Home from "./pages/Home";
import {Footer, Nav, ScrollToTop} from "./components/theme";


const routes = [
    { path: "*", component: <Home /> },
];

function App() {

  return (
     <div>
        <Nav/>
         <main style={{maxWidth: "600px", marginLeft: "auto", marginRight: "auto"}}>
             <ContentContainer>
                 <HashRouter>
                     <Routes>
                         {routes.map(({ path, component }) => (
                             <Route key={path} path={path} element={component} />
                         ))}
                     </Routes>
                 </HashRouter>
             </ContentContainer>
             <ScrollToTop/>
         </main>
         <Footer/>
     </div>
  )
}

export default App
