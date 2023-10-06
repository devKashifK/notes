import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Router, { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export const DeleteNote = async ({ id }: { id: any }) => {
  "use server";
  const supabase = createServerActionClient({ cookies });
  const { error } = supabase.from("user_notes").delete().eq("note_id", id);
  redirect("/dashboard");
};
