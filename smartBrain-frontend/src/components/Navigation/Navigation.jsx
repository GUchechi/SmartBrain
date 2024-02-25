import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <Link to={`/login`} className="f3 link dim black underline pa3 pointer">Sign Out</Link>
    </nav>
  );
};

export default Navigation;
