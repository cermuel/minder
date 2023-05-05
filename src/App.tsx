import { useLayoutEffect, useState } from "react";
import LandingPage from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";
import Explore from "./pages/explore";
import AddPost from "./pages/addPost";
import Search from "./pages/search";

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

          <Route path="/quotella/home" element={<Home />} />
          <Route path="/quotella/explore" element={<Explore />} />
          <Route path="/quotella/addpost" element={<AddPost />} />
          <Route path="/quotella/search" element={<Search />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
