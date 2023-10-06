import UserInfo from "./UserInfo";
import SidebarWarp from "./SidebarWarper";
import UserNotes from "@/app/notes/UserNotes";

export default function Sidebar() {
  return (
    <SidebarWarp>
      <div className="flex overflow-y-auto h-[calc(100%-32px)]">
        <UserNotes />
      </div>
      <UserInfo />
    </SidebarWarp>
  );
}
