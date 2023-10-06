"use client";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";

export default function AccountForm({ session }: { session: any }) {
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    return redirect("/login");
  };

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data?.username);
        setFirstName(data?.first_name);
        setLastName(data?.last_name);
        setNumber(data?.number);
        setAddress(data?.address);
      }

      setLoading(false);
    }

    getProfile();
  }, [session]);

  async function updateProfile(event: any) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username: username,
      address: address,
      number: number,
      first_name: firstName,
      last_name: lastName,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      alert("successfull");
    }
    setLoading(false);
  }

  const user = session?.user;

  return (
    <div className="w-1/2 border rounded-md mx-auto my-auto flex justify-center flex-col gap-2 px-5 py-3">
      <div className="h-max overflow-y-auto flex flex-col gap-2 hide-scroll">
        <form onSubmit={updateProfile} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <label htmlFor="email" className="w-[30%]">
              email
            </label>
            <Input
              id="email"
              name="email"
              type="text"
              value={user?.email}
              disabled
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="email" className="w-[30%]">
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="email" className="w-[30%]">
              First Name
            </label>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="email" className="w-[30%]">
              Last Name
            </label>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="email" className="w-[30%]">
              Number
            </label>
            <Input
              id="number"
              name="number"
              type="text"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="email" className="w-[30%]">
              Address
            </label>
            <Input
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-2">
            <Button type="submit">Update Profile</Button>
          </div>
        </form>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

function InputSkeleton() {
  const array = Array.from({ length: 6 }, (_, index) => index + 1);
  return (
    <div className="h-[350px] overflow-y-auto flex flex-col gap-2 hide-scroll">
      {array.map((item, index) => (
        <div className="flex gap-2" key={index}>
          <Skeleton className="w-[30%] h-9" />
          <Skeleton className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors" />
        </div>
      ))}
    </div>
  );
}
