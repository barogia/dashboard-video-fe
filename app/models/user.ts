export interface User {
  id: string;
  name: string;
  email: string;
  isEmailConfirmed?: boolean;
  isRegisteredWithGoogle: boolean;
  stripeCustomerId?: string;
  refreshToken?: string;
}

export interface GoogleResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
