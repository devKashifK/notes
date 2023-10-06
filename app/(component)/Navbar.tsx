import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-2 px-4">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <div className="border-slate-700 border w-max  px-1 flex justify-center items-center rounded-sm">
              <span className="icon-[solar--hamburger-menu-broken] text-primary text-3xl cursor-pointer"></span>
            </div>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <Button size={"sm"}>Login</Button>
        <Button variant={"link"} size={"sm"}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
