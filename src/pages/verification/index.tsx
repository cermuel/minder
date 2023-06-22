import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/shared/pages/loading";
import { PostType } from "../../types/components/pages/post";
import { IoArrowBack } from "react-icons/io5";
import {
  GetCurrentUser,
  GetMyPosts,
  VerifyAccount,
} from "../../functions/Auth";
import { Toaster } from "react-hot-toast";
import Error from "../../components/shared/pages/error";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Verification = () => {
  const [posts, setPosts] = useState<PostType[]>();
  const [postsError, setPostsError] = useState<any>();
  const [user, setuser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fakeLoading, setfakeLoading] = useState(false);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    GetCurrentUser({ setUser: setuser, setIsLoading: setfakeLoading });
    GetMyPosts({ setPosts, setPostsError });
    fakeLoading;
  }, []);

  let token = localStorage.getItem("token");

  if (token) {
    if (posts && user && posts.length < 5) {
      return (
        <div className="w-screen h-screen flex justify-center items-center bg-white text-gray-800">
          <Toaster />
          <button onClick={() => navigate(-1)}>
            <IoArrowBack className="text-pry text-2xl absolute top-4 left-4" />
          </button>
          <div className="flex-col flex gap-2 items-start">
            <button
              onClick={() =>
                VerifyAccount({
                  setIsLoading,
                  userid: user.id,
                  username: user.username,
                })
              }
              className="py-2 ml-auto text-sm text-white flex items-center justify-center text-center font-semibold w-40 bg-pry rounded-md"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-white" />
              ) : (
                "Request Verification"
              )}
            </button>
          </div>
        </div>
      );
    } else if (posts && user) {
      return (
        <div className="w-screen h-screen text-center flex justify-center items-center bg-white text-gray-800">
          <button onClick={() => navigate(-1)}>
            <IoArrowBack className="text-pry text-2xl absolute top-4 left-4" />
          </button>
          <div>
            <h1 className="font-semibold text-2xl">
              You are not eligible to request verification
            </h1>
            <p className="text-pry text-center text-[10px] font-medium">
              You must have atleast 5 posts to be eligible to request
              verification
            </p>
          </div>
        </div>
      );
    } else if (postsError) {
      return <Error message={postsError} />;
    } else {
      return <Loading />;
    }
  } else {
    return (
      <div className="w-screen h-screen items-center bg-white justify-center flex">
        <div>
          <h1 className="text-black font-semibold text-2xl mb-1">
            Session Expired
          </h1>
          <button
            className="text-white bg-pry px-6 py-2 rounded-md"
            onClick={() => navigate("/auth/login")}
          >
            Go to login page
          </button>
        </div>
      </div>
    );
  }
};

export default Verification;
