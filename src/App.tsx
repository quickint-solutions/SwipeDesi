import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
// import './css/global.css';
import './css/global.css';
import RouteComponent from './module/pages/Route';

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname])
  
  return null;
}

function App() {

  useEffect(() => {
    window.onpopstate = function (event) {
      let isCallFromRannger = localStorage.getItem("IsCallFromPOS");
      let rangerData = localStorage.getItem("UserDetail") != null ? JSON.parse(localStorage.getItem("UserDetail") || "") : null
      if (isCallFromRannger === "true" && rangerData) {
        window.location.href = rangerData.callBackUrl;
      }
    }
  }, [])

  return (
    <Suspense>
      <Router basename="/">
        <ScrollToTopOnRouteChange />
        <RouteComponent />
      </Router>
    </Suspense>
  );
}

export default App;
