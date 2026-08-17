import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";


const Navbar = () => {
  return (
    <nav className="flex justify-between container mx-auto py-4">
      <Link href="/">Navigation</Link>

      <ul className="flex gap-6">
        <li className="hover:text-blue-400">
          <Link href="/login">LOGIN</Link>
        </li>
        <li className="hover:text-blue-400">
          <Link href="/register">REGISTER</Link>
        </li>
        <li className="hover:text-blue-400">
          <Link href="/private/dashboard">DASHBOARD</Link>
        </li>

        <Button >Logout</Button>
      </ul>
    </nav>
  )
}

export default Navbar
