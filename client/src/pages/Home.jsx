import { useEffect, useState } from "react";
import { getSession } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getSession();
      if (res.user) {
        setUser(res.user);
      } else {
        navigate("/login");
      }
    };
    fetchSession();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-3xl">Welcome, {user?.usernames}</h2>
    </div>
  );
};

export default Home;
