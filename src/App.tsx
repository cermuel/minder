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
import Profile from "./pages/profile";
import Verification from "./pages/verification";

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
          photoUrl: mainUser.photoUrl,
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

          <Route path="/minder/home" element={<Home />} />
          <Route path="/minder/addpost" element={<AddPost />} />
          <Route path="/minder/search" element={<Search />} />
          <Route path="/minder/user/profile" element={<Profile />} />
          <Route path="/minder/user/verification" element={<Verification />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
