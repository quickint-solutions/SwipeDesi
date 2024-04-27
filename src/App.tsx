import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './css/global.css';
import RouteComponent from './module/pages/Route';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { getCategories } from './apiV2/categories';

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return null;
};

axios.defaults.baseURL = 'http://localhost:3333/';

function App() {
  useEffect(() => {
    window.onpopstate = function (event) {
      let isCallFromRannger = localStorage.getItem('IsCallFromPOS');
      let rangerData = localStorage.getItem('UserDetail') != null ? JSON.parse(localStorage.getItem('UserDetail') || '') : null;
      if (isCallFromRannger === 'true' && rangerData) {
        window.location.href = rangerData.callBackUrl;
      }
    };
  }, []);

  return (
    <Suspense>
      <Router basename="/">
        <QueryClientProvider client={new QueryClient()}>
          <AuthProvider>
            <ScrollToTopOnRouteChange />
            <RouteComponent />
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </Suspense>
  );
}

export default App;
