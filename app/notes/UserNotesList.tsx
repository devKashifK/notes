"use client";
import React, { useEffect } from "react";
import NotesName from "./notesname";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function UserNotesList({ notes }: { notes: any }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel("postgresChangesChannel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_notes",
        },
        () => router.refresh()
      )
      .subscribe();
  }, []);
  return notes?.map((note) => (
    <NotesName key={note.note_id} title={note.title} id={note.note_id} />
  ));
}
