import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";

export default function MessageInput({
  handleSubmit,
  inputRef,
  message,
  setMessage,
}) {
  return (
    <form onSubmit={handleSubmit} className="p-3 sticky bottom-0 bg-white">
      <FieldGroup>
        <Field orientation="horizontal">
          <Input
            ref={inputRef}
            placeholder="Hello there..."
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="focus-visible:ring-0 border-ring"
          />
          <Button size="icon-lg" type="submit" disabled={!message.trim()}>
            <SendHorizonal />
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
