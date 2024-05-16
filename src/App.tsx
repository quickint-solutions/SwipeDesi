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

const stripePromise = loadStripe('pk_live_51IKSIZJvIVD3jVvjJFvRwvAOtq1zaukEOeqLfMNw9MWa9pALPUkH7OCpAlK6IzjwipnqIX9q9dcNwyLZg9mRgs6B0059UfSbHw');

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
