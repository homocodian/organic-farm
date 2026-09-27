import type { Auth } from './auth';

import { customSessionClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  plugins: [customSessionClient<Auth>()]
});

export type FullSession = typeof authClient.$Infer.Session;
export type Session = typeof authClient.$Infer.Session.session;
export type User = typeof authClient.$Infer.Session.user;
export type UserRole = User['role'];
