"use client";

// import Image from "next/image";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";

export default function Userprofile() {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:3003/user/me", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("User data fetching error");
      }
      const userData = await response.json();
      setCurrentUser(userData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="">
        {/* <Image
          src="/instagram_logo.svg"
          alt="Instagram logo"
          fill
          priority
          className="object-contain"
        ></Image> */}
        <div>
          <div>{currentUser?.username}</div>
          <button>{currentUser?.posts} posts</button>
          <button>{currentUser?.followers} followers</button>
          <button>{currentUser?.followings} followings</button>
        </div>
      </div>
    </Layout>
  );
}
