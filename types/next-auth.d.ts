// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "admin";
      firstName: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: "user" | "admin";
    firstName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "admin";
    firstName: string;
  }
}