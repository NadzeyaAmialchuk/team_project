"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Dashboard = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: "home", label: "Home", path: "/" },
    { icon: "search", label: "Search", path: "/search" },
    { icon: "explore", label: "Explore", path: "/explore" },
    { icon: "reels", label: "Reels", path: "/reels" },
    { icon: "messages", label: "Messages", path: "/messages" },
    { icon: "notifications", label: "Notifications", path: "/notifications" },
    { icon: "create", label: "Create", path: "/create" },
    { icon: "profile", label: "Profile", path: "/profile" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-3 px-4 z-50">
        {navItems.slice(0, 5).map((item) => (
          <NavButton
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={isActive(item.path)}
            href={item.path}
          />
        ))}
      </div>

      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-64 flex-col items-center lg:items-start lg:px-6 py-6 bg-white border-r border-gray-200 z-50 space-y-6">
        <div className="relative w-44 h-14">
          <Image
            src="/instagram_logo.svg"
            alt="Instagram logo"
            width={100}
            height={40}
            priority
            className="object-contain"
          />
        </div>

        {navItems.map((item) => (
          <NavButton
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={isActive(item.path)}
            vertical
            fullWidth
            href={item.path}
          />
        ))}
      </div>
    </>
  );
};

type NavButtonProps = {
  icon: string;
  label: string;
  active?: boolean;
  vertical?: boolean;
  fullWidth?: boolean;
  href: string;
};

const NavButton = ({
  icon,
  label,
  active = false,
  vertical = false,
  fullWidth = false,
  href,
}: NavButtonProps) => {
  const getIcon = () => {
    const iconClass = `w-6 h-6 ${active ? "text-black" : "text-gray-600"}`;

    switch (icon) {
      case "home":
        return active ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={iconClass}
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        );
      case "search":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        );
      case "explore":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
            />
          </svg>
        );
      case "reels":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
            />
          </svg>
        );
      case "messages":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        );
      case "notifications":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        );
      case "create":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        );
      case "profile":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Link href={href} passHref>
      <div
        className={`flex ${vertical ? "flex-col lg:flex-row" : "flex-col"} items-center ${
          fullWidth ? "w-full" : ""
        } p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer ${
          active ? "font-semibold" : ""
        }`}
      >
        {getIcon()}
        <span
          className={`${vertical ? "mt-2 lg:mt-0 lg:ml-4" : "mt-1"} ${
            fullWidth ? "lg:block" : "hidden lg:block"
          } text-sm`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Dashboard;
