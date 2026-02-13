"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { SuggestionKeyDownProps } from "@tiptap/suggestion";
import { IconMoodSmile, IconPaperclip, IconPlus } from "@tabler/icons-react";
import { cn } from "~/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupButton } from "./ui/input-group";
import { FriendInterface } from "~/interfaces/user.interface";
import ReactionPicker from "./reaction-picker";
import { Button } from "./ui/button";
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover";
import ProfileAvailabilityIndicator from "./profile-availability-indicator";
import { useSendMessageMutation, useUpdateMessageMutation } from "~/redux/apis/channel.api";
import { MessageType } from "~/interfaces/message.interface";
import { useAppSelector } from "~/redux/hooks";
import { selectCurrentUserInfo } from "~/redux/slices/user/user-selector";
import { useSocket } from "~/hooks/use-socket";
import { socketService } from "~/lib/socket";

interface MentionListProps {
  items: FriendInterface[];
  command: (item: { id: string; label: string }) => void;
}

interface MentionListRef {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

const MentionList = forwardRef<MentionListRef, MentionListProps>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        command({ id: item._id, label: item.displayName });
      }
    },
    [items, command]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: SuggestionKeyDownProps) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + items.length - 1) % items.length);
        return true;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % items.length);
        return true;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  if (items.length === 0) {
    return (
      <div className="p-2">
        <p className="text-sm text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="flex items-start flex-col p-2 gap-2">
      <p className="text-xs text-muted-foreground font-semibold uppercase">members</p>
      {items.map((item, index) => (
        <Button
          key={item._id}
          variant="ghost"
          onClick={() => selectItem(index)}
          className={cn(
            "flex items-center gap-2 w-full text-accent-foreground px-2 h-11 rounded-md text-sm text-left transition-colors justify-between hover:bg-main-primary-foreground",
            index === selectedIndex && "bg-main-primary-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <ProfileAvailabilityIndicator
              className="pt-1"
              size="sm"
              status={item.status.type}
              imageUrl={item.profilePicture}
              name={item.displayName}
            />
            <span className="flex items-center gap-2">{item.displayName}</span>
          </div>
          <span className="text-xs text-muted-foreground font-semibold">{item.username}</span>
        </Button>
      ))}
    </div>
  );
});

MentionList.displayName = "MentionList";

interface MessageInputProps {
  placeholder?: string;
  mentionSuggestions?: FriendInterface[];
  disabled?: boolean;
  className?: string;
  value?: string;
  channelId: string;
  isEditing: boolean;
  messageId?: string;
  setIsEditing?: (isEditing: boolean) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ placeholder, mentionSuggestions = [], disabled = false, className, channelId, value, isEditing, messageId, setIsEditing }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [mentionOpen, setMentionOpen] = useState(false);
  const [mentionItems, setMentionItems] = useState<FriendInterface[]>([]);
  const [mentionCommand, setMentionCommand] = useState<((item: { id: string; label: string }) => void) | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mentionListRef = useRef<MentionListRef>(null);
  const [sendMessage] = useSendMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const currentUserInfo = useAppSelector(selectCurrentUserInfo);
  const editor = useEditor({
    onUpdate: async ({ editor }) => {
      const socket = socketService.getSocket();
      if (editor?.getText().length > 0) {
        socket?.emit("typing", {
          user: currentUserInfo,
          isTyping: true,
          channelId
        })
        setTimeout(() => {
          socket?.emit("typing", {
            user: currentUserInfo,
            isTyping: false,
            channelId
          })
        }, 2000)
      } else {
        socket?.emit("typing", {
          user: currentUserInfo,
          isTyping: false,
          channelId
        });
      }
    },
    immediatelyRender: false,
    content: value ?? "",
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention bg-mention text-mention-secondary font-semibold px-0.5 rounded",
        },
        suggestion: {
          items: ({ query }: { query: string }) => {
            return mentionSuggestions
              .filter(
                (item) => item.displayName.toLowerCase().includes(query.toLowerCase()) || item.username.toLowerCase().includes(query.toLowerCase())
              )
              .slice(0, 5);
          },
          render: () => {
            return {
              onStart: (props) => {
                setMentionItems(props.items as FriendInterface[]);
                setMentionCommand(() => props.command);
                setMentionOpen(true);
              },
              onUpdate: (props) => {
                setMentionItems(props.items as FriendInterface[]);
                setMentionCommand(() => props.command);
              },
              onKeyDown: (props: SuggestionKeyDownProps) => {
                if (props.event.key === "Escape") {
                  setMentionOpen(false);
                  return true;
                }
                return mentionListRef.current?.onKeyDown(props) ?? false;
              },
              onExit: () => {
                setMentionOpen(false);
                setMentionItems([]);
                setMentionCommand(null);
              },
            };
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none px-3 leading-relaxed",
          "[&_.is-editor-empty:first-child::before]:text-muted-foreground [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:pointer-events-none [&_.is-editor-empty:first-child::before]:h-0"
        ),
      },
      handleKeyDown: (view, event) => {
        if (event.key === "Enter" && !event.shiftKey && !mentionOpen) {
          event.preventDefault();
          handleSend();
          return true;
        }
        return false;
      },
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  });

  const handleSend = useCallback(async () => {
    if (!editor || editor.isEmpty) return;

    // const content = editor.getHTML();
    const json = editor.getJSON();

    // Extract mention IDs from the content
    // const mentions: string[] = [];
    // const extractMentions = (node: Record<string, unknown>) => {
    //   if (node.type === "mention" && node.attrs) {
    //     const attrs = node.attrs as { id?: string };
    //     if (attrs.id) {
    //       mentions.push(attrs.id);
    //     }
    //   }
    //   if (node.content && Array.isArray(node.content)) {
    //     node.content.forEach((child) => extractMentions(child as Record<string, unknown>));
    //   }
    // };
    // extractMentions(json as Record<string, unknown>);
    console.log(json); // we send this json to the server
    if (isEditing && messageId) {
      setIsEditing?.(false);
      await updateMessage({
        messageId,
        body: { referenceId: channelId, updateMessageDto: { message: json } },
      });
    } else {
      editor.commands.clearContent();
      await sendMessage({
        referenceId: channelId,
        message: json,
        sentBy: currentUserInfo._id,
        type: MessageType.TEXT,
      });
    }
    // onSend?.(content, mentions);
  }, [editor]);

  return (
    <Popover open={mentionOpen}>
      <PopoverAnchor asChild>
        <InputGroup
          ref={containerRef}
          className={cn(
            "h-auto min-h-[62px] transition-all bg-main-primary",
            isFocused && "border ring-ring/50 ring-[1px]",
            disabled && "opacity-50 pointer-events-none",
            className
          )}
        >
          <div className="flex-1 min-w-0 w-0 max-h-[180px] overflow-y-auto overflow-x-hidden py-2">
            <EditorContent editor={editor} />
          </div>
          {!value && <InputGroupAddon align="inline-start" className="gap-1 self-center">
            <InputGroupButton variant="ghost" size="sm" type="button">
              <IconPlus size={22} />
            </InputGroupButton>
          </InputGroupAddon>}
          <InputGroupAddon align="inline-end" className="gap-1 self-center">
            {!value && <InputGroupButton variant="ghost" size="icon-xs" className="rounded-full" type="button">
              <IconPaperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </InputGroupButton>}
            <ReactionPicker>
              <InputGroupButton variant="ghost" size="sm" type="button">
                <IconMoodSmile size={22} />
              </InputGroupButton>
            </ReactionPicker>
          </InputGroupAddon>
        </InputGroup>
      </PopoverAnchor>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="p-1"
        style={{ width: containerRef.current?.offsetWidth ?? "auto" }}
      >
        {mentionCommand && (
          <MentionList
            ref={mentionListRef}
            items={mentionItems}
            command={mentionCommand}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default MessageInput;
