import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import UserNotesList from "./UserNotesList";

export default async function UserNotes() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: NotesLists, error } = await supabase
    .from("user_notes")
    .select("*")
    .eq("email", user?.email);

  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      <UserNotesList notes={NotesLists} />
    </div>
  );
}
