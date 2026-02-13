"use client";

import { MessageType, type MessageInterface } from "~/interfaces/message.interface";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState, memo, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { FriendInterface } from "~/interfaces/user.interface";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "./ui/context-menu";
import { PencilIcon, Copy, Pin, TrashIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { JSONContent } from "@tiptap/react";
import { IconCornerUpRight, IconCornerUpLeft, IconBorderCornerRounded, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { Channel } from "~/interfaces/channels.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { selectCurrentUserInfo } from "~/redux/slices/user/user-selector";
import { formatDate, getInitialsFallback } from "~/lib/utils";
import MessageDetails from "./message-details";
import ProfileAvailabilityIndicator from "./profile-availability-indicator";
import { REACTION_EMOJIS } from "~/constants/constants";
import { EmojiPicker, EmojiPickerContent, EmojiPickerFooter, EmojiPickerSearch } from "./ui/emoji-picker";
import MessageInput from "./message-input";
import { useDeleteMessageMutation } from "~/redux/apis/channel.api";


interface MessageComponentProps {
    setReplyingToMessage?: (message: MessageInterface | null) => void;
    replyingToMessage?: MessageInterface | null;
    otherUsers: FriendInterface[] | undefined;
    message: MessageInterface;
    showHeader: boolean;
    isHovered: boolean;
    onHover: (messageId: string) => void;
    onLeave: () => void;
    channel: Channel | undefined;
    setIsPinnedMessagesOpen?: (isPinnedMessagesOpen: boolean) => void;
}
const Message = memo<MessageComponentProps>(
    ({ setReplyingToMessage, replyingToMessage, channel, otherUsers, message, showHeader, isHovered, onHover, onLeave, setIsPinnedMessagesOpen }) => {
        const [deleteMessage] = useDeleteMessageMutation();
        // const [updateMessage] = useUpdateMessageMutation();
        // const [pinMessage] = usePinMessageMutation();
        // const [unpinMessage] = useUnpinMessageMutation();
        const dispatch = useAppDispatch();
        const currentUser = useAppSelector(selectCurrentUserInfo);
        const [isEditing, setIsEditing] = useState<boolean>(false);
        // const [makeReaction, { isLoading: isMakingReaction }] = useToggleReactionMutation();
        const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Add this state
        const [emojiPickerFromDropdownOpen, setEmojiPickerFromDropdownOpen] = useState<boolean>(false);
        const [isForwardDialogOpen, setIsForwardDialogOpen] = useState<boolean>(false);
        const [isPinDialogOpen, setIsPinDialogOpen] = useState<boolean>(false);
        const [isPinAlertDialogOpen, setIsPinAlertDialogOpen] = useState<boolean>(false);
        const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState<boolean>(false);
        const isSameUser = message.sentBy?._id === currentUser?._id;

        // Handle Escape key to cancel editing
        useEffect(() => {
            if (!isEditing) return;

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setIsEditing(false);
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }, [isEditing]);

        // const updateMessageHandler = async (newMessage: JSONContent) => {
        //     await updateMessage({
        //         messageId: message._id,
        //         body: { message: newMessage },
        //     })
        //         .unwrap()
        //         .then(() => {
        //             setIsEditing(false);
        //         });
        // };
        const handleMouseEnter = useCallback(() => {
            onHover(message._id);
        }, [message._id, onHover]);

        const handleMouseLeave = useCallback(() => {
            if (!isDropdownOpen) {
                onLeave();
            }
        }, [isDropdownOpen, onLeave]);
        return (
            <Dialog open={isForwardDialogOpen || isPinDialogOpen} onOpenChange={setIsForwardDialogOpen || setIsPinDialogOpen}>
                <AlertDialog open={isPinAlertDialogOpen || isDeleteAlertDialogOpen} onOpenChange={setIsPinAlertDialogOpen || setIsDeleteAlertDialogOpen}>
                    <ContextMenu>
                        <ContextMenuTrigger className="w-full">
                            <div
                                id={message._id}
                                className={`group relative px-4 -mx-4 cursor-default transition-colors duration-75 ${message._id && replyingToMessage?._id === message._id && "bg-primary/40"
                                    } ${isHovered && "bg-main"} ${showHeader && "mt-4"} ${message.type === MessageType.REPLY && "pt-1"}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {message.type === MessageType.REPLY && message.replyMessageId && (
                                    <div className="pl-4 flex items-end">
                                        <Link href={`#${message.message.message.replyMessageId?._id}`}>
                                            <IconBorderCornerRounded stroke={2} className="text-muted-foreground hover:text-accent" />
                                        </Link>
                                        <div className="flex items-center gap-1">
                                            <ProfileAvailabilityIndicator
                                                size="sm"
                                                status={message.replyMessageId?.sentBy?.status.type}
                                                imageUrl={message.replyMessageId?.sentBy?.profilePicture || ""}
                                                name={message.replyMessageId?.sentBy?.displayName || ""}
                                            />
                                            {/* <Avatar className="size-7">
                      <AvatarImage src={message.replyMessageId?.sentBy?.profilePicture} />
                      <AvatarFallback>{getInitials(message.replyMessageId?.sentBy?.displayName)}</AvatarFallback>
                    </Avatar>
                    <ProfileNavigator
                      channelType={channel?.type ?? ChannelType.Direct}
                      isMentionReply={true}
                      isSameUser={message.replyMessageId?.sentBy?._id === currentUser?._id}
                      currentUser={currentUser}
                      member={message.replyMessageId?.sentBy}
                      isMention={true}
                      mentionTrigger={`@${message.replyMessageId?.sentBy?.displayName}`}
                    /> */}
                                            <Link href={`#${message.replyMessageId?._id}`} className="flex items-center gap-0.5 text-xs text-muted-foreground">
                                                {message.message.content?.[0].content?.map((msg, idx) => (
                                                    <span key={idx} className="flex flex-col items-start font-semibold">
                                                        <p>{msg.type === "text" && msg.text}</p>
                                                        {msg.type === "mention" && (
                                                            <p className="bg-mention px-1 text-mention-secondary font-semibold rounded no-underline">
                                                                {msg.attrs?.mentionSuggestionChar}
                                                                {msg.attrs?.label}
                                                            </p>
                                                        )}
                                                    </span>
                                                ))}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {message._id && replyingToMessage?._id === message._id && (
                                    <span className="absolute top-0 left-0 h-full bg-mention-secondary z-10 w-1" />
                                )}
                                <div className="flex gap-4">
                                    {/* Avatar column */}
                                    {message.type !== MessageType.SYSTEM ? (
                                        <div className="w-12 shrink-0">
                                            {showHeader ? (
                                                <div className="pt-0.5">
                                                    <Avatar className="size-12">
                                                        <AvatarImage src={message.sentBy?.profilePicture} alt={message.sentBy?.displayName} />
                                                        <AvatarFallback>{getInitialsFallback(message.sentBy?.displayName)}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            ) : (
                                                <div className="w-14 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-[10px] text-muted-foreground">{formatDate(message.createdAt?.toString(), "sm")}</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Pin size={20} color="var(--muted-foreground)" fill="var(--muted-foreground) " className="rotate-45" />
                                    )}

                                    {/* Message content */}
                                    {message.type !== MessageType.SYSTEM ? (
                                        <div className="flex-1 min-w-0 flex w-full">
                                            {message.type === MessageType.FORWARD && <span className="bg-muted-foreground w-0.5 rounded-xs mr-3 my-2" />}

                                            <div className={`${showHeader && "pt-1"} w-full`}>
                                                {/* Header */}
                                                {showHeader && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold">{message.sentBy?.displayName || message.sentBy?.username || "Unknown User"}</span>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <span className="text-xs text-muted-foreground">{formatDate(message.createdAt?.toString(), "md")}</span>
                                                            </TooltipTrigger>
                                                            <TooltipContent>{formatDate(message.createdAt?.toString(), "lg")}</TooltipContent>
                                                        </Tooltip>

                                                        {message.updatedAt && <span className="text-xs text-muted-foreground">(edited)</span>}
                                                    </div>
                                                )}

                                                {/* Message text and attachments */}
                                                <div className="text-base leading-snug wrap-break-word w-full">
                                                    {isEditing ? (
                                                        <div className="flex flex-col gap-2 w-full">
                                                            <MessageInput channelId={channel?._id ?? ""} value={message.message.content?.[0].content?.map((msg) => msg.text).join("") ?? ""} isEditing={true} messageId={message._id} setIsEditing={setIsEditing} />
                                                            {/* <MentionInput
                                                            updateMessageHandler={updateMessageHandler}
                                                            existingMessage={message.message}
                                                            members={otherUsers}
                                                            setIsEditing={setIsEditing}
                                                        /> */}
                                                            <p className="text-xs font-semibold">
                                                                escape to <span className="text-accent">cancel</span> &#x2022; enter to <span className="text-accent">save</span>
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className={`flex items-start gap-1`}>
                                                            <div className="flex flex-col">
                                                                <span className="flex items-start italic text-muted-foreground text-sm">
                                                                    {message.type === MessageType.FORWARD && (
                                                                        <>
                                                                            <IconCornerUpRight stroke={1.5} /> Forwarded
                                                                        </>
                                                                    )}
                                                                </span>
                                                                <div className="flex items-start gap-1">
                                                                    {message.message && (
                                                                        <>
                                                                            {" "}
                                                                            {message.message.content?.[0].content?.map((msg, idx) => (
                                                                                <span key={idx} className="flex flex-col items-start">
                                                                                    {msg.type === "text" && <p>{msg.text}</p>}

                                                                                    {msg.type === "mention" && (

                                                                                        <ProfileAvailabilityIndicator
                                                                                            size="sm"
                                                                                            status={msg.attrs?.status.type}
                                                                                            imageUrl={msg.attrs?.profilePicture || ""}
                                                                                            name={msg.attrs?.displayName || ""}
                                                                                        />
                                                                                        // <ProfileNavigator
                                                                                        //     channelType={channel?.type ?? ChannelType.Direct}
                                                                                        //     isMentionReply={false}
                                                                                        //     isSameUser={
                                                                                        //         channel?.members.find((member) => member.id._id === msg.attrs?.id)?.id?._id === currentUser?._id
                                                                                        //     }
                                                                                        //     currentUser={currentUser}
                                                                                        //     member={channel?.members.find((member) => member.id._id === msg.attrs?.id)?.id}
                                                                                        //     isMention={true}
                                                                                        //     mentionTrigger={msg.attrs?.mentionSuggestionChar + msg.attrs?.label}
                                                                                        // />
                                                                                    )}
                                                                                </span>
                                                                            ))}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {message.attachment && message.attachment.length > 0 && (
                                                        <div className="mt-2">
                                                            "grid attachments"
                                                            {/* <AttachmentGrid
                                                            messageId={message._id}
                                                            attachments={message.attachment}
                                                            sender={message.sentBy}
                                                            messageSentAt={message.createdAt}
                                                        /> */}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-2 w-full">
                                                        {message.reactions && message.reactions.length > 0 && (
                                                            <div className="flex items-center gap-2 py-1">
                                                                {message.reactions.map((reaction, idx) => (
                                                                    <Tooltip key={idx}>
                                                                        <TooltipTrigger asChild>
                                                                            <Button
                                                                                variant="ghost"
                                                                                className={`bg-background shadow-xl p-1.5 flex items-center gap-1 hover:bg-secondary-foreground  ${reaction.sentBy?.some((user) => user?._id === currentUser?._id) && "ring-2 ring-primary bg-primary/10"
                                                                                    }`}
                                                                            // onClick={() =>
                                                                            //     makeReaction({
                                                                            //         messageId: message._id,
                                                                            //         reaction: {
                                                                            //             emoji: reaction.emoji,
                                                                            //             userId: currentUser?._id,
                                                                            //         },
                                                                            //     })
                                                                            // }
                                                                            >
                                                                                <span className="text-lg w-full">{reaction.emoji}</span>
                                                                                <span className="text-md text-muted-foreground font-semibold w-full">{reaction.counter}</span>
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent
                                                                            //  isReacted={true} 
                                                                            sideOffset={10} className="bg-muted flex items-center gap-2 py-4">
                                                                            <span className="text-6xl">{reaction.emoji}</span>
                                                                            <span className="text-md font-semibold">
                                                                                reacted by {reaction.sentBy?.filter(Boolean).map((user) => user?.displayName).join(", ")}
                                                                            </span>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                ))}
                                                                {/* <EmojiSelectorButton
                                                                    isLoading={isMakingReaction}
                                                                    position="default"
                                                                    buttonColor="bg-background"
                                                                    isReactingComponent={true}
                                                                    messageId={message._id}
                                                                    referenceId={message.referenceId}
                                                                    currentUserId={currentUser?._id}
                                                                /> */}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 w-full flex-wrap">
                                            {message.message.content?.[0].content?.map((msg, idx) => (
                                                <span key={idx} className="flex items-start ">
                                                    {msg.type === "mention" && (
                                                        <ProfileAvailabilityIndicator
                                                            size="sm"
                                                            status={message.sentBy?.status.type}
                                                            imageUrl={message.sentBy?.profilePicture || ""}
                                                            name={message.sentBy?.displayName || ""}
                                                        />
                                                        // <ProfileNavigator
                                                        //     channelType={channel?.type ?? ChannelType.Direct}
                                                        //     isMentionReply={false}
                                                        //     isSameUser={channel?.members.find((member) => member.id._id === msg.attrs?.id)?.id?._id === currentUser?._id}
                                                        //     currentUser={currentUser}
                                                        //     member={channel?.members.find((member) => member.id._id === msg.attrs?.id)?.id}
                                                        //     isMention={true}
                                                        //     mentionTrigger={msg.attrs?.mentionSuggestionChar + msg.attrs?.label}
                                                        // />
                                                    )}
                                                    {msg.type === "text" && <p>{msg.text} </p>}
                                                    {msg.type === "pin" && msg.attrs && (
                                                        <Link className="font-bold " href={`#${msg.attrs?.messageId}`}>
                                                            {msg.text}
                                                        </Link>
                                                    )}
                                                    {msg.type === "pin" && !msg.attrs && (
                                                        <span className="font-bold cursor-pointer" onClick={() => setIsPinnedMessagesOpen?.(true)}>
                                                            {msg.text}
                                                        </span>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Emoji reactions */}
                                    {(isHovered || isDropdownOpen) && (
                                        <div className="absolute top-0 right-4 -mt-4 animate-in fade-in slide-in-from-top-2 duration-100">
                                            {/* <EmojiReactions
                                            setIsPinDialogOpen={setIsPinDialogOpen}
                                            channel={channel}
                                            isSameUser={isSameUser}
                                            setIsForwardDialogOpen={setIsForwardDialogOpen}
                                            setReplyingToMessage={setReplyingToMessage}
                                            message={message}
                                            emojiPickerFromDropdownOpen={emojiPickerFromDropdownOpen}
                                            setEmojiPickerFromDropdownOpen={setEmojiPickerFromDropdownOpen}
                                            currentUserLabel={currentUser?.displayName}
                                            currentUserId={currentUser?._id}
                                            setIsEditing={setIsEditing}
                                            isDropdownOpen={isDropdownOpen}
                                            setIsDropdownOpen={setIsDropdownOpen}
                                        /> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent onCloseAutoFocus={(e) => e.preventDefault()} className="p-2 flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-2">
                                {REACTION_EMOJIS.map((emoji, idx) => (
                                    <ContextMenuItem
                                        asChild
                                        // onClick={() =>
                                        //     makeReaction({
                                        //         messageId: message._id,
                                        //         reaction: { emoji: emoji.emoji, userId: currentUser?._id },
                                        //     })
                                        // }
                                        key={idx}
                                    // className="bg-hover hover:bg-hover/70 size-10"
                                    >
                                        <Button variant="secondary" className="size-10">
                                            <span className="text-lg">{emoji.emoji}</span>
                                        </Button>
                                    </ContextMenuItem>
                                ))}
                            </div>
                            <ContextMenuSub>
                                <ContextMenuSubTrigger >View More Reactions</ContextMenuSubTrigger>
                                <ContextMenuSubContent
                                    className="will-change-transform transform-gpu w-fit p-0 data-[state=closed]:invisible data-[state=closed]:pointer-events-none" sideOffset={20}>
                                    <EmojiPicker
                                        className="h-[342px]"
                                        onEmojiSelect={({ emoji }) => {
                                            console.log(emoji);
                                            document.dispatchEvent(
                                                new KeyboardEvent("keydown", { key: "Escape" })
                                            );
                                        }}
                                    >
                                        <EmojiPickerSearch />
                                        <EmojiPickerContent />
                                        <EmojiPickerFooter />
                                    </EmojiPicker>
                                </ContextMenuSubContent>
                            </ContextMenuSub>
                            <ContextMenuSeparator />
                            {isSameUser && (
                                <ContextMenuItem onClick={() => setIsEditing(true)} className="justify-between">
                                    Edit Message
                                    <PencilIcon size={18} strokeWidth={0.5} color="var(--muted)" fill="var(--muted-foreground)" />
                                </ContextMenuItem>
                            )}
                            <ContextMenuItem onClick={() => setReplyingToMessage?.(message)} className="justify-between">
                                Reply
                                <IconCornerUpLeft size={18} color="var(--muted-foreground)" />
                            </ContextMenuItem>
                            <DialogTrigger>
                                <ContextMenuItem className="justify-between">
                                    Forward
                                    <IconCornerUpRight size={18} color="var(--muted-foreground)" />
                                </ContextMenuItem>
                            </DialogTrigger>
                            <ContextMenuSeparator />
                            <ContextMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(message.message.content?.[0].content?.map((msg) => msg.text).join("") ?? "");
                                    // navigator.clipboard.writeText(message.message.content);
                                    // handleRemoveClipboard();
                                    // dispatch(setCopiedMessage(message.message)); 
                                }}
                                className="justify-between"
                            >
                                Copy Text
                                <Copy size={18} color="var(--muted-foreground)" />
                            </ContextMenuItem>
                            {message.isPinned ? (
                                <ContextMenuItem className="justify-between" onClick={() => setIsPinDialogOpen(true)}>
                                    Unpin Message
                                    <Pin size={18} color="var(--muted-foreground)" fill="var(--muted-foreground)" className="rotate-45" />
                                </ContextMenuItem>
                            ) : (
                                <ContextMenuItem className="justify-between" onClick={() => setIsPinAlertDialogOpen(true)}>
                                    Pin Message
                                    <Pin size={18} color="var(--muted-foreground)" fill="var(--muted-foreground)" className="rotate-45" />
                                </ContextMenuItem>
                            )}
                            <ContextMenuSeparator />
                            <ContextMenuItem variant="destructive" className="justify-between" onClick={() => setIsDeleteAlertDialogOpen(true)}>
                                Delete Message
                                <IconTrash size={18} color="var(--destructive)" />
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                    <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="max-w-lg! gap-2">
                        {isPinDialogOpen && (
                            <>
                                <DialogTitle>Unpin Message</DialogTitle>
                                <DialogDescription>You sure you want to remove this pinned message?</DialogDescription>
                                <MessageDetails message={message} isPinComponent={false} />
                                <div className="w-full flex items-start flex-col p-4">
                                    <p className="text-sm font-semibold text-primary">PRO TIP :</p>
                                    <p className="text-sm">You can unpin messages from its context menu.</p>
                                </div>
                                <DialogFooter>
                                    <Button variant="secondary" onClick={() => setIsPinDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                    // onClick={() =>
                                    //     unpinMessage({
                                    //         channelId: message.referenceId,
                                    //         messageId: message._id,
                                    //     })
                                    // }
                                    >
                                        Remove it please!
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                        {isForwardDialogOpen && (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Forward To</DialogTitle>
                                    <DialogDescription>Select where you want to share this message.</DialogDescription>
                                </DialogHeader>
                                {/* <ForwardComponent message={message} setIsForwardDialogOpen={setIsForwardDialogOpen} /> */}
                            </>
                        )}
                    </DialogContent>
                    <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                        {isPinAlertDialogOpen && (
                            <>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-lg">Pin it. Pin it Vyral</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Hey, just double checking that you want to pin this message to{" "}
                                        {channel?.groupOrServerName ?? `${otherUsers?.[0].displayName} channel`} for posterity and greatness?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <MessageDetails message={message} isPinComponent={false} />
                                <AlertDialogFooter className="justify-between w-full mt-2">
                                    <AlertDialogCancel className="flex-1 h-11" onClick={() => setIsPinAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction variant="default" className="flex-1 h-11"
                                    // className="bg-primary hover:bg-primary/80"
                                    // onClick={() =>
                                    //     pinMessage({
                                    //         channelId: channel?._id ?? "",
                                    //         messageId: message._id,
                                    //         pinnedBy: {
                                    //             id: currentUser?._id ?? "",
                                    //             label: currentUser?.displayName ?? "",
                                    //         },
                                    //     })
                                    // }
                                    >
                                        Oh yeah. Pin it
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </>
                        )}
                        {isDeleteAlertDialogOpen && (
                            <>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-lg">Delete Message</AlertDialogTitle>
                                    <AlertDialogDescription>Are you sure you want to delete this message?</AlertDialogDescription>
                                </AlertDialogHeader>
                                <MessageDetails message={message} isPinComponent={false} />
                                <div className="flex flex-col items-start">
                                    <span className="text-sm text-primary font-bold">PRO TIP :</span>
                                    <span className="text-xs text-muted-foreground">
                                        You can also delete messages by right-clicking on them and selecting &quot;Delete Message&quot; from the context menu.
                                    </span>
                                </div>
                                <AlertDialogFooter className="justify-between w-full mt-2">
                                    <AlertDialogCancel className="flex-1 h-11" onClick={() => setIsDeleteAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction variant="destructive" className="flex-1 h-11"
                                        onClick={async () => {
                                            setIsDeleteAlertDialogOpen(false);
                                            await deleteMessage(message._id)
                                        }}
                                    >Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </>
                        )}

                    </AlertDialogContent>
                </AlertDialog>
            </Dialog >
        );
    },
    (prevProps, nextProps) => {
        // Custom comparison function to prevent unnecessary re-renders
        // Only re-render if these specific props change
        return (
            prevProps.message._id === nextProps.message._id &&
            prevProps.isHovered === nextProps.isHovered &&
            prevProps.showHeader === nextProps.showHeader &&
            prevProps.replyingToMessage?._id === nextProps.replyingToMessage?._id &&
            prevProps.message.updatedAt === nextProps.message.updatedAt &&
            prevProps.message.reactions?.length === nextProps.message.reactions?.length &&
            prevProps.message.isPinned === nextProps.message.isPinned
        );
    }
);

Message.displayName = "Message";

export default Message;
