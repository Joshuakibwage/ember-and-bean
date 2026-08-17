import React from 'react';
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@/components/ui/table";
import {getSession} from "@/lib/getSession";
import { redirect } from "next/navigation";
import { fetchAllUsers } from "@/actions/user";


const Settings = async() => {

  const session = await getSession()

  const user = session?.user ; 

  if(!user) return redirect("/login");

  if(user?.role !== "admin") return redirect("/private/dashboard");

  const allUsers = await fetchAllUsers();



  return (
    <div className="container mx-auto ">
      <h1>Users</h1>

      <Table>
        <TableHeader>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Action</TableHead>
        </TableHeader>

         <tbody>
            {
              allUsers.map((user) => {
                <tr key={user._id}>
                  <td className="font-medium">{user.firstName}</td>
                  <td>{user,lastName}</td>
                  
                </tr>
              })
            }
        </tbody>
      </Table>
    </div>
  )
}

export default Settings
