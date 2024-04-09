"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center w-full bg-yellow-500">
      <div>
        <Link className="text-lg" href="/home">
          Home
        </Link>
        <Link className="text-lg" href="/createpost">
          CreateRecipes
        </Link>
        <Link className="text-lg" href="/likedrecipes">
          LikedRecipes
        </Link>
      </div>
    </div>
  );
}
