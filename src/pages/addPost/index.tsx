import { useContext, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import AuthNavbar from "../../components/shared/AuthNavbar";
import { UserContext } from "../../contexts/UserContext";
import { categories } from "../../utils/constants";

const AddPost = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  const [quote, setQuote] = useState<string>("");

  const [loading, setloading] = useState<boolean>(false);
  return (
    <main className="bg-white relative pt-20 w-screen min-h-screen max-sm:pb-6">
      <AuthNavbar />
      <div className="w-full h-[1px] bg-gray-200"></div>
      <section className="w-full px-6 flex justify-center mt-10">
        <div className="flex items-center rounded-lg justify-center flex-col border-[1px] border-gray-200 w-full sm:w-[75%] md:w-[60%]">
          <textarea
            name=""
            id=""
            cols={30}
            maxLength={220}
            rows={10}
            onChange={(e: any) => setQuote(e.target.value)}
            placeholder="Write your quote..."
            className="bg-gray-200 rounded-t-lg outline-none font-semibold font-quote w-full text-center p-10 sm:text-3xl text-2xl md:text-4xl h-80 text-gray-700"
          ></textarea>
          <span className="ml-auto text-black font-light text-sm pr-8">
            {quote.length}/220
          </span>
          <div className="flex max-sm:gap-4 flex-wrap w-full justify-between p-5 px-4 sm:px-8">
            <div className="sm:w-[48%] w-full">
              <label className="text-gray-900 font-medium text-sm">
                Music (Spotify)
              </label>
              <textarea
                className="border-[1px] mt-1 w-full text-gray-800 rounded-md p-2 outline-none"
                cols={30}
                rows={4}
              ></textarea>
            </div>
            <div className="sm:w-[48%] w-full max-sm:gap-4 flex flex-col justify-between">
              <label className="text-gray-900 font-medium text-sm">
                Category
              </label>
              <div className="border-[1px] py-1 mt-1 rounded-md flex justify-center">
                <select className="outline-none text-black">
                  <option value="">Select Category</option>
                  {categories.map((category: string) => (
                    <option
                      value={category}
                      key={category}
                      className="text-center"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setloading(!loading)}
                className="bg-pry w-full flex justify-center py-4 font-medium rounded-md my-2"
              >
                {!loading ? (
                  "Publish Quote"
                ) : (
                  <VscLoading className="animate-spin text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddPost;
