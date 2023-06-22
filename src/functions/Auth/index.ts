import { Dispatch } from "react";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { LoginType, RegisterType } from "../../types/auth";
import axios, { AxiosError } from "axios";

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

export const BASEURL = import.meta.env.VITE_BASE_URL;

let token = localStorage.getItem("token");

export const registerWithDetails = async ({
  details,
  setisLoading,
  navigate,
}: {
  details: RegisterType;
  setisLoading: Dispatch<boolean>;
  navigate: NavigateFunction;
}) => {
  setisLoading(true);
  if (details.email && details.email.length > 19) {
    toast.error("Email must be max 20 characters");
    setisLoading(false);
  } else if (details.email && details.email.length <= 3) {
    toast.error("Email must be more than 3 characters");
    setisLoading(false);
  } else if (details.username && details.username.length <= 3) {
    toast.error("Username must be more than 3 characters");
    setisLoading(false);
  } else if (details.email && details.email.length > 11) {
    toast.error("Usrename must be max 12 characters");
    setisLoading(false);
  } else if (
    details.email &&
    details.name &&
    details.username &&
    details.password &&
    details.profilePicture
  ) {
    try {
      await axios.post(`${BASEURL}/user/register`, details);
      setisLoading(false);

      toast.success("Account successfully created");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err: AxiosError | any) {
      setisLoading(false);
      toast.error(
        err?.response?.data?.message
          ? err.response.data.message
          : err.message
          ? err.message
          : `An error occurred`
      );
      console.log(err);
    }
  } else {
    setisLoading(false);
    toast.error("Please fill in all details");
  }
};

export const isAuthenticated = () => {
  let isAuth: boolean;
  if (localStorage.getItem("logout")) {
    isAuth = true;
    return isAuth;
  } else {
    isAuth = false;
    return isAuth;
  }
};

export const LoginWithDetails = async ({
  details,
  setisLoading,
  navigate,
}: {
  details: LoginType;
  setisLoading: Dispatch<boolean>;
  navigate: NavigateFunction;
}) => {
  setisLoading(true);
  if (details.usernameORemail && details.password) {
    try {
      const user = await axios.post(`${BASEURL}/user/login`, details);
      setisLoading(false);
      let token = user.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      toast.success("Login successfull!");
      setTimeout(() => {
        navigate("/minder/home");
      }, 2000);
    } catch (err: AxiosError | any) {
      setisLoading(false);
      toast.error(
        err?.response?.data?.message
          ? err.response.data.message
          : err.message
          ? err.message
          : `An error occurred`
      );
      console.log(err);
    }
  } else {
    toast.error("Please fill in the details");
    setisLoading(false);
  }
};

export const LogoutUser = (navigate: any) => {
  localStorage.removeItem("token");
  setTimeout(() => {
    navigate("/auth/login");
  }, 2000);
  toast.success("Successfully logged out");
};

export const getSingleUser = async (id: string) => {
  try {
    const user = await axios.get(`${BASEURL}/admin/users/${id}`);
    console.log(user);
    return user.data.user;
  } catch (err: any) {
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

export const GetMyPosts = async ({
  setPosts,
  setPostsError,
}: {
  setPosts: any;
  setPostsError: any;
}) => {
  try {
    const posts = await axios.get(`${BASEURL}/post/me/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(posts.data.posts);
  } catch (err: any) {
    console.log(err);
    setPostsError(
      err?.response?.data?.message
        ? err.response.data.message
        : err.message
        ? err.message
        : `An error occurred`
    );
    toast.error(
      err?.response?.data?.message
        ? err.response.data.message
        : err.message
        ? err.message
        : `An error occurred`
    );
  }
};

export const GetCurrentUser = async ({
  setUser,
  setIsLoading,
}: {
  setUser: any;
  setIsLoading: any;
}) => {
  setIsLoading(true);
  try {
    const user = await axios.get(`${BASEURL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(user.data.user);
    setIsLoading(false);
  } catch (err: AxiosError | any) {
    setIsLoading(false);
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

export const VerifyAccount = async ({
  setIsLoading,
  userid,
  username,
}: {
  userid: string;
  username: string;
  setIsLoading: Dispatch<boolean>;
}) => {
  setIsLoading(true);
  try {
    const request = await axios.post(
      `${BASEURL}/user/verify`,
      { userid, username },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(request);
    toast.success(request.data.message);
    setIsLoading(false);
  } catch (err: any) {
    setIsLoading(false);
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

export const UpdateProfile = async (name: string, setloading: any) => {
  setloading(true);
  if (name) {
    try {
      const user = await axios.patch(
        `${BASEURL}/user/edit`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`User successfully updated`);
      location.reload();
      setloading(false);
      console.log(user);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message
          ? err.response.data.message
          : err.message
          ? err.message
          : `An error occurred`
      );
      setloading(false);
    }
  } else {
    setloading(false);
    toast.error(`Name is required`);
  }
};
