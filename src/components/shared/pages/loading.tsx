import logo from "../../../assets/logosmall.png";

const Loading = () => {
  return (
    <main className="w-screen h-screen bg-white flex flex-col justify-center items-center">
      <div>
        <img src={logo} className="animate-myspin w-20" alt="" />
        <p className="font-quote font-semibold text-pry text-xl mt-2">
          Loading
          <span className="animate-ping">...</span>
        </p>
      </div>
    </main>
  );
};

export default Loading;
