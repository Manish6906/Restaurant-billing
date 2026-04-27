import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation(); // ✅ add this
  const navigate= useNavigate()

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = location.state || storedUser;
  const handleLogout =()=>
  {
    localStorage.removeItem("user");
    navigate("/")
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome {user?.name}</h1>
      <p>Email: {user?.email}</p>
      {/* <img 
  src={user?.photo + "?sz=200"} 
  alt="profile"
  width="120"
  height="120"
  style={{ borderRadius: "50%", border: "2px solid black" }}
/> */}
      <img src={user?.photo} alt="profile" width="100" />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;