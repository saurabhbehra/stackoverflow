import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import Answer from './Components/Answer';
import Questions from "./Components/Questions";



const App=()=> {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Questions/>
        </Route>
        <Route path="/question/:id" exact>
          <Answer/>
        </Route>
        <Redirect to="/" />
      </Switch>
     </Router>
  );
}

export default App;
