import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";

const postsRef = collection(db, "posts");
export const getAllPosts = () => {
  const posts = getDocs(postsRef).then((val) => console.log(val));
  console.log(auth.currentUser);
};
