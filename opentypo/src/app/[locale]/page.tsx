"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import Landing from "@/components/Landing";
import GlobalNavigationBar from "@/components/GlobalNavigationBar";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      
      <main className="w-screen flex justify-center px-4 md:px-6">
        <div className="w-full max-w-6xl">
          <Landing />
        </div>
      </main>
    </>
  );
}
