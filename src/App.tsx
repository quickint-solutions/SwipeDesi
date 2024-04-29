import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './css/global.css';
import RouteComponent from './module/pages/Route';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { AuthProvider } from './context/auth.context';
import { CartProvider } from './context/cart.context';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OhE1ILaWLKJ299MykVFUl8LtKHkoxLYA2ck8f1fW5nVH83u4p3KXOOsnJBTiLgmXEkihHO0PWMB8M5ugiqrFwL400uSiPzNjc');

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return null;
};

axios.defaults.baseURL = 'https://staging.api.dhknd.ca/api/';

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
          <Elements stripe={stripePromise}>
            <AuthProvider>
              <CartProvider>
                <ScrollToTopOnRouteChange />
                <RouteComponent />
              </CartProvider>
            </AuthProvider>
          </Elements>
        </QueryClientProvider>
      </Router>
    </Suspense>
  );
}

export default App;
