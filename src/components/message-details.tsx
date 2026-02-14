import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "./ui/dialog";
import Link from "next/link";
import { MessageInterface } from "~/interfaces/message.interface";
import { formatDate, getInitialsFallback } from "~/lib/utils";

const MessageDetails: React.FC<{ message: MessageInterface, isPinComponent: boolean }> = ({ message, isPinComponent }) => {
    const [messageDetailsId, setMessageDetailsId] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    // const [unpinMessage] = useUnpinMessageMutation()
    return (
        <div className="p-4 bg-muted rounded-md flex flex-col relative w-full">
            {/* {messageDetailsId === message._id && isPinComponent &&
                <div className="absolute top-2 right-2 flex items-center gap-1">
                    <Link href={`#${message._id}`}>
                        <Badge variant="outline" className="cursor-pointer text-xs rounded-md hover:bg-hover">
                            Jump
                        </Badge>
                    </Link>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="size-6 rounded-md hover:bg-hover">
                                <X size={14} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="max-w-lg! gap-2">
                            <DialogTitle>Unpin Message</DialogTitle>
                            <DialogDescription>
                                You sure you want to remove this pinned message?
                            </DialogDescription>
                            <MessageDetails message={message} isPinComponent={false} />
                            <div className="w-full flex items-start flex-col p-4">
                                <p className="text-sm font-semibold text-accent">PRO TIP :</p>
                                <p className="text-sm">You can unpin messages from its context menu.</p>
                            </div>
                            <DialogFooter>
                                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive"
                                //  onClick={() => unpinMessage({ channelId: message.referenceId, messageId: message._id })}
                                >
                                    Remove it please!
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </div>
            } */}

            <div className="flex items-start gap-2">
                <Avatar className="size-12">
                    <AvatarImage src={message.sentBy?.profilePicture} />
                    <AvatarFallback>
                        {getInitialsFallback(message.sentBy?.displayName)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start pt-1">
                    <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">{message.sentBy?.displayName}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(message.createdAt?.toString(), 'sm')}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="w-full h-fit pt-0.5 flex items-center gap-1">
                            {message.message &&
                                message.message.content?.[0].content?.map((msg, idx) => (
                                    <span key={idx}>
                                        <p className="text-sm break-all">{msg.type === 'text' && msg.text}</p>
                                        {msg.type === 'mention' && (
                                            <p className="bg-mention px-1 text-mention-secondary font-semibold rounded no-underline text-sm">
                                                {msg.attrs?.mentionSuggestionChar}{msg.attrs?.label}
                                            </p>
                                        )}
                                    </span>
                                ))
                            }
                        </div>
                        {/* {message.attachment && message.attachment.length > 0 && (
                            <div className="mt-2">
                                <AttachmentGrid isAlert={true} attachments={message.attachment} sender={message.sentBy} messageSentAt={message.createdAt} />
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MessageDetails;