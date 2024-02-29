import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <Link
        onClick={logoutHandler}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign Out
      </Link>
    </nav>
  );
};

export default Navigation;
