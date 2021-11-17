import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import GlobalStyle from "./styles/GlobalStyles";
import Theme from './styles/Theme'
import { StepContextProvider } from './contexts/StepContext'

// Create a client
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
      <Theme>
          <StepContextProvider>
          <QueryClientProvider client={queryClient}>
              <GlobalStyle/>
                <App />
              <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          </StepContextProvider>
      </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);
