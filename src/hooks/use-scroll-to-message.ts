import { useCallback, useEffect, useRef } from "react";
import { MessageInterface } from "~/interfaces/message.interface";
import { useScrollContext } from "~/contexts/scroll-context";

interface UseScrollToMessageOptions {
  messages: MessageInterface[];
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMoreMessages: () => void;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Hook to scroll to a specific message by ID, loading older messages if needed.
 * Uses the global ScrollContext if no scrollContainerRef is provided.
 * Returns a scrollToMessage function that can be passed to child components.
 */
export function useScrollToMessage({
  messages,
  hasMore,
  isLoadingMore,
  loadMoreMessages,
  scrollContainerRef: providedRef,
}: UseScrollToMessageOptions) {
  const { scrollContainerRef: contextRef } = useScrollContext();
  const scrollContainerRef = providedRef ?? contextRef;
  const pendingScrollTargetRef = useRef<string | null>(null);

  // Scroll to element helper
  const scrollToElement = useCallback((elementId: string) => {
    const targetElement = document.getElementById(elementId);
    const container = scrollContainerRef.current;
    
    if (targetElement && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const offsetTop = targetRect.top - containerRect.top + container.scrollTop;
      const centerOffset = (containerRect.height - targetRect.height) / 2;

      container.scrollTo({
        top: offsetTop - centerOffset,
        behavior: "smooth"
      });

      window.history.pushState(null, "", `#${elementId}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      return true;
    }
    return false;
  }, [scrollContainerRef]);

  // Main scroll to message function
  const scrollToMessage = useCallback((targetId: string) => {
    if (!targetId) return;

    // Check if message exists in current messages
    const messageExists = messages.some(msg => msg._id === targetId);

    if (messageExists) {
      // Small delay to ensure DOM is ready
      setTimeout(() => scrollToElement(targetId), 50);
      return;
    }

    // Message not found, need to load more
    if (hasMore && !isLoadingMore) {
      pendingScrollTargetRef.current = targetId;
      loadMoreMessages();
    }
  }, [messages, hasMore, isLoadingMore, loadMoreMessages, scrollToElement]);

  // Effect to handle pending scroll after loading more messages
  useEffect(() => {
    if (pendingScrollTargetRef.current && !isLoadingMore) {
      const targetId = pendingScrollTargetRef.current;
      const messageExists = messages.some(msg => msg._id === targetId);

      if (messageExists) {
        // Found the message, scroll to it
        pendingScrollTargetRef.current = null;
        setTimeout(() => scrollToElement(targetId), 100);
      } else if (hasMore) {
        // Still not found, keep loading
        loadMoreMessages();
      } else {
        // No more messages to load, target not found
        pendingScrollTargetRef.current = null;
        console.warn(`Message ${targetId} not found in channel`);
      }
    }
  }, [messages, isLoadingMore, hasMore, loadMoreMessages, scrollToElement]);

  return { scrollToMessage };
}
