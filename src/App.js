import Pokedex from "./components/Pokedex"
import Pokemon from "./components/Pokemon"

import { createBrowserHistory } from "history"
import { Route, Switch, BrowserRouter as Router, useHistory} from 'react-router-dom'






function App() {
  const historyInstance = createBrowserHistory();



  return(
    <div className = "App">
      <Router history = {historyInstance}>
    
      <Switch>
        <Route exact path="/" render={(props) => <Pokedex {...props} />} />
        <Route path="/:pokemonId" render={(props) => <Pokemon {...props} />}/>
      </Switch>
  </Router>
    </div>

  )
}




export default App;
