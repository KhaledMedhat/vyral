"use client";

import { createContext, useContext, useRef, type RefObject } from "react";

interface ScrollContextValue {
    scrollContainerRef: RefObject<HTMLElement | null>;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
    const scrollContainerRef = useRef<HTMLElement | null>(null);

    return (
        <ScrollContext.Provider value={{ scrollContainerRef }}>
            {children}
        </ScrollContext.Provider>
    );
}

export function useScrollContext() {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error("useScrollContext must be used within a ScrollProvider");
    }
    return context;
}

/**
 * Get the scroll container ref directly (for use outside of React components).
 * Returns null if not within a ScrollProvider.
 */
export function getScrollContainerRef(): RefObject<HTMLElement | null> | null {
    // This is a workaround for accessing the ref outside React components
    // In practice, the context-based approach is preferred
    return null;
}
