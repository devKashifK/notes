import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import ClientActionHandler from "../AuthButton/Logout";

export default async function UserInfo() {
  const handleLogout = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    redirect("/login");
  };

  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("profiles").select("*");
  return (
    <div className="flex justify-between items-start border-t border-slate-700 py-2 h-32">
      <div className="flex gap-3 items-center">
        <div className="bg-green-950 w-8 h-8 rounded-sm"></div>
        <p>{`${data[0]?.first_name} ${data[0]?.last_name}`}</p>
      </div>
      <div>
        <Popover>
          <PopoverTrigger>...</PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <ClientActionHandler handleClick={handleLogout}>
                Sign Out
              </ClientActionHandler>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
