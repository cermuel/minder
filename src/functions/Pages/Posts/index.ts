import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-hot-toast";
import SpotifyWebApi from "spotify-web-api-js";
import { db } from "../../../config/firebase";
import { PostType } from "../../../types/components/pages/post";

const postsRef = collection(db, "posts");

export const getAllPosts = async (setPosts: any, setPostsError: any) => {
  const posts = await getDocs(postsRef);
  const allFakePosts: any = [];
  const allPosts: PostType[] = [];
  try {
    posts.docs.map((chat: any) => {
      allFakePosts.push(chat._document.data.value.mapValue.fields);
    });
    allFakePosts.map((post: any) => {
      allPosts.push({
        username: post.username.stringValue,
        isVerified: post.isVerified.booleanValue,
        quote: post.quote.stringValue,
        category: post.category.stringValue,
        embedUrl: post.embedUrl.stringValue,
      });
    });
    setPosts(allPosts);
  } catch (error) {
    setPostsError(error);
  }
};

export const addPost = ({
  post,
  setLoading,
  navigate,
}: {
  post: PostType;
  setLoading: any;
  navigate: any;
}) => {
  setLoading(true);
  if (!post.embedUrl) {
    toast.error("Please provide a song");
    setLoading(false);
  } else if (!post.quote) {
    toast.error("Please provide a quote");
    setLoading(false);
  } else if (!post.category) {
    toast.error("Please select a category");
    setLoading(false);
  } else {
    addDoc(postsRef, post)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success("Successfully posted");
        setTimeout(() => {
          navigate("/quotella/home");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("An error occurred");
      });
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

export async function getTrackEmbedUrl(trackId: string): Promise<string> {
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
