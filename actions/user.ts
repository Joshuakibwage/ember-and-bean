"use server";
import connectDB from "@/lib/db"; 
import User from "@/models/User";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import {signIn, signOut, auth } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { revalidatePath } from "next/cache";


export type UpdateProfileState = {
  errors?: { firstName?: string; lastName?: string };
  success?: boolean;
};

export async function updateProfile(
    _prevState: UpdateProfileState,
    formData: FormData
): Promise<UpdateProfileState> {
    
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("You must be logged in.");
    }

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const errors: UpdateProfileState["errors"] = {};

    if (!firstName || firstName.trim().length < 2) errors.firstName = "Too short.";
    if (!lastName || lastName.trim().length < 2) errors.lastName = "Too short.";

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await connectDB();
    await User.findByIdAndUpdate(session.user.id, { firstName, lastName });
    revalidatePath("/profile");

    return { success: true };
}


const login = async (formData: FormData): Promise<void> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email,
            password,
        });
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }

    redirect("/");
};


const register = async (formData: FormData) => {
    const firstName = formData.get('firstname') as string;

    const lastName = formData.get('lastname') as string;

    const email = formData.get('email') as string;

    const password = formData.get('password') as string;

    if(!firstName || !lastName || !email || !password ) {
        throw new Error("Please fill all fields!");
        
    }

    await connectDB();

    const existingUser = await User.findOne({email});

    if(existingUser) throw new Error("User already exists!");

    const hashedPassword = await hash(password, 12)
    
    await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    console.log(`User created successfully!`);

    redirect("/login");

};

async function logout() {
  await signOut({
    redirectTo: "/login",
  });
}


const fetchAllUsers = async () => {

    await connectDB()

    const users = await User.find({});

    return users;
}


async function loginWithGithub() {

    await signIn("github", {
          redirectTo: "/",
    })
}

async function loginWithGoogle() {

    await signIn("google", {

        redirectTo: "/",
    })
}

export { register, login, loginWithGithub, loginWithGoogle, fetchAllUsers, logout };