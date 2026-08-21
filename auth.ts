import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import { compare } from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import User from "@/models/User";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;

                if (!email || !password) {
                    throw new CredentialsSignin("Please provide both email and password");
                }

                await connectDB();

                const user = await User.findOne({ email }).select("+password +role");

                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const isMatched = await compare(password, user.password);

                if (!isMatched) {
                    throw new Error("Password did not match");
                }

                return {
                    id: user._id.toString(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google" || account?.provider === "github") {
                try {
                    await connectDB();
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        const [firstName, ...rest] = (user.name ?? "").split(" ");
                        await User.create({
                            email: user.email,
                            firstName: firstName || "",
                            lastName: rest.join(" "),
                            image: user.image,
                            authProviderId: account.providerAccountId,
                            role: "user",
                        });
                    }

                    return true;
                } catch (error) {
                    console.error("Error creating OAuth user:", error);
                    return false;
                }
            }

            // credentials provider is already fully validated inside `authorize` —
            // if we got here, the email/password check already passed.
            return true;
        },

        async jwt({ token, user, account }) {
            if (user) {
                if (account?.provider === "credentials") {
                        token.id = user.id;
                        token.role = user.role;
                        token.firstName = user.firstName;
                    } else {
                    // Google/GitHub don't know about our custom fields — look up our own record
                    await connectDB();

                    const dbUser = await User.findOne({ email: user.email });
                    
                    if (dbUser) {
                        token.id = dbUser._id.toString();
                        token.role = dbUser.role;
                        token.firstName = dbUser.firstName;
                    }
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as "user" | "admin";
                session.user.firstName = token.firstName as string;
            }

            return session;
        },
    },
});