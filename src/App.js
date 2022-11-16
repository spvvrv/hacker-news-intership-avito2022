import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Story } from './pages/Story';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">Home</Link>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/story/:id">
            <Story />
          </Route>
          <Route>
            <h1>Error 404</h1>
            <div>Page not found</div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;