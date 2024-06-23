"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import Landing from "@/components/Landing";
import ExploreSection from "@/components/ExploreSection";
import GlobalNavigationBar from "@/components/GlobalNavigationBar";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <main className="w-screen flex justify-center px-12">
        <div className="w-full">
          <Landing />
          <ExploreSection />
        </div>
      </main>
    </>
  );
}
