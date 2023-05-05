import { useContext, useState } from "react";
import Navbar from "../components/shared/Navbar";
import { AuthContext } from "../contexts/Auth/index";
import { VscListSelection } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Features } from "../utils/helpers/LandingPage/index";
import { LandingPageFeatures } from "../types/LandingPage/index";
import FeaturesComp from "../components/LandingPage/features";

const LandingPage = ({ isMobile }: { isMobile: boolean }) => {
  const { isAuth } = useContext(AuthContext);
  const [nav, setNav] = useState<boolean>(false);
  return (
    <main>
      <Navbar>
        {isAuth ? (
          <>
            <div
              className={`flex gap-4 ${isMobile && "mt-16"} ${
                isMobile && nav && "hidden"
              }`}
            >
              <button className="bg-white text-black hover:text-white hover:bg-black px-5 py-[6px] rounded-md font-medium">
                <Link to="/auth/login">Login</Link>
              </button>
              <button className="bg-pry text-white hover:text-pry hover:bg-white px-5 py-[6px] rounded-md font-medium">
                <Link to="/auth/register">Register</Link>
              </button>
            </div>
            {isMobile && (
              <VscListSelection
                className="fixed text-white top-7 right-4 z-50"
                onClick={() => setNav(!nav)}
              />
            )}
          </>
        ) : (
          <button className="bg-pry text-sm px-4 py-1 sm:text-base font-medium sm:px-6 sm:py-2 hover:text-pry hover:bg-white rounded-md">
            Go to Home
          </button>
        )}
      </Navbar>
      <div className="space-y-20">
        {Features.map((feature: LandingPageFeatures) => (
          <FeaturesComp
            title={feature.title}
            text={feature.text}
            headline={feature.headline}
            reverse={feature.reverse}
            buttonText={feature.buttonText}
          />
        ))}
      </div>
      <footer className="w-full h-32 mt-10 flex items-center justify-between md:px-20 sm:px-14 px-8">
        <div className="sm:space-x-8 space-x-2">
          <span className="max-sm:text-sm text-lg max-sm:font-light">
            Terms
          </span>
          <span className="max-sm:text-sm text-lg max-sm:font-light">
            Privacy Policy
          </span>
        </div>
        <span className="text-gray-400 font-light">
          Quotella &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  );
};

export default LandingPage;
