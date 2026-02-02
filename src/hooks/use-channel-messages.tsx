"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useLazyGetChannelMessagesQuery } from "~/redux/apis/channel.api";
import { MessageInterface } from "~/interfaces/message.interface";
import { useSocket } from "./use-socket";

const MESSAGES_PER_PAGE = 42;

export function useChannelMessages(channelId: string) {
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const { socket, isConnected } = useSocket();
    const [isSomeoneTyping, setIsSomeoneTyping] = useState<{ userId: string; displayName: string; isTyping: boolean }[]>([]);
    // Use lazy query for manual control
    const [fetchMessages] = useLazyGetChannelMessagesQuery();

    // Track if initial load is done
    const initialLoadDone = useRef(false);

    // Reset state when channel changes
    useEffect(() => {
        setIsSomeoneTyping([]);
        setMessages([]);
        setHasMore(true);
    }, [channelId]);

    // Load initial messages
    useEffect(() => {
        const loadInitialMessages = async () => {
            if (!channelId) return;

            setIsLoadingInitial(true);
            setIsError(false);
            initialLoadDone.current = false;

            try {
                const result = await fetchMessages({
                    channelId,
                    limit: MESSAGES_PER_PAGE
                }).unwrap();

                setMessages(result.messages);
                setHasMore(result.hasMore);
                initialLoadDone.current = true;
            } catch (error) {
                console.error("Failed to load messages:", error);
                setIsError(true);
            } finally {
                setIsLoadingInitial(false);
            }
        };

        loadInitialMessages();
    }, [channelId, fetchMessages]);

    // Load more (older) messages
    const loadMoreMessages = useCallback(async () => {
        if (isLoadingMore || !hasMore || messages.length === 0) return;

        const oldestMessage = messages[0];
        if (!oldestMessage?._id) return;

        setIsLoadingMore(true);

        try {
            const result = await fetchMessages({
                channelId,
                limit: MESSAGES_PER_PAGE,
                before: oldestMessage._id,
            }).unwrap();

            // Prepend older messages
            setMessages((prev) => [...result.messages, ...prev]);
            setHasMore(result.hasMore);
        } catch (error) {
            console.error("Failed to load more messages:", error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [channelId, fetchMessages, hasMore, isLoadingMore, messages]);

    // Socket event handlers
    useEffect(() => {
        // Wait for socket to be connected before registering listeners
        if (!socket || !isConnected) return;

        const handleIsTyping = (data: { userId: string; displayName: string; isTyping: boolean; referenceId: string }) => {
            // Only handle typing events for this channel
            if (data.referenceId !== channelId) return;

            if (data.isTyping) {
                setIsSomeoneTyping((prev) => {
                    // Check if user is already in the typing list
                    const userExists = prev.some((item) => item.userId === data.userId);
                    if (!userExists) {
                        return [...prev, { userId: data.userId, displayName: data.displayName, isTyping: data.isTyping }];
                    }
                    return prev; // Return unchanged if user already exists
                });
            } else {
                setIsSomeoneTyping((prev) => prev.filter((item) => item.userId !== data.userId));
            }
        };

        // if (channelId) {
        //     const cleanup = setupTypingListener();
        //     return () => {
        //         cleanup.then((cleanupFn) => cleanupFn?.());
        //     };
        // }
        // Handle new message - backend sends { message: MessageInterface }
        const handleNewMessage = (data: { message: MessageInterface }) => {
            console.log("newMessage", data);
            const newMessage = data.message;
            if (newMessage.referenceId === channelId) {
                setMessages((prev) => {
                    const exists = prev.some((msg) => msg._id === newMessage._id);
                    if (exists) return prev;
                    return [...prev, newMessage];
                });
            }
        };

        // Handle message update - backend sends { message: MessageInterface }
        const handleUpdateMessage = (data: { message: MessageInterface }) => {
            const updatedMessage = data.message;
            if (updatedMessage.referenceId === channelId) {
                setMessages((prev) =>
                    prev.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
                );
            }
        };

        // Handle message delete
        const handleDeleteMessage = (data: { messageId: string; referenceId: string }) => {
            if (data.referenceId === channelId) {
                setMessages((prev) => prev.filter((msg) => msg._id !== data.messageId));
            }
        };

        // Handle message reaction
        const handleReaction = (data: { message: MessageInterface }) => {
            const updatedMessage = data.message;
            if (updatedMessage.referenceId === channelId) {
                setMessages((prev) =>
                    prev.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
                );
            }
        };

        socket.on("getNewMessage", handleNewMessage);
        socket.on("updateMessage", handleUpdateMessage);
        socket.on("getDeletedMessage", handleDeleteMessage);
        socket.on("messageReaction", handleReaction);
        socket?.on("typing", handleIsTyping);


        return () => {
            socket.off("getNewMessage", handleNewMessage);
            socket.off("updateMessage", handleUpdateMessage);
            socket.off("getDeletedMessage", handleDeleteMessage);
            socket.off("messageReaction", handleReaction);
            socket.off("typing", handleIsTyping);

        };
    }, [channelId, socket, isConnected]);

    // Manual handlers if needed
    const addMessage = useCallback((message: MessageInterface) => {
        setMessages((prev) => {
            const exists = prev.some((msg) => msg._id === message._id);
            if (exists) return prev;
            return [...prev, message];
        });
    }, []);

    const updateMessage = useCallback((updatedMessage: MessageInterface) => {
        setMessages((prev) =>
            prev.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
        );
    }, []);

    const deleteMessage = useCallback((messageId: string) => {
        setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    }, []);

    // Refetch function
    const refetch = useCallback(async () => {
        setIsLoadingInitial(true);
        try {
            const result = await fetchMessages({
                channelId,
                limit: MESSAGES_PER_PAGE
            }).unwrap();

            setMessages(result.messages);
            setHasMore(result.hasMore);
        } catch (error) {
            console.error("Failed to refetch messages:", error);
        } finally {
            setIsLoadingInitial(false);
        }
    }, [channelId, fetchMessages]);

    return {
        messages,
        isLoading: isLoadingInitial,
        isLoadingMore,
        hasMore,
        isError,
        refetch,
        loadMoreMessages,
        // Manual handlers
        addMessage,
        updateMessage,
        deleteMessage,
        isSomeoneTyping,
    };
}
