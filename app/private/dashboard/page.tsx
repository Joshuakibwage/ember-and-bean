import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { 
    Table, 
    TableHead, 
    TableBody, 
    TableHeader,
    TableCell,
    TableRow 
} from "@/components/ui/table";
import { getSession } from "@/lib/getSession";
import {redirect} from "next/navigation";


const Dashboard = async() => {

    const session = await getSession;

    const  user = session?.user 

    if(user) redirect("/");


  return (
    <section className="flex min-h-screen ">
      <div className="flex-1 bg-gray-100 dark:bg-gray-950">
        <div className="p-6 grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="text-2xl font-bold">$45.235.67</CardHeader>
                    <p className="text-xs text-gray-500">+20.1% from last month</p>
                </Card>

                 <Card>
                    <CardHeader className="text-2xl font-bold">$45.235.67</CardHeader>
                    <p className="text-xs text-gray-500">+20.1% from last month</p>
                </Card>

                 <Card>
                    <CardHeader className="text-2xl font-bold">$45.235.67</CardHeader>
                    <p className="text-xs text-gray-500">+20.1% from last month</p>
                </Card>

                 <Card>
                    <CardHeader className="text-2xl font-bold">$45.235.67</CardHeader>
                    <p className="text-xs text-gray-500">+20.1% from last month</p>
                </Card>
            </div>

            <div>
                <Card>
                    <CardHeader>Recent SignUps</CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Date</TableHead>
                            </TableHeader>

                            <TableBody>
                                <TableRow>
                                    <TableCell>John Doe</TableCell>
                                    <TableCell>john@example.com</TableCell>
                                    <TableCell>Pro</TableCell>
                                    <TableCell>2026</TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
