import { useContext, useLayoutEffect, useState } from "react";
import LandingPage from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";
import AddPost from "./pages/addPost";
import Search from "./pages/search";
import { User } from "./types/context/User";
import { UserContext } from "./contexts/UserContext";
import { AuthContext } from "./contexts/Auth";

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { setIsAuth } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);
  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);

  useLayoutEffect(() => {
    const authUser = localStorage.getItem("user");
    let mainUser: User;
    if (authUser !== null) {
      mainUser = JSON.parse(authUser);
      if (mainUser) {
        setIsAuth(true);
        setUser({
          ...user,
          username: mainUser.username,
          email: mainUser.email,
          isVerified: mainUser.isVerified,
          fullName: mainUser.fullName,
        });
      }
    }
  }, []);

  return (
    <main className="w-screen overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage isMobile={isMobile} />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* After auth routes */}

          <Route path="/quotella/home" element={<Home />} />
          <Route path="/quotella/addpost" element={<AddPost />} />
          <Route path="/quotella/search" element={<Search />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
