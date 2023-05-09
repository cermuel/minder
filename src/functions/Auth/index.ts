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
import { auth, storage } from "../../config/firebase";
import { LoginType, RegisterType } from "../../types/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const convertToBase64 = (e: any, setValue: any) => {
  let file = e.target.files[0];
  // Make new FileReader
  let reader = new FileReader();

  // Convert the file to base64 text
  reader.readAsDataURL(file);

  // on reader load somthing...
  reader.onload = () => {
    // Make a fileInfo Object
    let fileInfo = {
      name: file.name,
      type: file.type,
      size: Math.round(file.size / 1000) + " kB",
      base64: reader.result,
      file: file,
    };
    setValue(fileInfo.base64);
  };
};

const provider = new GoogleAuthProvider();
export const registerWithDetails = async ({
  details,
  setisLoading,
  navigate,
  file,
}: {
  details: RegisterType;
  setisLoading: Dispatch<boolean>;
  navigate: NavigateFunction;
  file: any;
}) => {
  setisLoading(true);
  if (details.email && file && details.password && details.fullName) {
    const refName = details.email?.slice(0, details.email?.indexOf("@")).trim();
    const imageRef = ref(storage, refName);
    await uploadBytes(imageRef, file);
    let imageLink: string;
    await getDownloadURL(imageRef).then((url: string) => {
      imageLink = url;
    });

    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: details.fullName,
            photoURL: imageLink,
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
    navigate("/minder/home");
    location.reload();
    localStorage.setItem(
      "user",
      JSON.stringify({
        fullName: authUser.user.displayName,
        email: authUser.user.email,
        isVerified: authUser.user.emailVerified,
        photoUrl: authUser.user.photoURL,
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
          navigate("/minder/home");
        }, 2000);
        localStorage.setItem(
          "user",
          JSON.stringify({
            fullName: authUser.user.displayName,
            email: authUser.user.email,
            isVerified: authUser.user.emailVerified,
            photoUrl: authUser.user.photoURL,
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

export const VerifyAccount = async () => {
  toast.success("Submission Received");
};

export const UpdateProfile = async (fullName: string, setloading: any) => {
  setloading(true);
  if (auth.currentUser) {
    if (fullName) {
      await updateProfile(auth.currentUser, { displayName: fullName })
        .then(() => {
          setloading(false);
          toast.success("Profile updated successfully");
          if (auth.currentUser) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                fullName: auth?.currentUser.displayName,
                email: auth?.currentUser.email,
                isVerified: auth?.currentUser.emailVerified,
                photoUrl: auth?.currentUser.photoURL,
                username: auth?.currentUser.email
                  ?.slice(0, auth?.currentUser.email?.indexOf("@"))
                  .trim(),
              })
            );
          }
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch(() => {
          toast.error("An error occurred");
        });
    } else {
      setloading(false);
      toast.error("Please fill in the details");
    }
  }
};
