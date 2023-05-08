import { addDoc, collection, getDocs } from "firebase/firestore";
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
      });
    });
    setPosts(allPosts);
  } catch (error) {
    setPostsError(error);
  }
};

export const addPost = (post: PostType) => {
  addDoc(postsRef, post)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
