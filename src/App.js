import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Story } from "./pages/Story";
import Card from "./pages/Card";
import Button from "@mui/material/Button";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { margin } from "@mui/system";


function App() {
  return (
    <BrowserRouter>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Typography
              variant="h4"
              align="center">
              Hacker News
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <div className="App">
        {/* <Card></Card> */}


        <Switch>
          <Route
            exact
            path="/"
          >
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
  );
}

export default App;
