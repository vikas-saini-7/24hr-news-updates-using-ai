"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  IconHome,
  IconArticle,
  IconInfoCircle,
  IconMail,
  IconSettings,
  IconLogout,
  IconCaretLeftFilled,
  IconFlame,
  IconBookmark,
} from "@tabler/icons-react";

const navigations = [
  { name: "Feed", href: "/feed", icon: IconHome },
  { name: "AI Summary", href: "/feed/ai-summary", icon: IconArticle },
  { name: "Top Stories", href: "/feed/top-stories", icon: IconFlame },
  { name: "Saved Articles", href: "/feed/saved", icon: IconBookmark },
];

const bottomNavigations = [
  { name: "About", href: "/about", icon: IconInfoCircle },
  { name: "Contact", href: "/contact", icon: IconMail },
  { name: "Settings", href: "/feed/settings", icon: IconSettings },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const linkClasses = (href: string) => {
    const isActive =
      href === "/feed" ? pathname === "/feed" : pathname.startsWith(href);

    return `flex items-center gap-3 py-2 px-4 rounded-xl text-sm transition ${
      isActive
        ? "bg-gray-500/10 text-white font-medium"
        : "text-white/60 hover:bg-gray-500/10 hover:text-white"
    }`;
  };

  return (
    <div
      className={`w-[300px] h-screen bg-gray-500/10 p-6 flex flex-col justify-between relative transition-all duration-400 ${
        sidebarOpen ? "ml-0" : "-ml-[300px]"
      }`}
    >
      <button
        className="absolute z-20 top-3 -right-14 w-12 h-11 bg-gray-500/10 flex items-center justify-center rounded-xl cursor-pointer hover:bg-gray-500/20 transition"
        onClick={toggleSidebar}
      >
        <IconCaretLeftFilled
          className={`${
            sidebarOpen ? "rotate-0" : "-rotate-180"
          } text-white/60 transition-transform duration-400`}
        />
      </button>

      {/* Top section */}
      <div>
        <div className="mb-6 mt-2 px-4 font-bold">LOGO</div>
        <nav>
          <ul>
            {navigations.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={linkClasses(item.href)}>
                  <item.icon size={20} stroke={1.5} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom section */}
      <nav>
        <ul>
          {bottomNavigations.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className={linkClasses(item.href)}>
                <item.icon size={20} stroke={1.5} />
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <a
              className="flex items-center gap-3 py-2 px-4 rounded-xl text-white/60 text-sm transition hover:bg-red-500/10 hover:text-red-500 cursor-pointer"
              href="#"
            >
              <IconLogout size={20} stroke={1.5} />
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
