import Metronome from './components/Metronome'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path='/'>
                <Metronome />
            </Route>
            <Route path='/pattern/:id'>
                <Metronome />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
        </Switch>

    </div>
  );
}

export default App;
