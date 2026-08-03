import { ChevronLeft, CircleUserRound } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";

export default function ChatHeader({ selectedUser }) {
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();
  const { onlineUsers } = useAuth();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <header className="p-3 flex items-center justify-between sticky top-0 z-10 bg-sidebar border-b">
      <div className="flex items-center gap-3">
        {isMobile && (
          <Button
            size="icon-lg"
            variant="ghost"
            onClick={() => setOpenMobile(true)}
          >
            <ChevronLeft className="size-6" strokeWidth={1.25} />
          </Button>
        )}

        <div className="relative size-fit">
          <CircleUserRound size={34} strokeWidth={1} />

          {isOnline && (
            <span className="size-2 shrink-0 bg-emerald-500 rounded-full block absolute left-full top-full -translate-full ring-2 ring-sidebar" />
          )}
        </div>

        <div>
          <p className="text-base leading-tight">{selectedUser.username}</p>
          <p
            className={`text-xs leading-tight ${isOnline ? "text-emerald-500" : "text-muted-foreground"}`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </header>
  );
}
