import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Story } from "./pages/Story";
import Header from "./pages/header";
// import { Comment } from "./pages/comment";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/story/:id">
              <Story />
              <div>
                <Link to="/">See other stories</Link>
              </div>
            </Route>
            <Route>
              <h1>Error 404</h1>
              <div>Page not found</div>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
