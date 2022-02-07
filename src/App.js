import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import StateDetails from './components/StateSpecificRoute'
import About from './components/About'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={StateDetails} />
    <Route exact path="/about" component={About} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
