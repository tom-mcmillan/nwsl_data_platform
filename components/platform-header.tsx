"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface PlatformHeaderProps {
  userEmail?: string;
  onSignIn?: (email: string) => void;
  onSignOut?: () => void;
}

export default function PlatformHeader({
  userEmail,
  onSignIn,
  onSignOut,
}: PlatformHeaderProps) {
  const [email, setEmail] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && onSignIn) {
      onSignIn(email.trim());
      setEmail("");
      setIsSignInOpen(false);
    }
  };

  const handleDocsClick = () => {
    window.open("/docs", "_blank");
  };

  const handleLogoClick = () => {
    window.open("https://nwsldata.com", "_blank");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      {/* Logo */}
      <div 
        onClick={handleLogoClick}
        className="cursor-pointer"
      >
        <h1 className="text-xl font-semibold">
          <span className="text-blue-500">NWSL</span>{" "}
          <span className="text-black">Data</span>
        </h1>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        {/* Docs Button */}
        <Button
          variant="ghost"
          onClick={handleDocsClick}
          className="text-gray-600 hover:text-gray-800"
        >
          Docs
        </Button>

        {/* Auth Button */}
        {userEmail ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{userEmail}</span>
            <Button
              variant="outline"
              onClick={onSignOut}
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Sign in to NWSL Data</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">
                Free access • No password required
              </p>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
}