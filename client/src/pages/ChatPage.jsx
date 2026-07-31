import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { getConversation } from "@/services/messageService";
import socket from "@/services/socket";
import { getUsers } from "@/services/userService";
import { useEffect, useState } from "react";

function ChatPage() {
  const { logout, user } = useAuth();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("userJoined", (data) => {
      console.log(`${data.username} joined the chat`);
    });

    socket.on("newMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("welcome");
      socket.off("userJoined");
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    async function fetchConversation() {
      const conversation = await getConversation(selectedUser._id);
      setMessages(conversation);
    }

    fetchConversation();
  }, [selectedUser]);

  useEffect(() => {
    async function fetchUsers() {
      const users = await getUsers();
      setUsers(users);
      console.log(users);
    }

    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 md:px-10">
      <div className="flex items-center justify-between">
        <div></div>
        <Button onClick={logout}>Logout</Button>
      </div>
      <h1 className="text-2xl mb-6">
        Welcome, {user ? user.username : "Loading..."}
      </h1>

      <div className="space-y-2 py-2">
        {users.map((user) => (
          <div
            className="cursor-pointer"
            key={user._id}
            onClick={() => setSelectedUser(user)}
          >
            {user.username} ({user.email})
          </div>
        ))}
      </div>

      {selectedUser && <h2>Chatting with {selectedUser.username}</h2>}

      <div className="space-y-2 py-2">
        {messages.map((message, id) => (
          <div key={id}>
            <strong>{message.sender.username}</strong>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!selectedUser) return;

          socket.emit("sendMessage", {
            receiverId: selectedUser._id,
            text: message,
          });

          setMessage("");
        }}
      >
        <Field orientation="horizontal">
          <Input
            type="text"
            placeholder="Hello there..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" variant="outline" className="ml-2">
            Send Message
          </Button>
        </Field>
      </form>
    </div>
  );
}

export default ChatPage;
