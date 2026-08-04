import {
  ChatSidebar,
  ChatHeader,
  EmptyChat,
  MessageInput,
  MessageList,
} from "@/components/chat";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useAuth from "@/hooks/useAuth";

import { getConversation } from "@/services/messageService";
import socket from "@/services/socket";
import { getUsers } from "@/services/userService";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);

  const { user } = useAuth();

  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsers();
        setUsers(users);
      } finally {
        setIsUsersLoading(false);
      }
    }

    fetchUsers();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedUser || !message.trim()) return;

    socket.emit("sendMessage", {
      receiverId: selectedUser._id,
      text: message,
    });

    setMessage("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    if (!selectedUser) return;

    async function fetchConversation() {
      setMessages([]);
      setIsMessagesLoading(true);

      try {
        const conversation = await getConversation(selectedUser._id);

        setMessages(conversation);
      } finally {
        setIsMessagesLoading(false);
      }
    }

    fetchConversation();
  }, [selectedUser]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (!selectedUser) return;

      const isFromSelectedUser = message.sender._id === selectedUser._id;
      const isToSelectedUser = message.receiver._id === selectedUser._id;

      const isFromMe = message.sender._id === user._id;
      const isToMe = message.receiver._id === user._id;

      const belongsToConversation =
        (isFromSelectedUser && isToMe) || (isToSelectedUser && isFromMe);

      if (!belongsToConversation) return;

      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("newMessage");
  }, [selectedUser, user]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedUser]);

  return (
    <SidebarProvider>
      <ChatSidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
        isUsersLoading={isUsersLoading}
      />
      <SidebarInset className="flex flex-col relative">
        {selectedUser ? (
          <>
            <ChatHeader selectedUser={selectedUser} />

            <MessageList
              isMessagesLoading={isMessagesLoading}
              messages={messages}
            />

            <MessageInput
              handleSubmit={handleSubmit}
              inputRef={inputRef}
              message={message}
              setMessage={setMessage}
            />
          </>
        ) : (
          <EmptyChat />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
