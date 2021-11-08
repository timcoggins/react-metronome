import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Metronome from './pages/Metronome'
import Login from './pages/Login'
import Register from "./pages/Register";

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
                    <Login />
                </Route>
                <Route exact path={'/register'}>
                    <Register />
                </Route>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
