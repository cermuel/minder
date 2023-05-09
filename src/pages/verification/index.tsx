import { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/shared/pages/loading";
import { auth } from "../../config/firebase";
import { UserContext } from "../../contexts/UserContext";
import { getAllPosts } from "../../functions/Pages/Posts";
import { PostType } from "../../types/components/pages/post";
import { IoArrowBack } from "react-icons/io5";
import { VerifyAccount } from "../../functions/Auth";
import { Toaster } from "react-hot-toast";

const Verification = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState<PostType[]>();
  const [postsError, setPostsError] = useState<any>();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    getAllPosts(setPosts, setPostsError);
    setPostsError(postsError);
    console.log(auth.currentUser);
  }, []);

  if (user) {
    if (posts) {
      const myPosts = posts?.filter((post: PostType) => {
        return post.username == user?.username;
      });
      if (myPosts.length >= 5) {
        return (
          <div className="w-screen h-screen flex justify-center items-center bg-white text-gray-800">
            <Toaster />
            <button onClick={() => navigate(-1)}>
              <IoArrowBack className="text-pry text-2xl absolute top-4 left-4" />
            </button>
            <div className="flex-col flex gap-2 items-start">
              <button
                onClick={VerifyAccount}
                className="py-2 ml-auto text-sm text-white font-semibold px-6 bg-pry rounded-md"
              >
                Request Verification
              </button>
            </div>
          </div>
        );
      } else {
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
      }
    } else {
      return <Loading />;
    }
  } else {
    return (
      <div className="w-screen h-screen items-center justify-center">
        <div>
          <h1 className="text-black font-semibold text-2xl">
            You are not logged in
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
