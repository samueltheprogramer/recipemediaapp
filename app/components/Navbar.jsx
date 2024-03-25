"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center w-full bg-yellow-500">
      <div>
        <Link href="/home">Home</Link>
        <Link href="/createpost">CreateRecipes</Link>
      </div>
    </div>
  );
}
