import { useLayoutEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import AuthNavbar from "../../components/shared/AuthNavbar";
import NoPost from "../../components/shared/pages/nopost";
import Post from "../../components/shared/pages/post";
import { PostType } from "../../types/components/pages/post";
import { categories } from "../../utils/constants";
import { getAllPosts } from "../../functions/Pages/Posts";
import Error from "../../components/shared/pages/error";
import Loading from "../../components/shared/pages/loading";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<PostType[]>();
  const [postsError, setPostsError] = useState<any>();

  useLayoutEffect(() => {
    getAllPosts(setPosts, setPostsError);
  }, []);
  const [maincategory, switchCategory] = useState<string>("");

  let token = localStorage.getItem("token");
  if (token) {
    if (posts) {
      const filteredByCategoryPosts = posts?.filter((post: PostType) => {
        return post.category.toLowerCase().includes(maincategory.toLowerCase());
      });

      const filteredBySearchPosts = filteredByCategoryPosts?.filter(
        (post: PostType) => {
          return post.thought.toLowerCase().includes(search.toLowerCase());
        }
      );
      return (
        <main className="bg-white relative pt-20 w-screen min-h-screen max-sm:pb-10">
          <AuthNavbar />
          <div className="w-full h-[1px] bg-gray-200"></div>
          <div className="w-full flex justify-center sm:px-14 md:px-20 px-6 py-10 bg-black">
            <div className="w-full flex items-center p-4 max-sm:py-2 gap-2 rounded-md sm:rounded-2xl bg-white ">
              <BsSearch className="text-gray-700" />
              <input
                type="text"
                onChange={(e: any) => setSearch(e.target.value)}
                className="text-black w-[80%] outline-none sm:text-xl"
                placeholder="Search for your favorite thoughts.."
              />
            </div>
          </div>
          <div className="w-full flex gap-4 items-center scrollbar-hide overflow-x-scroll mt-6 sm:px-40 md:px-20 px-6">
            <button
              onClick={() => {
                switchCategory("");
              }}
              className={`${
                maincategory == "" ? "bg-black" : "text-black bg-white"
              } py-2 px-6 rounded-full sm:text-xl tracking-wide`}
            >
              All
            </button>
            {categories.map((category: string) => {
              const activeCategory = category == maincategory;
              return (
                <button
                  key={category}
                  onClick={() => {
                    switchCategory(category);
                  }}
                  className={`${
                    activeCategory ? "bg-black" : "text-black bg-white"
                  } py-2 px-6 rounded-full sm:text-xl tracking-wide`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <section className="w-full flex mt-10 px-4 flex-wrap sm:gap-8 items-start justify-center">
            {filteredBySearchPosts.length > 0 ? (
              filteredBySearchPosts.map((post: PostType) => (
                <Post
                  key={post.thought}
                  category={post.category}
                  thought={post.thought}
                  username={post.username}
                  isVerified={post.isVerified}
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
      return <Error message={postsError.message} />;
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

export default Search;
