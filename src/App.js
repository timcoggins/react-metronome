import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react'
import Metronome from './pages/Metronome'
import Register from "./pages/Register";
import {StepContextProvider} from "./contexts/StepContext";
import Theme from './styles/Theme'
import GlobalStyle from "./styles/GlobalStyles";
import ThemeContext from "./contexts/ThemeContext";
import { UserContextProvider } from "./contexts/UserContext";
import {EngineProvider} from "./contexts/EngineContext";

function App() {
    const [darkMode, setDarkMode] = useState(true);
  return (
      <UserContextProvider>
          <ThemeContext.Provider value={{darkMode, setDarkMode}}>
              <Theme>
                  <EngineProvider>
                      <StepContextProvider>
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
                                    <Route exact path={'/register'}>
                                        <Register />
                                    </Route>
                                </Switch>
                            </div>
                          </Router>
                      </StepContextProvider>
                  </EngineProvider>
              </Theme>
          </ThemeContext.Provider>
      </UserContextProvider>
  );
}

export default App;
