import { useEffect, useRef } from "react";
import { Bubble, BubbleContent } from "../ui/bubble";
import { Message, MessageContent, MessageFooter } from "../ui/message";
import useAuth from "@/hooks/useAuth";
import { Spinner } from "../ui/spinner";
import { format } from "date-fns";

export default function MessageList({ messages = [], isMessagesLoading }) {
  const { user } = useAuth();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="p-3 flex-1 flex flex-col gap-2 overflow-y-auto">
      {!isMessagesLoading ? (
        messages.map((message) => {
          const isMine = message.sender._id === user._id;
          const time = format(new Date(message.createdAt), "HH:mm");

          return (
            <Message key={message._id} align={isMine ? "end" : "start"}>
              <MessageContent className="gap-1">
                <Bubble>
                  <BubbleContent
                    className={
                      !isMine ? "bg-sidebar-accent! text-current!" : ""
                    }
                  >
                    {message.content}
                  </BubbleContent>
                </Bubble>
                <MessageFooter className="opacity-60">{time}</MessageFooter>
              </MessageContent>
            </Message>
          );
        })
      ) : (
        <div className="size-full flex items-center justify-center">
          <Spinner />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
