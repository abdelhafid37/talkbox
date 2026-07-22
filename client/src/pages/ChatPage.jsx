import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

function ChatPage() {
  const { token, logout, user } = useAuth();

  return (
    <div>
      <h1>Chat Page</h1>
      <p>Username: {user ? user.username : "Loading..."}</p>
      <p className="truncate">Token: {token}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default ChatPage;
