import { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../../components/shared/AuthNavbar";
import NoPost from "../../components/shared/pages/nopost";
import Post from "../../components/shared/pages/post";
import { UserContext } from "../../contexts/UserContext";
import { getAllPosts } from "../../functions/Pages/Posts";
import { PostType } from "../../types/components/pages/post";
import { demoPosts } from "../../utils/helpers/Home";

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState<PostType[]>([]);
  useLayoutEffect(() => {
    getAllPosts();
  }, []);

  if (user) {
    return (
      <main className="bg-white relative pt-20 w-screen min-h-screen max-sm:pb-10">
        <AuthNavbar />
        <div className="w-full h-[1px] bg-gray-200"></div>
        <section className="w-full flex mt-10 px-4 flex-wrap sm:justify-around items-start justify-center">
          {demoPosts.length > 0 ? (
            demoPosts.map((post: PostType) => (
              <Post
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
  } else {
    const navigate = useNavigate();
    navigate("/auth/login");
  }
};

export default Home;
