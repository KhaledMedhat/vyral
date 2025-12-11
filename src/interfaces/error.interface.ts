export interface NestErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export const USERNAME_CONFLICT = "USERNAME_CONFLICT";
export const EMAIL_CONFLICT = "EMAIL_CONFLICT";
