import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
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
              <LineStyle className="sidebarIcon" />
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
                <BarChart className="sidebarIcon" />
                New User
              </li>
            </Link>
            <Link to="/films" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Films
              </li>
            </Link>
            <Link to="/newFilm" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                New Films
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
