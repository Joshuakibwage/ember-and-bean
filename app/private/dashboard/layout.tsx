
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSideBar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const session = await auth();
    console.log("Session role:", session?.user?.role);

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== "admin") {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen">
            <DashboardSidebar />
            <main className="flex-1 bg-background px-6 py-8 sm:px-10">
                {children}
            </main>
        </div>
    );
}