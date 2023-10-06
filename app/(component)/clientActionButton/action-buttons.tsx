"use client";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

// export function ActionButton({
//   action,
//   id,
//   children,
// }: {
//   action: any;
//   id: any;
//   children: React.ReactNode;
// }) {
//   return (
//     <Button
//       variant={"ghost"}
//       onClick={() => action(id)}
//       className="w-full h-1 bg-transparent hover:bg-transparent text-left justify-start"
//     >
//       {children}
//     </Button>
//   );
// }

export const DeleteNote = ({ id }: { id: any }) => {
  //   const handleDelete = () => {

  //   };

  return (
    <Button
      variant={"ghost"}
      //   onClick={() => handleDelete()}
      className="w-full h-1 bg-transparent hover:bg-transparent text-left justify-start"
    >
      Delete
    </Button>
  );
};
