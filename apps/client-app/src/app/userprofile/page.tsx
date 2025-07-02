"use client";

import Image from "next/image";
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center border-b border-gray-200 pb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-200 mr-10">
            <Image
              src="/default-avatar.png"
              alt="User avatar"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center mb-4">
              <h1 className="text-2xl font-light mr-4">
                {currentUser?.username}
              </h1>
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded text-sm font-medium">
                Edit Profile
              </button>
            </div>

            <div className="flex space-x-8 mb-4">
              <button className="text-sm">
                <span className="font-semibold">{currentUser?.posts || 0}</span>{" "}
                posts
              </button>
              <button className="text-sm">
                <span className="font-semibold">
                  {currentUser?.followers || 0}
                </span>{" "}
                followers
              </button>
              <button className="text-sm">
                <span className="font-semibold">
                  {currentUser?.followings || 0}
                </span>{" "}
                following
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center border-t border-gray-200 mt-4">
          <button className="flex items-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-black">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            POSTS
          </button>
        </div>
      </div>
    </Layout>
  );
}
