"use client";

import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useRouter } from "next/navigation";

export default function NotesName({ title, id }: { title: string; id: any }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleRename = async (e) => {
    const { error } = await supabase
      .from("user_notes")
      .update({
        title: e.target.value,
      })
      .eq("note_id", id);
  };
  const handleDelete = async () => {
    const { error } = await supabase
      .from("user_notes")
      .delete()
      .eq("note_id", id);

    return router.refresh();
  };
  return (
    <div className="cursor-pointer group">
      <div
        id="id"
        className={cn(
          "flex text-white/60 justify-center items-center hover:bg-[#373737] gap-2 px-2 py-1 rounded-md h-10"
          // active === key ? "bg-[#373737]" : "bg-black"
        )}
      >
        <span className="icon-[material-symbols--chat-bubble-rounded]"></span>
        <div className="w-[25%] flex justify-start items-start overflow-hidden max-h-5 flex-1 text-ellipsis break-all relative  -mt-[4px]  ">
          {title}
          <div
            className="group-hover:flex hidden absolute inset-y-0 right-0 w-8 z-10 "
            style={{
              background: "linear-gradient(to left, #373737, transparent)",
            }}
          ></div>
          <div
            className="group-hover:hidden flex absolute inset-y-0 right-0 w-8 z-10 "
            style={{
              background: "linear-gradient(to left, #000000, transparent)",
            }}
          ></div>
        </div>
        <div className="flex justify-center items-center max-h-5 gap-1">
          <Popover>
            <PopoverTrigger>
              <span className="icon-[material-symbols--edit-outline-rounded] mt-2"></span>
            </PopoverTrigger>
            <PopoverContent>
              <Input onChange={(e) => handleRename(e)} />
            </PopoverContent>
          </Popover>
          <span
            className="icon-[mdi--delete-empty]"
            onClick={() => handleDelete()}
          ></span>
        </div>
      </div>
    </div>
  );
}
