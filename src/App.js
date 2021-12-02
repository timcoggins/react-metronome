/**
 * App.js
 * Top Level App Component
 */
// Imports

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react'
import { UserContextProvider } from "./contexts/UserContext";
import { EngineProvider } from "./contexts/EngineContext";
import ThemeContext from "./contexts/ThemeContext";
import GlobalStyle from "./styles/GlobalStyles";
import Metronome from './pages/Metronome'
// import Register from "./pages/Register";
import Theme from './styles/Theme'

/**
 * Top Level App Component
 * @returns {JSX.Element}
 */
function App() {
    // State for darkmode
    const [darkMode, setDarkMode] = useState(true);
    return (
      <UserContextProvider>
          <ThemeContext.Provider value={{darkMode, setDarkMode}}>
              <Theme>
                  <EngineProvider>
                      <GlobalStyle/>
                      <Router>
                        <div className="App">
                            <Switch>
                                <Route exact path={'/'}>
                                    <Metronome />
                                </Route>
                                <Route exact path={'/pattern/:id'}>
                                    <Metronome />
                                </Route>
                                {/*<Route exact path={'/register'}>*/}
                                {/*    <Register />*/}
                                {/*</Route>*/}
                            </Switch>
                        </div>
                      </Router>
                  </EngineProvider>
              </Theme>
          </ThemeContext.Provider>
      </UserContextProvider>
  );
}

export default App;
