import React from "react";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: testData, error } = await supabase
    .from("user_info")
    .select("*");

  async function onSubmit(formData: FormData) {
    "use server";
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createServerActionClient<any>({ cookies });

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    revalidatePath("/");
    redirect(`/notes/${uuidv4()}`);
  }
  if (session) {
    return redirect("/account");
  }
  return <LoginForm onSubmit={onSubmit} />;
}
