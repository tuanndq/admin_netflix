import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import FilmList from "./pages/filmList/FilmList";
import Film from "./pages/film/Film";
import NewFilm from "./pages/newFilm/NewFilm";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/films">
            <FilmList />
          </Route>
          <Route path="/film/:filmId">
            <Film />
          </Route>
          <Route path="/newfilm">
            <NewFilm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
