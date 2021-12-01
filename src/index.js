/**
 * index.js
 * App injection point
 */
// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
// import { ReactQueryDevtools } from 'react-query/devtools'

// Render The App
ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
            <App />
          {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
