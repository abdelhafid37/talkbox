import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import socket from "@/services/socket";

function ChatPage() {
  const { logout, user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto p-6 md:px-10">
      <h1 className="text-2xl mb-6">
        Welcome, {user ? user.username : "Loading..."}
      </h1>

      <Button onClick={logout}>Logout</Button>

      <Button
        onClick={() => {
          socket.emit("sendMessage", {
            text: "Hello from the client!",
          });
        }}
        variant="outline"
        className="ml-2"
      >
        Send Test Message
      </Button>
    </div>
  );
}

export default ChatPage;
