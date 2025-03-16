import { createRoot } from 'react-dom/client'
import './index.css' ;
import App from './App.jsx' ;
import { BrowserRouter } from 'react-router-dom' ;
import { AuthProvider } from "../src/Context/AuthProvider.jsx";

/*binding app with AuthProvider*/
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
  </BrowserRouter>
);




