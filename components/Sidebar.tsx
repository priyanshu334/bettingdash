"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, ChevronLeft, ChevronRight, User, 
  Users, PlusCircle, DollarSign, Zap, BarChart2, 
  LogOut, Settings
} from "lucide-react";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close sidebar on route change in mobile view
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: "Add Player", path: "/", icon: <PlusCircle size={20} /> },
    { name: "Add Member", path: "/member", icon: <User size={20} /> },
    { name: "Money", path: "/money", icon: <DollarSign size={20} /> },
    { name: "Bets", path: "/bets", icon: <Zap size={20} /> },
    { name: "Data", path: "/data", icon: <BarChart2 size={20} /> },
    { name: "Members", path: "/members", icon: <Users size={20} /> },
    { name: "Users", path: "/users", icon: <User size={20} /> },
    { name: "Logout", path: "/login", icon: <LogOut size={20} /> }
  ];

  return (
    <>
      {/* Hamburger for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-orange-500 text-white p-2 rounded-lg shadow-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? "w-20" : "w-72"} 
          ${isMobileOpen ? "block fixed z-40" : "hidden md:flex"} 
          top-0 left-0 h-screen bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 shadow-xl 
          transition-all duration-300 ease-in-out flex-col md:relative
        `}
      >
        {/* Close Button for Mobile */}
        <div className="flex justify-end md:hidden p-4">
          <button 
            onClick={() => setIsMobileOpen(false)} 
            className="text-white bg-orange-600 hover:bg-orange-700 p-1 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo Section */}
        <div className="flex items-center justify-center py-6 px-2">
          <div className={`flex items-center space-x-2 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="flex-shrink-0 bg-white rounded-full p-2">
              <div className="text-orange-600 text-2xl font-bold">
                🏏
              </div>
            </div>
            {!isCollapsed && (
              <div className="text-white font-bold text-xl">Saffron Exch</div>
            )}
          </div>
        </div>

        {/* Toggle Collapse Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-12 bg-white text-orange-600 hover:text-orange-700 p-1 rounded-full shadow-lg border border-orange-300 hidden md:flex items-center justify-center"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center pt-4 pb-8 border-b border-orange-400/30">
          <div className="relative group">
            <div className={`${isCollapsed ? "w-12 h-12" : "w-20 h-20"} bg-white rounded-full shadow-lg transition-all duration-300 overflow-hidden border-4 border-orange-300`}>
              <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
                <User size={isCollapsed ? 24 : 40} className="text-white" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="mt-4 text-center">
                <p className="text-white font-bold text-lg">Admin User</p>
                <div className="flex items-center justify-center space-x-1 bg-orange-800 bg-opacity-30 px-3 py-1 rounded-full mt-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <p className="text-orange-100 text-xs">Online</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-6 px-3 overflow-y-auto scrollbar-hide">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link href={item.path} key={item.name}>
                  <div
                    className={`
                      group relative
                      ${isCollapsed ? "justify-center px-2" : "justify-start px-4"} 
                      ${isActive 
                        ? "bg-white text-orange-600 shadow-md" 
                        : "text-white hover:bg-orange-400/30"
                      } 
                      py-3 rounded-xl flex items-center transition-all duration-200
                      font-medium
                    `}
                  >
                    <div className={`
                      ${isActive ? "text-orange-600" : "text-white"}
                      ${isCollapsed ? "mx-auto" : ""}
                    `}>
                      {item.icon}
                    </div>
                    
                    {!isCollapsed && (
                      <span className="ml-3">
                        {item.name}
                      </span>
                    )}
                    
                    {/* Hover tooltip for collapsed mode */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 rounded-md px-2 py-1 bg-orange-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                        {item.name}
                      </div>
                    )}
                    
                    {isActive && !isCollapsed && (
                      <div className="ml-auto">
                        <ChevronRight size={16} />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* IPL Season Info */}
        {!isCollapsed && (
          <div className="px-4 py-3 mx-3 mb-4 bg-orange-800 bg-opacity-30 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white text-sm font-semibold">IPL 2025</h4>
                <p className="text-orange-200 text-xs">Season 18 Live</p>
              </div>
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <Zap size={18} className="text-white" />
              </div>
            </div>
            <div className="mt-2 w-full bg-orange-700 bg-opacity-50 rounded-full h-1.5">
              <div className="bg-white h-1.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto border-t border-orange-400/30 p-4">
          <div className={`flex ${isCollapsed ? "justify-center" : "justify-between"} items-center text-white`}>
            {!isCollapsed && <span className="text-sm text-orange-100">© 2025 Saffron Exch</span>}
            <div className="flex space-x-2">
              <button className="hover:text-orange-200 bg-orange-600 p-1.5 rounded-lg">
                <Settings size={isCollapsed ? 18 : 16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dim background when sidebar is open on mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;