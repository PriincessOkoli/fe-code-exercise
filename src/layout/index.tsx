import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="container">
      <div className="nav-bar">
        <div className="nav-div">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="18" fill="#FFDBDE" />
          </svg>
          <div>
            <h3>Julie Howard</h3>
            <p>Admin</p>
          </div>
        </div>
      </div>
      <div className="Outlet">
        <Outlet />
      </div>
    </div>
  );
}
