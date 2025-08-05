"use client";
import Assistant from "@/components/assistant";
import ToolsPanel from "@/components/tools-panel";
import PlatformHeader from "@/components/platform-header";
import useAuthStore from "@/stores/useAuthStore";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Main() {
  const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | null>(null);
  const { userEmail, signIn, signOut } = useAuthStore();
  
  // For development, show dev flag to determine if tools panel should be visible
  const isDev = process.env.NODE_ENV === "development" || false;

  // Extract query parameter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setInitialQuery(query);
      // Clean up URL without reloading
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <PlatformHeader 
        userEmail={userEmail || undefined}
        onSignIn={signIn}
        onSignOut={signOut}
      />
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-4xl">
          <Assistant initialQuery={initialQuery} />
        </div>
        {isDev && (
          <div className="fixed top-20 right-4 z-10">
            <button
              onClick={() => setIsToolsPanelOpen(true)}
              className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
            >
              <Menu size={20} />
            </button>
          </div>
        )}
      </div>
      {/* Development tools overlay */}
      {isDev && isToolsPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
          <div className="w-full max-w-md bg-white h-full p-4">
            <button className="mb-4" onClick={() => setIsToolsPanelOpen(false)}>
              <X size={24} />
            </button>
            <ToolsPanel />
          </div>
        </div>
      )}
    </div>
  );
}
