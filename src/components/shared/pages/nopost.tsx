const NoPost = () => {
  return (
    <div className="w-full bg-gray-50 rounded-md py-10 flex flex-col font-quote items-center">
      <h1 className="text-black font-medium text-xl">No quotes yet 😔</h1>
      <span className="text-gray-500 my-2">Click the button below to: 👇🏽</span>
      <button className="bg-pry px-4 py-2 text-sm font-semibold rounded-md">
        <a href="/minder/addpost" className="hover:underline">
          Add Quote
        </a>
      </button>
    </div>
  );
};

export default NoPost;
