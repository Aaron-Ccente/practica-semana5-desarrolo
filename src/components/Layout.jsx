import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) => (isActive ? "link active" : "link");

export default function Layout() {
  return (
    <>
      <nav style={{ display: "flex", gap: 16 }}>
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/list" className={linkClass}>Lista</NavLink>
        <NavLink to="/form" className={linkClass}>Formulario</NavLink>
      </nav>
      <main><Outlet /></main>
    </>
  );
}