import React from "react";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { SignupForm } from "./SignupForm";
import { revalidatePath } from "next/cache";

export default function page() {
  async function onSubmit(formData: FormData) {
    "use server";
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createServerActionClient<any>({ cookies });

    const {
      data: { users },
      error,
    } = await supabase.auth.admin.listUsers();
    const { data: existingUser, error: existingUserError } = await supabase
      .from("Users")
      .select()
      .eq("email", email);

    if (existingUser) {
      return;
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
      } else {
      }
    }

    revalidatePath("/");
  }
  return (
    <div>
      <SignupForm onSubmit={onSubmit} />
    </div>
  );
}
