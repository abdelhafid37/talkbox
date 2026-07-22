import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

function ChatPage() {
  const { token, logout } = useAuth();

  return (
    <div>
      <h1 className="truncate">Chat Page, Token: {token}</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default ChatPage;
