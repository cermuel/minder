import { useLayoutEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditProfile from "../../components/shared/pages/editprofile";
import Error from "../../components/shared/pages/error";
import Loading from "../../components/shared/pages/loading";
import NoPost from "../../components/shared/pages/nopost";
import Post from "../../components/shared/pages/post";
import { GetCurrentUser, GetMyPosts } from "../../functions/Auth";
import { PostType } from "../../types/components/pages/post";

const Profile = () => {
  const [posts, setPosts] = useState<PostType[]>();
  const [postsError, setPostsError] = useState<any>();
  const [showEditProfile, setshowEditProfile] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    GetMyPosts({ setPosts, setPostsError });
    setPostsError(postsError);
    GetCurrentUser({ setUser, setIsLoading });
    !isLoading;
  }, []);

  let token = localStorage.getItem("token");

  if (token) {
    if (posts && user) {
      return (
        <main className="w-screen h-screen bg-white">
          <Toaster />
          {showEditProfile && (
            <EditProfile setshowEditProfile={setshowEditProfile} />
          )}
          <div className="w-full sm:h-48 h-36 bg-pry">
            <button onClick={() => navigate(-1)} className="m-4">
              <BiArrowBack className="text-2xl" />
            </button>
          </div>
          <div className="w-full flex items-center flex-col translate-y-[-40px]">
            <img
              src={user?.profilePicture}
              className="rounded-full w-20 h-20"
            />
            <span className="text-black tracking-wide font-medium text-xl mb-1 mt-4">
              {user?.name}
            </span>
            <span className="text-black flex items-center hover:text-pry text-sm">
              @{user?.username}
              {user?.isVerified == true && <MdVerified className="text-pry" />}
            </span>
            <button
              onClick={() => setshowEditProfile(true)}
              className="bg-pry hover:text-pry hover:bg-transparent mt-2 text-xs font-medium py-1 px-3 rounded-md "
            >
              Edit Profile
            </button>
          </div>
          <section className="w-full flex px-4 flex-wrap sm:gap-8 items-start justify-center">
            {posts.length > 0 ? (
              posts.map((post: PostType) => (
                <Post
                  key={post.thought}
                  category={post.category}
                  thought={post.thought}
                  username={user.username}
                  isVerified={user.isVerified}
                  spotifyURL={post.spotifyURL}
                />
              ))
            ) : (
              <NoPost />
            )}
          </section>
        </main>
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
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth/login");
            }}
          >
            Go to login page
          </button>
        </div>
      </div>
    );
  }
};

export default Profile;
