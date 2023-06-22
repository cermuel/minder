import { useLayoutEffect, useState } from "react";
//@ts-ignore
import LandingPage from "./pages/index";
//@ts-ignore
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//@ts-ignore
import Login from "./pages/auth/login";
//@ts-ignore
import Register from "./pages/auth/register";
//@ts-ignore
import Home from "./pages/home";
//@ts-ignore
import AddPost from "./pages/addPost";
//@ts-ignore
import Search from "./pages/search";
//@ts-ignore
import Profile from "./pages/profile";
//@ts-ignore
import Verification from "./pages/verification";
//@ts-ignore
import UnderConstruction from "./components/UnderConstruction";

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
    // <UnderConstruction />
  );
};

export default App;
