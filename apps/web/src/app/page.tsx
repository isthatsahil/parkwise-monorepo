"use client";
import { add } from "@parkwise/sample-lib";
import { useQuery } from "@apollo/client";
import { CompaniesDocument } from "@parkwise/network/src/gql/generated";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@parkwise/ui/src/components/ui/button";
import Link from "next/link";
export default function Home() {
  const { data } = useQuery(CompaniesDocument);
  const { data: sessionData, update, status } = useSession();
  return (
    <main>
      {sessionData?.user?.uid ? (
        <Button onClick={() => signOut()}>Log out</Button>
      ) : (
        <Link href="/login">Login</Link>
      )}
      Hello
      {add(10, 20)}
    </main>
  );
}
