"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ClientActionHandler({ children, handleClick }) {
  return <Button onClick={() => handleClick()}>{children}</Button>;
}
