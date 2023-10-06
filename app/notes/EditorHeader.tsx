import React from "react";

export default function EditorHeader() {
  return (
    <div className="flex justify-between items-center w-full px-9 py-2 bg-[#373737] border-slate-700 border-b">
      <h3>Write your Note</h3>
      <div>
        <span className="icon-[solar--upload-minimalistic-outline] text-2xl"></span>
      </div>
    </div>
  );
}
