"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  User2,
  FileText,
  LayoutDashboard,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Wallet,
  History,
  ClipboardList,
  MoveRight,
  MoveLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type MenuItem = {
  icon: React.ElementType;
  label: string;
};

interface RootLayoutProps {
  children: React.ReactNode;
  activeMenuItemName: string;
}

const mainMenuItems: MenuItem[] = [
  { icon: Home, label: "Home" },
  { icon: User2, label: "Profile" },
  { icon: FileText, label: "Documents" },
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Calendar, label: "Calendar" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
  { icon: LogOut, label: "Logout" },
];

const homeSubMenuItems: MenuItem[] = [
  { icon: User2, label: "Face Recognition" },
  { icon: ClipboardList, label: "Daily Visit" },
  { icon: Wallet, label: "Donate" },
  { icon: LayoutDashboard, label: "Work Orders" },
  { icon: FileText, label: "Reports" },
  { icon: History, label: "Report History" },
  { icon: Calendar, label: "Test History" },
  { icon: Calendar, label: "Calendar" },
];

export default function Layout({ children, activeMenuItemName }: RootLayoutProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string>("Home");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) null;
  return (
    <div className="flex h-screen">
      {/* Main Sidebar */}
      <aside className={`flex w-16 h-100 flex-col bg-white border-r`}>
        {/* Logo/Avatar Section */}
        <div className="relative flex h-20 items-center justify-center border-b">
          <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-200">
            <Image
              src="/user-avatar.png"
              alt=""
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-2 space-y-2">
          <div className="my-2 flex justify-center items-center">
            {isCollapsed ? (
              <MoveRight
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-5 w-5 cursor-pointer"
                color="gray"
              />
            ) : (
              <MoveLeft
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-5 w-5 cursor-pointer"
                color="gray"
              />
            )}
          </div>

          {mainMenuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-start hover:bg-gray-100 gap-12 p-2.5 rounded-md ${
                item.label === activeMenuItem
                  ? "bg-emerald-50 text-emerald-600 hover:text-emerald-600"
                  : ""
              }`}
              onClick={() => setActiveMenuItem(item.label)}
            >
              <item.icon className="h-5 w-5 shrink-0" />
            </button>
          ))}
        </nav>

        {/* Collapse Toggle Button */}
      </aside>

      {/* Sub-Sidebar */}
      <aside
        className={`bg-white border-r transition-all duration-500 ease-in-out ${
          isCollapsed ? "w-0" : "w-72"
        }`}
      >
        <div className="px-2 py-4">
          <nav className="space-y-2">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold">{activeMenuItem}</h2>
            )}
            <div className="pt-6">
              {!isCollapsed ? (
                homeSubMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 hover:bg-gray-100 rounded-md
                    ${
                      item.label === activeMenuItemName
                        ? "bg-emerald-50 text-emerald-600 hover:text-emerald-600"
                        : ""
                    }`}
                  >
                    <button
                      key={index}
                      className="w-full flex items-center justify-start gap-4"
                      
                    >
                      {item.label === "Calendar" ? (
                        <Link href="/calendar">
                          <div className="flex gap-4">
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span>{item.label}</span>
                          </div>
                          </Link>
                      ) : (
                        <Link href='/'>
                          <div className="flex gap-4">
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span>{item.label}</span>
                          </div>
                        </Link>
                      )}
                    </button>
                    <div>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </nav>
        </div>
      </aside>

      <main className="w-full">{children}</main>
    </div>
  );
}
