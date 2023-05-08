import { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../../components/shared/AuthNavbar";
import NoPost from "../../components/shared/pages/nopost";
import Post from "../../components/shared/pages/post";
import { UserContext } from "../../contexts/UserContext";
import { getAllPosts } from "../../functions/Pages/Posts";
import { PostType } from "../../types/components/pages/post";
import Loading from "../../components/shared/pages/loading";
import Error from "../../components/shared/pages/error";

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState<PostType[]>();
  const [postsError, setPostsError] = useState<any>();
  useLayoutEffect(() => {
    getAllPosts(setPosts, setPostsError);
    console.log(posts);
  }, []);

  if (user) {
    if (posts) {
      return (
        <main className="bg-white relative pt-20 w-screen min-h-screen max-sm:pb-10">
          <AuthNavbar />
          <div className="w-full h-[1px] bg-gray-200"></div>
          <section className="w-full flex mt-10 px-4 flex-wrap sm:justify-around items-start justify-center">
            {posts.length > 0 ? (
              posts.map((post: PostType, key: number) => (
                <Post
                  key={key}
                  category={post.category}
                  quote={post.quote}
                  username={post.username}
                  isVerified={post.isVerified}
                />
              ))
            ) : (
              <NoPost />
            )}
          </section>
        </main>
      );
    } else if (postsError) {
      return <Error message={postsError?.message} />;
    } else {
      return <Loading />;
    }
  } else {
    const navigate = useNavigate();

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

export default Home;
