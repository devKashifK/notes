import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function useUser() {
  const supabase = await createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
