import axios from "axios";
import { toast } from "react-hot-toast";
import SpotifyWebApi from "spotify-web-api-js";
import { PostType } from "../../../types/components/pages/post";
import { BASEURL, getSingleUser } from "../../Auth";

export const getAllPosts = async (setPosts: any, setPostsError: any) => {
  let token = localStorage.getItem("token");
  try {
    const posts: any = await axios.get(`${BASEURL}/post`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let mainposts = await Promise.all(
      posts.data.posts.map(async (post: any) => {
        let user = await getSingleUser(post.createdBy);
        let { thought, category, spotifyURL } = post;
        return {
          thought,
          category,
          spotifyURL,
          username: user.username,
          isVerified: user.isVerified,
        };
      })
    );
    setPosts(mainposts);
  } catch (err: any) {
    setPostsError(err);
    console.log(err);
    toast.error(
      err?.response?.data?.message
        ? err.response.data.message
        : err.message
        ? err.message
        : `An error occurred`
    );
  }
};

export const addPost = async ({
  post,
  setLoading,
  navigate,
}: {
  post: PostType;
  setLoading: any;
  navigate: any;
}) => {
  setLoading(true);
  if (!post.spotifyURL) {
    toast.error("Please provide a song");
    setLoading(false);
  } else if (!post.thought) {
    toast.error("Please provide a quote");
    setLoading(false);
  } else if (!post.category) {
    toast.error("Please select a category");
    setLoading(false);
  } else {
    try {
      let token = localStorage.getItem("token");
      console.log(token);
      await axios.post(`${BASEURL}/post`, post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Post created successfully`);
      setTimeout(() => {
        navigate("/minder/home");
      }, 2000);
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      toast.error(
        err?.response?.data?.message
          ? err.response.data.message
          : err.message
          ? err.message
          : `An error occurred`
      );
      setLoading(false);
    }
  }
};

const spotifyApi = new SpotifyWebApi();

export async function searchTracks(
  query: string,
  setTracks: any
): Promise<SpotifyApi.TrackObjectFull[]> {
  const accessToken = await getAccessToken();
  spotifyApi.setAccessToken(accessToken);
  const results = await spotifyApi.searchTracks(query);
  setTracks(results.tracks.items);
  return results.tracks.items;
}

export async function getTrackspotifyURL(trackId: string): Promise<string> {
  // const accessToken = await getAccessToken();
  return `https://open.spotify.com/embed/track/${trackId}?uri=spotify:track:${trackId}&theme=0`;
}

export async function getAccessToken(): Promise<string> {
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
          import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
        }`
      )}`,
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
}
