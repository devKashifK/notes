"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function NoteOptions({ note }: { note: any }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleDelete = async () => {
    const { error } = await supabase
      .from("user_notes")
      .delete()
      .eq("note_id", note.note_id);

    return router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="icon-[ic--outline-more-vert]"></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <Link href={`/notes/${note.note_id}`} className="cursor-pointer">
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleDelete()}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
