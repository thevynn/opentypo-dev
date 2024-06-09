"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main>
      {session ? (
        <>
          <p>{JSON.stringify(session)}</p>
          <Button onClick={() => signOut()} variant="destructive">
            로그아웃
          </Button>
        </>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
