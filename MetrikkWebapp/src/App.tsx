import {HashRouter, Route, Routes} from 'react-router-dom';
import {ContentContainer} from "@navikt/ds-react";
import './App.css'
import Home from "./pages/Home";


const routes = [
    { path: "*", component: <Home /> },
];

function App() {

  return (
     <div>

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
         </main>


     </div>
  )
}

export default App
