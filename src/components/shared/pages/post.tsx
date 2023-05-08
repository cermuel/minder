import { useRef, useState } from "react";
import { PostType } from "../../../types/components/pages/post";
import logosmall from "../../../assets/logosmall.png";
import logo from "../../../assets/logo.png";
import { FaSpotify } from "react-icons/fa";
import { BiShare } from "react-icons/bi";
import { MdRecordVoiceOver } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import {
  handleSaveImage,
  shareQuote,
  textToSpeech,
} from "../../../functions/Pages";
import { MdVerified } from "react-icons/md";

const Post = (post: PostType) => {
  const quoteCard = useRef<HTMLDivElement>(null);
  const [voice, changeVoice] = useState(0);

  return (
    <div
      ref={quoteCard}
      className="w-[400px] my-4 max-sm:w-full rounded-xl bg-white border-[2px] p-5 border-gray-200"
    >
      <div className="flex space-x-2 items-center">
        <img src={logosmall} alt="" className="w-10" />
        <p className="text-white my text-xs font-medium rounded-md px-1 py-[2px] bg-pry">
          {post.category}
        </p>
      </div>
      <p className="text-black my-4 text-2xl font-medium font-quote">
        {post.quote}
      </p>
      <div className="w-full flex items-center justify-between ">
        <span>
          <img src={logo} className="w-24" alt="" />
        </span>
        <button className="text-black flex items-center hover:underline hover:text-pry text-sm">
          @{post.username}
          {post.isVerified && <MdVerified className="text-pry" />}
        </button>
      </div>
      <div className="flex items-center gap-4 w-full justify-center relative">
        <button>
          <FaSpotify className="text-[#1DB954] cursor-pointer text-lg" />
        </button>
        <button onClick={() => shareQuote(post.quote)}>
          <BiShare className="text-gray-700 cursor-pointer text-lg" />
        </button>
        <button
          className="p-3 rounded-lg bg-gray-800 cursor-pointer"
          onClick={() => textToSpeech(post.quote, voice)}
        >
          <img src={logosmall} alt="" className="w-7" />
        </button>
        <button className="flex items-center relative space-x-1">
          <MdRecordVoiceOver className="text-pry" />
          <select
            id=""
            onChange={(e: any) => changeVoice(e.target.value)}
            className="absolute outline-none cursor-pointer text-pry w-2 right-[-2px]"
          >
            <option value={0}>English (Default)</option>
            <option value={67}>English (Girl)</option>
            <option value={133}>French</option>
            <option value={81}>Spanish</option>
            <option value={2}>Italian</option>
            <option value={39}>Sing</option>
          </select>
        </button>
        <button onClick={() => handleSaveImage(quoteCard, post)}>
          <BsImage className="text-pry" />
        </button>
      </div>
    </div>
  );
};

export default Post;
