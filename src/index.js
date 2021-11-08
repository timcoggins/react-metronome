import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import GlobalStyle from "./styles/globalStyles";
import Theme from './styles/Theme'

// Create a client
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
      <Theme>
          <QueryClientProvider client={queryClient}>
              <GlobalStyle/>
                <App />
              <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);
