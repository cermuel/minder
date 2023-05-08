import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { Dispatch } from "react";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { auth } from "../../config/firebase";
import { LoginType, RegisterType } from "../../types/auth";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
export const registerWithDetails = ({
  details,
  setisLoading,
  navigate,
}: {
  details: RegisterType;
  setisLoading: Dispatch<boolean>;
  navigate: NavigateFunction;
}) => {
  setisLoading(true);
  if (
    details.email &&
    details.photoURL &&
    details.password &&
    details.fullName
  ) {
    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: details.fullName,
            photoURL: details.photoURL,
          });
        }
        setisLoading(false);
        toast.success("Account successfully created");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      })
      .catch((err: any) => {
        setisLoading(false);
        toast.error(err.message);
        console.log(err);
      });
  } else {
    setisLoading(false);
    toast.error("Please fill in all details");
  }
};

export const registerWithGoogle = (navigate: NavigateFunction) => {
  signInWithPopup(auth, provider).then((authUser) => {
    navigate("/quotella/home");
    location.reload();
    localStorage.setItem(
      "user",
      JSON.stringify({
        fullName: authUser.user.displayName,
        email: authUser.user.email,
        isVerified: authUser.user.emailVerified,
        username: authUser.user.email
          ?.slice(0, authUser.user.email?.indexOf("@"))
          .trim(),
      })
    );
  });
};

export const isAuthenticated = () => {
  let isAuth: boolean;
  if (localStorage.getItem("user")) {
    isAuth = true;
    return isAuth;
  } else {
    isAuth = false;
    return isAuth;
  }
};
export const LoginWithDetails = ({
  details,
  setisLoading,
  navigate,
}: {
  details: LoginType;
  setisLoading: Dispatch<boolean>;
  navigate: NavigateFunction;
}) => {
  setisLoading(true);
  if (details.email && details.password) {
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then(async (authUser) => {
        setisLoading(false);
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/quotella/home");
        }, 2000);
        localStorage.setItem(
          "user",
          JSON.stringify({
            fullName: authUser.user.displayName,
            email: authUser.user.email,
            isVerified: authUser.user.emailVerified,
            username: authUser.user.email
              ?.slice(0, authUser.user.email?.indexOf("@"))
              .trim(),
          })
        );
      })
      .catch((err: any) => {
        setisLoading(false);
        toast.error(err.message);
        console.log(err);
      });
  } else {
    toast.error("Please fill in the details");
    setisLoading(false);
  }
};

export const LogoutUser = (navigate: any) => {
  signOut(auth)
    .then(() => {
      toast.success("Successfully logged out");
      localStorage.removeItem("user");
      navigate("/auth/login");
    })
    .catch((err: any) => toast.error(err));
};
