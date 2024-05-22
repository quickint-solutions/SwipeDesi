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

export const stripePromise = loadStripe(
  'pk_live_51IKSIZJvIVD3jVvjJFvRwvAOtq1zaukEOeqLfMNw9MWa9pALPUkH7OCpAlK6IzjwipnqIX9q9dcNwyLZg9mRgs6B0059UfSbHw',
);
// export const stripePromise = loadStripe(
//   'pk_test_51OhE1ILaWLKJ299MykVFUl8LtKHkoxLYA2ck8f1fW5nVH83u4p3KXOOsnJBTiLgmXEkihHO0PWMB8M5ugiqrFwL400uSiPzNjc',
// );
// pk_test_51OhE1ILaWLKJ299MykVFUl8LtKHkoxLYA2ck8f1fW5nVH83u4p3KXOOsnJBTiLgmXEkihHO0PWMB8M5ugiqrFwL400uSiPzNjc

// sk_test_51OhE1ILaWLKJ299M68wLw4JpAE7g1nULwQhecdES4kn3rLmeXeDIDflfNyAKih8VEUd0ISf6rDS2xSlAmzpGRPQb00j6FOoUeb

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
          <AuthProvider>
            <CartProvider>
              <ScrollToTopOnRouteChange />
              <RouteComponent />
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </Suspense>
  );
}

export default App;
