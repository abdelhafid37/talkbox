import { ChevronLeft, CircleUserRound } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

export default function ChatHeader({ selectedUser }) {
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

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
        <CircleUserRound size={24} strokeWidth={1.25} />
        <span className="text-base">{selectedUser.username}</span>
      </div>
    </header>
  );
}
