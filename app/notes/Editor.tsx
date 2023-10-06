"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "inspector";
import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({ id, user }: { id: any; user: any }) {
  const supabase = createClientComponentClient();
  const [value, setValue] = useState("Start Writing");
  const [title, setTitle] = useState("");
  const [exsistingNote, setExsitingNote] = useState(false);

  useEffect(() => {
    async function fetchNote() {
      const { data, error } = await supabase
        .from("user_notes")
        .select("*")
        .eq("note_id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      const { note, title } = data;
      setValue(note);
      setExsitingNote(true);
    }

    fetchNote();
  }, [id, Quill]);

  useEffect(() => {
    if (title.length === 25) {
      saveNote(value);
    }
  }, [value]);

  const onChange = (content, delta, source, editor) => {
    setValue(content);
    const text = editor.getText(0, 25);
    if (text.length === 25) {
      setTitle(text);
    }
  };

  const saveNote = async (value) => {
    if (exsistingNote) {
      let { error } = await supabase
        .from("user_notes")
        .update({ note: value })
        .eq("note_id", id);

      if (error) {
        console.error(error);
      }
    } else {
      let { data, error } = await supabase.from("user_notes").insert({
        note_id: id,
        note: value,
        title: title,
        email: user.email,
      });
    }
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],

    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div className="h-full">
      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        placeholder="compose here"
        onChange={onChange}
        className="h-[calc(100vh-150px)] border-slate-700"
      />
    </div>
  );
}
