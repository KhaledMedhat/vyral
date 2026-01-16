"use client";

import { useEditor, EditorContent, ReactRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import { SuggestionProps, SuggestionKeyDownProps } from "@tiptap/suggestion";
import { IconMoodSmile, IconPaperclip, IconSend2 } from "@tabler/icons-react";
import { cn } from "~/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupButton } from "./ui/input-group";
import { FriendInterface } from "~/interfaces/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitialsFallback } from "~/lib/utils";

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
        setSelectedIndex((prev) => (prev + items.length - 1) % items.length);
        return true;
      }
      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % items.length);
        return true;
      }
      if (event.key === "Enter") {
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  if (items.length === 0) {
    return (
      <div className="bg-popover text-popover-foreground border rounded-lg p-2 shadow-lg">
        <p className="text-sm text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="bg-popover text-popover-foreground border rounded-lg p-1 shadow-lg min-w-[200px]">
      {items.map((item, index) => (
        <button
          key={item._id}
          onClick={() => selectItem(index)}
          className={cn(
            "flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm text-left transition-colors",
            index === selectedIndex ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
          )}
        >
          <Avatar className="size-6">
            <AvatarImage src={item.profilePicture} alt={item.displayName} />
            <AvatarFallback className="text-xs">{getInitialsFallback(item.displayName)}</AvatarFallback>
          </Avatar>
          <span>{item.displayName}</span>
          <span className="text-muted-foreground text-xs">@{item.username}</span>
        </button>
      ))}
    </div>
  );
});

MentionList.displayName = "MentionList";

interface MessageInputProps {
  onSend?: (content: string, mentions: string[]) => void;
  placeholder?: string;
  mentionSuggestions?: FriendInterface[];
  disabled?: boolean;
  className?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, placeholder, mentionSuggestions = [], disabled = false, className }) => {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
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
          class: "mention bg-accent text-accent-foreground px-1 rounded font-medium",
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
            let component: ReactRenderer<MentionListRef, MentionListProps> | null = null;
            let popup: TippyInstance[] | null = null;

            return {
              onStart: (props: SuggestionProps<FriendInterface>) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });

                if (!props.clientRect) return;

                popup = tippy("body", {
                  getReferenceClientRect: props.clientRect as () => DOMRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "top-start",
                });
              },
              onUpdate: (props: SuggestionProps<FriendInterface>) => {
                component?.updateProps(props);

                if (!props.clientRect) return;

                popup?.[0]?.setProps({
                  getReferenceClientRect: props.clientRect as () => DOMRect,
                });
              },
              onKeyDown: (props: SuggestionKeyDownProps) => {
                if (props.event.key === "Escape") {
                  popup?.[0]?.hide();
                  return true;
                }
                return component?.ref?.onKeyDown(props) ?? false;
              },
              onExit: () => {
                popup?.[0]?.destroy();
                component?.destroy();
              },
            };
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[40px] max-h-[200px] overflow-y-auto px-3 py-2",
          "[&_.is-editor-empty:first-child::before]:text-muted-foreground [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:pointer-events-none [&_.is-editor-empty:first-child::before]:h-0"
        ),
      },
      handleKeyDown: (view, event) => {
        if (event.key === "Enter" && !event.shiftKey) {
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

  const handleSend = useCallback(() => {
    if (!editor || editor.isEmpty) return;

    const content = editor.getHTML();
    const json = editor.getJSON();

    // Extract mention IDs from the content
    const mentions: string[] = [];
    const extractMentions = (node: Record<string, unknown>) => {
      if (node.type === "mention" && node.attrs) {
        const attrs = node.attrs as { id?: string };
        if (attrs.id) {
          mentions.push(attrs.id);
        }
      }
      if (node.content && Array.isArray(node.content)) {
        node.content.forEach((child) => extractMentions(child as Record<string, unknown>));
      }
    };
    extractMentions(json as Record<string, unknown>);

    onSend?.(content, mentions);
    editor.commands.clearContent();
  }, [editor, onSend]);

  const isEmpty = editor?.isEmpty ?? true;

  return (
    <InputGroup
      className={cn(
        "h-14 transition-all",
        isFocused && "border-ring ring-ring/50 ring-[3px]",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <EditorContent editor={editor} />
      </div>
      <InputGroupAddon align="inline-end" className="gap-1">
        <InputGroupButton variant="ghost" size="icon-xs" className="rounded-full" type="button">
          <IconPaperclip className="size-4" />
          <span className="sr-only">Attach file</span>
        </InputGroupButton>
        <InputGroupButton variant="ghost" size="icon-xs" className="rounded-full" type="button">
          <IconMoodSmile className="size-4" />
          <span className="sr-only">Add emoji</span>
        </InputGroupButton>
        <InputGroupButton variant="default" size="icon-xs" className="rounded-full" onClick={handleSend} disabled={isEmpty} type="button">
          <IconSend2 className="size-4" />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default MessageInput;
