import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Sidebar from "@/app/(component)/Sidebar/Sidebar";
import Editor from "@/app/notes/Editor";
import EditorHeader from "@/app/notes/EditorHeader";

export default async function page({ params }: { params: any }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex w-full justify-start items-start">
      <Sidebar />
      <div className="flex flex-col w-full h-full gap-5">
        <EditorHeader />
        <div className="px-2 w-full h-full">
          <Editor id={params.id} user={user} />
        </div>
      </div>
    </div>
  );
}
