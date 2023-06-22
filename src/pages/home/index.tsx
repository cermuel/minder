import { useLayoutEffect, useState } from "react";
import AuthNavbar from "../../components/shared/AuthNavbar";
import NoPost from "../../components/shared/pages/nopost";
import Post from "../../components/shared/pages/post";
import { getAllPosts } from "../../functions/Pages/Posts";
import { PostType } from "../../types/components/pages/post";
import Loading from "../../components/shared/pages/loading";
import Error from "../../components/shared/pages/error";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState<PostType[] | undefined | any>();
  const [postsError, setPostsError] = useState<any>();

  useLayoutEffect(() => {
    getAllPosts(setPosts, setPostsError);
  }, []);
  let token = localStorage.getItem("token");

  if (token) {
    if (posts) {
      return (
        <main className="bg-white relative pt-20 w-screen min-h-screen max-sm:pb-10">
          <AuthNavbar />
          <div className="w-full h-[1px] bg-gray-200"></div>
          <section className="w-full flex mt-10 px-4 flex-wrap sm:justify-around items-start justify-center">
            {posts.length > 0 ? (
              posts.map((post: PostType | any, key: number) => {
                return (
                  <Post
                    key={key}
                    category={post.category}
                    thought={post.thought}
                    username={post?.username}
                    isVerified={post?.isVerified}
                    spotifyURL={post.spotifyURL}
                  />
                );
              })
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
export default Home;
