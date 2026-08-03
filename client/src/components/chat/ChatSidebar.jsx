import { CircleUserRound } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";

export default function ChatSidebar({
  users = [],
  selectedUser,
  setSelectedUser,
  isUsersLoading,
}) {
  const { logout, onlineUsers } = useAuth();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="px-5 py-4">
        <h2 className="text-xl font-medium">Chats</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {!isUsersLoading ? (
              users.length > 0 ? (
                users.map((user) => {
                  const isOnline = onlineUsers.includes(user._id);

                  return (
                    <SidebarMenuItem key={user._id}>
                      <SidebarMenuButton
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenMobile(false);
                        }}
                        className={`h-fit py-3.5 ${
                          selectedUser?._id === user._id
                            ? "bg-sidebar-accent"
                            : ""
                        }`}
                      >
                        <div className="relative size-fit">
                          <CircleUserRound
                            className="size-6!"
                            strokeWidth={1.25}
                          />

                          {isOnline && (
                            <span className="size-2 shrink-0 bg-emerald-500 rounded-full block absolute left-full top-full -translate-full ring-2 ring-sidebar" />
                          )}
                        </div>
                        <span className="text-base">{user.username}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              ) : (
                <SidebarMenuItem className="px-3.5">
                  <p className="text-sm">No users yet!</p>
                </SidebarMenuItem>
              )
            ) : (
              Array.from({ length: 3 }, (_, i) => (
                <SidebarMenuItem key={i}>
                  <Skeleton className="w-full h-12" />
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-3.5">
        <Button onClick={logout}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
