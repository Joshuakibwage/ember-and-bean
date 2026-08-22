import React from 'react';
import connectDB from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/order";
import { auth } from "@/auth";

import ProfileTabs from "@/components/profile/ProfileTabs";
import AccountForm from "@/components/profile/AccountForm";
import OrderHistory from "@/components/profile/OrderHistory";



export default async function ProfilePage () {

    const session = await auth();

    if(!session?.user ) return null;

    await connectDB();

    const [ user, orders ] = await Promise.all([
        User.findById(session.user.id).lean(),
        Order.find({ user: session.user.id }).sort({ createdAt: -1 }).lean(),
    ]);

    if( !user ) return null;

    return (
        <div className="container mx-auto max-w-2xl px-4 py-12 sm:px-6">
            <h1 className="font-heading text-3xl text-foreground">Your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">
                Hi, {user.firstName} manage your details and see past orders!
            </p>

            <ProfileTabs 
                accountContent = {
                    <AccountForm
                        firstName={user.firstName}
                        lastName={user.lastName}
                        email={user.email}
                    />
                }

                ordersContent={
                    <OrderHistory 
                        orders={JSON.parse(JSON.stringify(orders))}
                    />
                }
            />
        </div>
    )
}