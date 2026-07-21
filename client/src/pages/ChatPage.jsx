import useAuth from "@/hooks/useAuth";

function ChatPage() {
  const { token } = useAuth();

  return <h1>Chat Page, Token: {token}</h1>;
}
export default ChatPage;
