import { Metadata } from "next";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "./components/main-nav";
import { Search } from "./components/Search";
import { UserNav } from "./components/user-nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import cheerio from "cheerio";
import NoteOptions from "./components/NoteOptions";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userNotes, error } = await supabase
    .from("user_notes")
    .select("*")
    .eq("email", user?.email);

  const removeHtmlTags = (html: any) => {
    const $ = cheerio.load(html);
    return $.text();
  };

  const changeDateFormat = (date: any) => {
    const format = new Date(date);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
    };

    const readableDate = format.toLocaleDateString("en-US", options);
    return readableDate;
  };

  const renameNote = async () => {
    "use server";
  };

  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-12 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {userNotes?.map((note) => {
                  return (
                    <Link
                      key={note.note_id}
                      href={`/notes/${note.note_id}`}
                      className="cursor-pointer"
                    >
                      <Card className="cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xs font-medium">
                            {changeDateFormat(note.created_at)}
                          </CardTitle>
                          <div className="flex gap-1">
                            <span className="icon-[material-symbols--note-stack-rounded]"></span>
                            <NoteOptions note={note} />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-xl font-bold">{note.title}</div>
                          <p className="text-xs text-muted-foreground">
                            {removeHtmlTags(note.note).substring(0, 150)}...
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
