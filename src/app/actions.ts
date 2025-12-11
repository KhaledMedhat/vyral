"use server";
import { cookies } from "next/headers";
import { UTApi } from "uploadthing/server";

/**
 * Delete a file from the server
 * @param fileKey - The key of the file to delete
 */
const utapi = new UTApi();
export const deleteFileOnServer = async (fileKey: string | string[]) => {
  await utapi.deleteFiles(fileKey);
};

/**
 * Get a cookie by name
 * @param name - The name of the cookie
 * @returns The value of the cookie
 */
export const getCookie = async (name: string) => {
  const cookie = await cookies();
  return cookie.get(name)?.value;
};
