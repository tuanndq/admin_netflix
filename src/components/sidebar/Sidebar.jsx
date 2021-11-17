import "./sidebar.css";
import {
  PersonAdd,
  PermIdentity,
  Movie,
  GroupWork,
  LocalMovies,
  Home,
} from "@material-ui/icons";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <Home className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Manage</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/newUser" className="link">
              <li className="sidebarListItem">
                <PersonAdd className="sidebarIcon" />
                New User
              </li>
            </Link>
            <Link to="/films" className="link">
              <li className="sidebarListItem">
                <Movie className="sidebarIcon" />
                Films
              </li>
            </Link>
            <Link to="/newFilm" className="link">
              <li className="sidebarListItem">
                <GroupWork className="sidebarIcon" />
                New Films
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li className="sidebarListItem">
                <LocalMovies className="sidebarIcon" />
                Lists
              </li>
            </Link>
            <Link to="/newList" className="link">
              <li className="sidebarListItem">
                <LocalMovies className="sidebarIcon" />
                New List
              </li>
            </Link>
            <Link to="/episodes" className="link">
              <li className="sidebarListItem">
                <Movie className="sidebarIcon" />
                Episodes
              </li>
            </Link>
            <Link to="/newEpisode" className="link">
              <li className="sidebarListItem">
                <Movie className="sidebarIcon" />
                New Episode
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
