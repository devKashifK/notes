import React from "react";
import AccountForm from "./AccountForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("profiles").select("*");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return (
      <div className="h-screen">
        <AccountForm session={session} />
      </div>
    );
  }
  return redirect("/login");
}
