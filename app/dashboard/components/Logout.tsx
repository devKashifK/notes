"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Logout({ handleLogout }) {
  return (
    <Button
      variant={"ghost"}
      onClick={() => handleLogout()}
      className="w-full h-1 bg-transparent hover:bg-transparent text-left justify-start"
    >
      Logout
    </Button>
  );
}
