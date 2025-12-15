"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo + brand */}
        <Link href="/" className="flex items-center gap-2">
          {/* Simple Next-like logo */}
          <div className="flex h-8 w-8 items-center justify-center rounded bg-black">
            <span className="text-sm font-bold text-white">N</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            Reacthform
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 hover:underline"
          >
            Contact us
          </Link>
          <Link
            href="/crud"
            className="text-gray-700 hover:text-blue-600 hover:underline"
          >
            CRUD
          </Link>
        </div>
      </nav>
    </header>
  );
}
