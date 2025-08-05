"use client";
import Assistant from "@/components/assistant";
import ToolsPanel from "@/components/tools-panel";
import PlatformHeader from "@/components/platform-header";
import useAuthStore from "@/stores/useAuthStore";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Main() {
  const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(false);
  const { userEmail, signIn, signOut } = useAuthStore();
  
  // For development, show dev flag to determine if tools panel should be visible
  const isDev = process.env.NODE_ENV === "development" || false;

  return (
    <div className="flex flex-col h-screen">
      <PlatformHeader 
        userEmail={userEmail || undefined}
        onSignIn={signIn}
        onSignOut={signOut}
      />
      <div className="flex flex-1">
        <div className="w-full md:w-[70%]">
          <Assistant />
        </div>
        {isDev && (
          <div className="hidden md:block w-[30%]">
            <ToolsPanel />
          </div>
        )}
      </div>
      {/* Development tools - hamburger menu for small screens */}
      {isDev && (
        <>
          <div className="absolute top-20 right-4 md:hidden">
            <button onClick={() => setIsToolsPanelOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
          {/* Overlay panel for ToolsPanel on small screens */}
          {isToolsPanelOpen && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
              <div className="w-full bg-white h-full p-4">
                <button className="mb-4" onClick={() => setIsToolsPanelOpen(false)}>
                  <X size={24} />
                </button>
                <ToolsPanel />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
