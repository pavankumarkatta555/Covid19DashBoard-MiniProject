import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import StateDetails from './components/StateSpecificRoute'
import About from './components/About'
import Vaccination from './components/Vaccination'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={StateDetails} />
    <Route exact path="/about" component={About} />
    <Route exact path="/vaccination" component={Vaccination} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
