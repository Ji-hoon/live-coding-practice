import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div style={{ display: "flex", gap: "1em" }}>
        <NavLink to="/todos">todos</NavLink>
        <NavLink to="/signup">signup</NavLink>
      </div>
      <Outlet />
    </>
  );
}

export default App;
