import { useSelector } from "react-redux";

const Rank = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Add conditional rendering to check if userInfo exists
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="white f3">
        <h3>{userInfo.name}, your current rank is...</h3>
      </div>

      <div className="white f3">
        <h3>{"#5"}</h3>
      </div>
    </div>
  );
};

export default Rank;
