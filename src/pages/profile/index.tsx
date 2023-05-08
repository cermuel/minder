import { useContext, useLayoutEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsBack } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/shared/pages/loading";
import NoPost from "../../components/shared/pages/nopost";
import Post from "../../components/shared/pages/post";
import { auth } from "../../config/firebase";
import { UserContext } from "../../contexts/UserContext";
import { getAllPosts } from "../../functions/Pages/Posts";
import { PostType } from "../../types/components/pages/post";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState<PostType[]>();
  const [postsError, setPostsError] = useState<any>();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    getAllPosts(setPosts, setPostsError);
    setPostsError(postsError);
    console.log(auth.currentUser);
  }, []);

  if (posts && user?.photoUrl !== null) {
    const myPosts = posts?.filter((post: PostType) => {
      return post.username == user?.username;
    });
    return (
      <main className="w-screen h-screen bg-white">
        <div className="w-full sm:h-48 h-36 bg-pry">
          <button onClick={() => navigate(-1)} className="m-4">
            <BiArrowBack />
          </button>
        </div>
        <div className="w-full flex items-center flex-col translate-y-[-40px]">
          <img src={user?.photoUrl} className="rounded-full w-20 h-20" />
          <span className="text-black tracking-wide font-medium text-xl mb-1 mt-4">
            {user?.fullName}
          </span>
          <span className="text-black flex items-center hover:text-pry text-sm">
            @{user?.username}
            {user?.isVerified == true && <MdVerified className="text-pry" />}
          </span>
          <button className="bg-pry hover:text-pry hover:bg-transparent mt-2 text-xs font-medium py-1 px-3 rounded-md ">
            Edit Profile
          </button>
        </div>
        <section className="w-full flex px-4 flex-wrap sm:gap-8 items-start justify-center">
          {myPosts.length > 0 ? (
            myPosts.map((post: PostType) => (
              <Post
                key={post.quote}
                category={post.category}
                quote={post.quote}
                username={post.username}
                isVerified={post.isVerified}
                embedUrl={post.embedUrl}
              />
            ))
          ) : (
            <NoPost />
          )}
        </section>
      </main>
    );
  } else {
    return <Loading />;
  }
};

export default Profile;
