import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import FilmList from "./pages/filmList/FilmList";
import NewList from "./pages/newList/NewList";
import Film from "./pages/film/Film";
import NewFilm from "./pages/newFilm/NewFilm";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { getAllFilms } from "./redux/actions/action";
import Login from "./pages/login/Login";
import NewEpisode from "./pages/newEpisode/NewEpisode";
import Alert from "./components/alert/Alert";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllFilms())
  // }, [])

  let { token } = useSelector((state) => state.User);
  token = token === null ? localStorage.getItem("token") : token;

  return (
    <Router>
      <Alert />
      {token && <Topbar />}
      <div className="container">
        {token && <Sidebar />}
        <Switch>
          {token && (
            <Fragment>
              <Route exact path="/">
                <FilmList />
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
              <Route path="/newList">
                <NewList />
              </Route>
              <Route path="/film/:filmId">
                <Film />
              </Route>
              <Route path="/newFilm">
                <NewFilm />
              </Route>
              <Route path="/newEpisode">
                <NewEpisode />
              </Route>
            </Fragment>
          )}
          {!token && (
            <Route path="/*">
              <Login />
            </Route>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
