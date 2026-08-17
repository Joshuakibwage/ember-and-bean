import React from 'react';
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@/components/ui/table";


const Settings = () => {
  return (
    <div className="container mx-auto ">
      <h1>Users</h1>

      <Table>
        <TableHeader>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Action</TableHead>
        </TableHeader>

         <TableBody>
            <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Settings
