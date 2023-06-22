import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { getTrackspotifyURL, searchTracks } from "../../functions/Pages/Posts";
const Search = ({
  setShow,
  setSelectedTrack,
}: {
  setShow: any;
  setSelectedTrack: any;
}) => {
  const [tracks, setTracks] = useState<any>();
  return (
    <div className="rounded-xl pb-4 overflow-y-hidden shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] max-h-96 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:w-96 w-[80%]  bg-white px-2 py-4 z-[500000000]">
      <div className="flex items-center justify-center relative pb-4 border-b-gray-200 border-b-[1px]">
        <p className="text-gray-800">Add Song</p>
        <button className="absolute right-2" onClick={() => setShow(false)}>
          <IoMdClose className="text-pry text-xl" />
        </button>
      </div>
      <div className="relative w-full flex my-4 py-2  rounded-3xl px-4 bg-gray-100">
        <input
          type="text"
          onChange={(e) => searchTracks(e.target.value, setTracks)}
          className="w-full text-gray-800 rounded-3xl bg-gray-100 outline-none"
        />
        <BiSearch className="text-pry absolute text-lg right-2 top-3" />
      </div>
      <div
        className={`flex flex-col overflow-y-scroll ${
          tracks?.length > 0 && "h-80 pb-14"
        }`}
      >
        {tracks?.map((track: any) => {
          return (
            <button
              key={track.id}
              onClick={async () => {
                const spotifyURL = await getTrackspotifyURL(track.id);
                setSelectedTrack({ track, spotifyURL });
                console.log(spotifyURL);
                setShow(false);
              }}
              className="w-full flex gap-2 items-center h-[70px] py-2 border-b-[1px] border-b-gray-300"
            >
              <img
                src={track.album.images[0].url}
                alt=""
                className="h-full rounded-md"
              />
              <div className="h-[70%] items-start flex flex-col justify-around">
                <span className="text-gray-800 text-sm font-medium">
                  {track.name}
                </span>
                <span className="text-gray-500 text-xs font-medium">
                  {track.artists[0].name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
