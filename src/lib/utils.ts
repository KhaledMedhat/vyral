import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookie } from "~/app/actions";

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
