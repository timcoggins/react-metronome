import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Metronome from './pages/Metronome'

function App() {
  return (
      <Router>
        <div className="App">
            <Switch>
                <Route exact path={'/'}>
                    <Metronome />
                </Route>
                <Route exact path={'/pattern/:id'}>
                    <Metronome />
                </Route>
                <Route exact path={'/login'}>
                    <h1>Login</h1>
                </Route>
                <Route exact path={'/register'}>
                    <h1>Register</h1>
                </Route>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
