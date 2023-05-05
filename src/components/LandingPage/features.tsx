import { LandingPageFeatures } from "../../types/LandingPage/index";

const FeaturesComp = ({
  headline,
  title,
  text,
  buttonText,
  reverse,
}: LandingPageFeatures) => {
  return (
    <section
      className={`flex ${
        reverse && "flex-row-reverse"
      } flex-wrap w-full md:px-20 sm:px-14 px-8 my-8 items-center`}
    >
      <div className={`w-[50%]`}></div>
      <div className={`md:w-[50%] w-full space-y-4`}>
        <span className="text-sm font-light">{headline}</span>
        <h1 className="sm:text-6xl text-4xl font-semibold">{title}</h1>
        <p className="text-gray-400">{text}</p>
        <button className="px-8 py-3 rounded-md bg-pry hover:underline">
          <a href="">{buttonText}</a>
        </button>
      </div>
    </section>
  );
};

export default FeaturesComp;
