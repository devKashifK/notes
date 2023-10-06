"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SidebarWarp({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open && (
        <div className="w-[25%] h-screen border-r border-slate-700 flex flex-col gap-1 px-2">
          <div className="flex justify-between items-center h-11 mt-2">
            <div className="flex h-full justify-start gap-3 items-center px-3 py-2 border-slate-700 rounded-md border w-[80%]">
              <span className="icon-[material-symbols--add]"></span>
              <Link href={`/notes/${uuidv4()}`} className="cursor-pointer">
                New Note
              </Link>
            </div>
            <div className="h-full w-[17%]">
              {open ? (
                <div
                  className="border h-full w-full border-slate-700 rounded-md px-1 flex justify-center items-center cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <span className="text-xl text-yellow-300 cursor-pointer relative icon-[tabler--layout-sidebar-right-collapse-filled] "></span>
                </div>
              ) : null}
            </div>
          </div>
          {children}
        </div>
      )}
      {!open && (
        <div
          className="border border-slate-700 rounded-md px-1 flex justify-center items-center absolute z-50 top-2 left-0 w-8 h-8 bg-black"
          onClick={() => setOpen(!open)}
        >
          <span className=" icon-[tabler:layout-sidebar-right-collapse-filled]  text-xl border border-slate-700 rounded-md px-1 text-primary"></span>
        </div>
      )}
    </>
  );
}
