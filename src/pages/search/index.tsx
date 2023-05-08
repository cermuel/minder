import { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import AuthNavbar from "../../components/shared/AuthNavbar";
import NoPost from "../../components/shared/pages/nopost";
import Post from "../../components/shared/pages/post";
import { PostType } from "../../types/components/pages/post";
import { demoPosts } from "../../utils/helpers/Home";
import { categories } from "../../utils/constants";
import { UserContext } from "../../contexts/UserContext";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [maincategory, switchCategory] = useState<string>("");
  const { user } = useContext(UserContext);

  const filteredByCategoryPosts = demoPosts.filter((post: PostType) => {
    return post.category.toLowerCase().includes(maincategory.toLowerCase());
  });

  const filteredBySearchPosts = filteredByCategoryPosts.filter(
    (post: PostType) => {
      return post.quote.toLowerCase().includes(search.toLowerCase());
    }
  );
  if (user) {
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
              placeholder="Search for your favorite quotes.."
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
                key={post.quote}
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
  }
};

export default Search;
