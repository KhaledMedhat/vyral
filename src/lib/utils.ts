import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookie } from "~/app/actions";
import { Channel } from "~/interfaces/channels.interface";
import { setUserLoggingInStatus } from "~/redux/slices/user/user-slice";
import { store } from "~/redux/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Compare the temp user token with the query param for the completion of the signup process if its with google signup
 * @param queryParam - The query param to compare
 * @returns True if the tokens match, false otherwise
 */
export async function tempTokenCompare(queryParam: string) {
  const token = await getCookie("temp_user_token");
  if (token === queryParam) {
    return true;
  }
  return false;
}

/**
 * Sync auth state on client-side based on access_token cookie
 * Call this in a client component (e.g., layout or auth provider) on mount
 */
export async function syncAuthState() {
  const token = await getCookie("access_token");
  store.dispatch(setUserLoggingInStatus(!!token));
}

/**
 * Get the initials fallback of a name
 * @param name - The name to get the initials fallback of
 * @returns The initials fallback of the name
 */
export function getInitialsFallback(name?: string) {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      // If there's a space, treat as first and last name
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    // If single name, return first letter or first two letters
    return parts[0].slice(0, 2).toUpperCase();
  }
}

/**
 * Create a channel name from an array of display names
 * Example: ["John", "Jane", "Jim"] -> "John's, Jane's, Jim's Group"
 * @param membersDisplayNames - The array of display names to create the channel name from
 * @returns The channel name
 */
export function createChannelName(membersDisplayNames: string[]) {
  return [...membersDisplayNames.map((displayName) => displayName + "'s")].join(",") + " Group";
}

/**
 * Get the other member of a direct message channel
 * @param channel - The channel to get the other member of
 * @param currentUserId - The current user's ID
 * @returns The other member of the direct message channel
 */
export function getDirectMessageChannelOtherMember(channel: Channel, currentUserId: string) {
  const otherMembers = channel.members.filter((member) => member.id._id !== currentUserId);
  return otherMembers[0].id;
}
