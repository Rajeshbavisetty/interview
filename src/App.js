import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './Components/Home'
import TechEraItem from './Components/TechEraItem'
import NotFound from './Components/NotFound'
import Header from './Components/Header'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={TechEraItem} />
      <Route exact path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </>
)

export default App
